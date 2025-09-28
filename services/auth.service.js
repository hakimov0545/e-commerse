import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import tokenService from "./token.service.js";
import { BaseError } from "../errors/base.error.js";

class AuthService {
	async register(userData) {
		const { name, lastname, email, password, address, phone } =
			userData;

		const candidate = await userModel.findOne({ email });
		if (candidate) {
			throw BaseError.BadRequest(
				"User with this email already exists"
			);
		}

		const hashPassword = await bcrypt.hash(password, 10);

		const user = await userModel.create({
			name,
			lastname,
			email,
			password: hashPassword,
			address,
			phone,
		});

		const tokens = tokenService.generateTokens({
			id: user._id,
			email: user.email,
			role: user.role,
		});
		await tokenService.saveToken(user._id, tokens.refreshToken);

		return { ...tokens, user };
	}

	async login(email, password) {
		const user = await userModel
			.findOne({ email })
			.select("+password");
		if (!user) {
			throw BaseError.BadRequest("User not found");
		}

		const isPassEquals = await bcrypt.compare(
			password,
			user.password
		);
		if (!isPassEquals) {
			throw BaseError.BadRequest("Wrong password");
		}

		const tokens = tokenService.generateTokens({
			id: user._id,
			email: user.email,
			role: user.role,
		});
		await tokenService.saveToken(user._id, tokens.refreshToken);

		const userObj = user.toObject();
		delete userObj.password;

		return { ...tokens, user: userObj };
	}

	async logout(refreshToken) {
		return await tokenService.removeToken(refreshToken);
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw BaseError.UnauthorizedError("Unauthorized");
		}

		const userData =
			tokenService.validateRefreshToken(refreshToken);
		const tokenFromDb = await tokenService.findToken(
			refreshToken
		);
		if (!userData || !tokenFromDb) {
			throw BaseError.UnauthorizedError("Unauthorized");
		}

		const user = await userModel.findById(userData.id);
		const tokens = tokenService.generateTokens({
			id: user._id,
			email: user.email,
			role: user.role,
		});
		await tokenService.saveToken(user._id, tokens.refreshToken);

		return { ...tokens, user };
	}

	async getUsers() {
		return await userModel.find();
	}
}

export default new AuthService();
