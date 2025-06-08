import aj from "../config/arcjet.js";

async function arcJetMiddleware(req, res, next) {
	try {
		// Process the request through ArcJet
		const decision = await aj.protect(req, { requested: 1 });

		if (decision.isDenied()) {
			if (decision.reason.isBot())
				return res.status(403).json({
					message: "Bot Detected Access denied",
				});
			if (decision.reason.isRateLimit())
				return res.status(429).json({
					message: "Rate limit exceeded",
				});

			// If the request is denied, send a 403 Forbidden response
			return res.status(403).json({
				message: "Access denied by ArcJet",
			});
		}

		next();
	} catch (error) {
		console.error("ArcJet Middleware Error:", error);
		next(error);
	}
}

export default arcJetMiddleware;
