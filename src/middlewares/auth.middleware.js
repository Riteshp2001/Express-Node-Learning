import { JWT_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken";
import User from "../models/users.model.js";

async function authorizeRequest(req, res, next) {
	try {
		let token;

		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer")
		) {
			token = req.headers.authorization.split(" ")[1];
		}
		if (!token) {
			return res.status(401).json({
				message: "Unauthorized request, no token provided",
			});
		}
		const decoded = jwt.verify(token, JWT_SECRET);
		const user = await User.findById(decoded.userId);
		if (!user) {
			return res.status(404).json({
				message: "Unauthorized request, User not found",
			});
		}
		req.user = user;

		next();
	} catch (error) {
		return res.status(401).json({
			message: "Unauthorized request",
			error: error.message,
		});
	}
}

export default authorizeRequest;
