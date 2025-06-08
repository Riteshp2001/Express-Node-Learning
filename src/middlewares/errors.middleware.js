function errorHandler(err, req, res, next) {
	try {
		let error = { ...err };

		error.message = err.message;

		// Log the error to the console
		console.error("Error:", error);

		// If the error is a validation error, format it
		if (err.name === "ValidationError") {
			const messages = Object.values(err.errors).map((val) => val.message);
			error = {
				message: messages,
				stack: err.stack,
			};
		}

		//Mongoose Bad ObjectId
		if (error.name === "CastError") {
			let message = `Resource not found. Invalid: ${error.path}`;
			error.message = new Error(message);
			error.status = 404;
		}

		//Mongoose Duplicate Key
		if (error.code === 11000) {
			const message = `Duplicate field value entered: ${error.keyValue.name}`;
			error.message = new Error(message);
			error.status = 400;
		}

		//Mongoose Validation Error
		if (error.name === "ValidationError") {
			const messages = Object.values(error.errors).map((val) => val.message);
			error.message = new Error(messages.join(", "));
			error.status = 400;
		}

		const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
		res.status(statusCode);
		res.json({
			message: error.message,
			stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
		});
	} catch (error) {
		next(error);
	}
}

export default errorHandler;
