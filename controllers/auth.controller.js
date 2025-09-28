import authService from "../services/auth.service.js";

class AuthController {
	async register(req, res) {
		try {
			const {
				name,
				lastname,
				email,
				password,
				address,
				phone,
			} = req.body;
			const data = await authService.register({
				name,
				lastname,
				email,
				password,
				address,
				phone,
			});

			// Refresh tokenni cookie ga yozish (xavfsizroq)
			res.cookie("refreshToken", data.refreshToken, {
				httpOnly: true,
				secure: true, // productionda true bo‘lsin
				sameSite: "strict",
				maxAge: 30 * 24 * 60 * 60 * 1000, // 30 kun
			});

			return res.status(201).json(data);
		} catch (err) {
			return res.status(400).json({ message: err.message });
		}
	}

	async login(req, res) {
		try {
			const { email, password } = req.body;
			const data = await authService.login(email, password);

			res.cookie("refreshToken", data.refreshToken, {
				httpOnly: true,
				secure: true,
				sameSite: "strict",
				maxAge: 30 * 24 * 60 * 60 * 1000,
			});

			return res.json(data);
		} catch (err) {
			return res.status(400).json({ message: err.message });
		}
	}

	async logout(req, res) {
		try {
			const { refreshToken } = req.cookies;
			await authService.logout(refreshToken);

			res.clearCookie("refreshToken");
			return res.json({ message: "Logout successful" });
		} catch (err) {
			return res.status(400).json({ message: err.message });
		}
	}

	async refresh(req, res) {
		try {
			const { refreshToken } = req.cookies;
			const data = await authService.refresh(refreshToken);

			res.cookie("refreshToken", data.refreshToken, {
				httpOnly: true,
				secure: true,
				sameSite: "strict",
				maxAge: 30 * 24 * 60 * 60 * 1000,
			});

			return res.json(data);
		} catch (err) {
			return res.status(401).json({ message: err.message });
		}
	}

	async getUsers(req, res) {
		try {
			const users = await authService.getAllUsers();
			return res.json(users);
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}
}

export default new AuthController();
