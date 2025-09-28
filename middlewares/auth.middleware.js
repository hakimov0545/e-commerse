import tokenService from "../services/token.service.js";

export function authMiddleware(req, res, next) {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const token = authHeader.split(" ")[1]; // "Bearer token"
		if (!token) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const userData = tokenService.validateAccessToken(token);
		if (!userData) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		req.user = userData; // { id, email, role }
		next();
	} catch (err) {
		return res.status(401).json({ message: "Unauthorized" });
	}
}

export function adminMiddleware(req, res, next) {
	if (req.user.role !== "admin") {
		return res
			.status(403)
			.json({ message: "Access denied. Admins only." });
	}
	next();
}
