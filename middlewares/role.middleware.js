import { BaseError } from "../errors/base.error.js";

export function roleMiddleware(role) {
	return (req, res, next) => {
		if (req.user.role !== role) {
			return next(BaseError.Forbidden("Ruxsat yo‘q"));
		}
		next();
	};
}
