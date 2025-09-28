// middlewares/error.middleware.js
import { BaseError } from "../errors/base.error.js";

export function errorHandler(err, req, res, next) {
	console.error(err);

	if (err instanceof BaseError) {
		return res.status(err.status).json({
			message: err.message,
			errors: err.errors || [],
		});
	}

	// Default xatolik
	return res.status(500).json({
		message: "Server xatosi",
	});
}
