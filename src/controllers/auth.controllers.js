import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import User from "../models/users.model.js";

export async function signUp(req, res, next) {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const { name, email, password } = req.body;

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			const error = new Error("User with this email already exists");
			error.status = 409;
			throw error;
		}

		//Hash teh Password if new user
		const hashedPassword = bcrypt.hashSync(password, 10);

		const newUsers = await User.create(
			[{ name, email, password: hashedPassword }],
			{ session }
		);

		const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
			expiresIn: JWT_EXPIRES_IN,
		});

		await session.commitTransaction();
		res.status(201).json({
			success: true,
			message: "User created successfully",
			data: { token, user: newUsers[0] },
		});
		session.endSession();
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		next(error); // Pass the error to the error handling middleware
	}
}

export async function signIn(req, res, next) {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email }).select("+password");
        //Even normal select("password") will return password but
        //+ is used to FORCE include the password field in the query result in any case

		if (!user) {
			const error = new Error("User with this email does not exist");
			error.status = 401;
			throw error;
		}

		const isMatch = bcrypt.compareSync(password, user.password);

		if (!isMatch) {
			const error = new Error("Invalid Password");
			error.status = 401;
			throw error;
		}

		const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
			expiresIn: JWT_EXPIRES_IN,
		});

		res.status(200).json({
			success: true,
			message: "User signed in successfully",
			data: { token, user },
		});
	} catch (error) {
		next(error);
	}
}

export async function signOut(req, res, next) {}
