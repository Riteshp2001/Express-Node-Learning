import User from "../models/users.model.js";

export async function getAllUsers(req, res, next) {
	try {
		const users = await User.find().select("-password"); // Exclude password field
		res.status(200).json({
			success: true,
			message: "Users fetched successfully",
			data: users,
		});
	} catch (error) {
		next(error); // Pass the error to the error handling middleware
	}
}

export async function getUserById(req, res, next) {
	try {
		const { id } = req.params;
		const user = await User.findById(id).select("-password"); // Exclude password field

		if (!user) {
			const error = new Error("User not found");
			error.status = 404;
			throw error;
		}

		res.status(200).json({
			success: true,
			message: "User fetched successfully",
			data: user,
		});
	} catch (error) {
		next(error); // Pass the error to the error handling middleware
	}
}
