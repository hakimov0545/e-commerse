import { validationResult } from "express-validator";
import { BaseError } from "../errors/base.error.js";
export function validateMiddleware(req, res, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(
			BaseError.BadRequest("Validation error", errors.array())
		);
	}
	next();
}
