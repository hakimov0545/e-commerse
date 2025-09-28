import jwt from "jsonwebtoken";
import Token from "../models/token.model.js";

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(
			payload,
			process.env.JWT_ACCESS_SECRET,
			{
				expiresIn: process.env.JWT_EXPIRES_IN || "15m",
			}
		);
		const refreshToken = jwt.sign(
			payload,
			process.env.JWT_REFRESH_SECRET,
			{
				expiresIn:
					process.env.JWT_REFRESH_EXPIRES_IN || "30d",
			}
		);
		return { accessToken, refreshToken };
	}

	async saveToken(userId, refreshToken) {
		const tokenData = await Token.findOne({ user: userId });
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}
		const token = await Token.create({
			user: userId,
			refreshToken,
		});
		return token;
	}

	async removeToken(refreshToken) {
		return Token.deleteOne({ refreshToken });
	}

	async findToken(refreshToken) {
		return Token.findOne({ refreshToken });
	}

	validateAccessToken(token) {
		try {
			return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
		} catch (e) {
			return null;
		}
	}

	validateRefreshToken(token) {
		try {
			return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
		} catch (e) {
			return null;
		}
	}
}

export default new TokenService();
