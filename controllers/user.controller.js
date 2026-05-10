import userService from "../services/user.service.js";

export const userController = {
	async getProfile(req, res, next) {
		try {
			const user = await userService.getById(req.user.id);
			res.json(user);
		} catch (err) {
			next(err);
		}
	},

	async updateProfile(req, res, next) {
		try {
			const updated = await userService.update(
				req.user.id,
				req.body,
			);
			res.json(updated);
		} catch (err) {
			next(err);
		}
	},

	async getAll(req, res, next) {
		try {
			const users = await userService.getAll();
			res.json(users);
		} catch (err) {
			next(err);
		}
	},

	async deleteUser(req, res, next) {
		try {
			await userService.delete(req.params.id);
			res.json({ message: "User deleted" });
		} catch (err) {
			next(err);
		}
	},

	async changePassword(req, res, next) {
		try {
			const { currentPassword, newPassword } = req.body;

			if (!currentPassword || !newPassword) {
				return res.status(400).json({
					message:
						"Current password and new password are required",
				});
			}

			if (newPassword.length < 6) {
				return res.status(400).json({
					message:
						"New password must be at least 6 characters",
				});
			}

			const updated = await userService.changePassword(
				req.user.id,
				currentPassword,
				newPassword,
			);
			res.json({
				message: "Password changed successfully",
				user: updated,
			});
		} catch (err) {
			next(err);
		}
	},
};
