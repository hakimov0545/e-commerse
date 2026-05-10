import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import tokenService from "./token.service.js";
import emailService from "./email.service.js";
import { BaseError } from "../errors/base.error.js";

class AuthService {
	async register(userData) {
		const { name, lastname, email, password, address, phone } =
			userData;

		const candidate = await userModel.findOne({ email });
		if (candidate) {
			throw BaseError.BadRequest(
				"User with this email already exists",
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
			user.password,
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
		const tokenFromDb =
			await tokenService.findToken(refreshToken);
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

	// 🔐 Parolni unutdingiz - Verification code yuborish
	async forgotPassword(email) {
		const user = await userModel.findOne({ email });
		if (!user) {
			throw BaseError.BadRequest("User not found");
		}

		// 6 ta raqamli verification code yaratish
		const verificationCode = Math.floor(
			100000 + Math.random() * 900000,
		).toString();

		// Code expiryni 10 minutga o'rnatish
		const verificationCodeExpiry = new Date(
			Date.now() + 10 * 60 * 1000,
		);

		// Userni update qilish
		await userModel.findByIdAndUpdate(user._id, {
			verificationCode,
			verificationCodeExpiry,
			codeVerified: false,
		});

		// Email yuborish
		try {
			await emailService.sendVerificationCode(
				user.email,
				verificationCode,
				user.name,
			);
		} catch (error) {
			throw BaseError.BadRequest(
				"Email yuborishda xato: " + error.message,
			);
		}

		return {
			message: "Verification code emailga yuborildi",
			email: user.email,
		};
	}

	// 🔐 Verification code tekshirish
	async verifyCode(email, verificationCode) {
		const user = await userModel
			.findOne({ email })
			.select("+verificationCode +verificationCodeExpiry");

		if (!user) {
			throw BaseError.BadRequest("User not found");
		}

		// Code expiry tekshirish
		if (
			!user.verificationCodeExpiry ||
			user.verificationCodeExpiry < new Date()
		) {
			throw BaseError.BadRequest("Verification code expired");
		}

		// Code tekshirish
		if (user.verificationCode !== verificationCode) {
			throw BaseError.BadRequest("Invalid verification code");
		}

		// Codeni tekshirilgan deb belgilash
		await userModel.findByIdAndUpdate(user._id, {
			codeVerified: true,
		});

		// Parol reset uchun temporary token yaratish
		const resetToken = tokenService.generateTokens({
			id: user._id,
			email: user.email,
			purpose: "reset_password",
		}).accessToken;

		return {
			message: "Verification code verified",
			resetToken,
		};
	}

	// 🔐 Parolni yangilash - Reset token bilan
	async resetPassword(userId, newPassword) {
		const user = await userModel
			.findById(userId)
			.select("+codeVerified");

		if (!user) {
			throw BaseError.BadRequest("User not found");
		}

		if (!user.codeVerified) {
			throw BaseError.BadRequest(
				"Please verify your code first",
			);
		}

		// Yangi parolni hashlash
		const hashedPassword = await bcrypt.hash(newPassword, 10);

		// Parolni update qilish
		await userModel.findByIdAndUpdate(user._id, {
			password: hashedPassword,
			verificationCode: null,
			verificationCodeExpiry: null,
			codeVerified: false,
		});

		return {
			message: "Password reset successfully",
		};
	}
}

export default new AuthService();
