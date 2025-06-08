import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
			trim: true,
			minLength: 3,
			maxLength: 50,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			lowercase: true,
			trim: true,
			match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minLength: 6,
			select: false, // Exclude password from queries by default
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
