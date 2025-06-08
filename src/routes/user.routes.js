import { Router } from "express";

import authorizeRequest from "../middlewares/auth.middleware.js";
import { getAllUsers, getUserById } from "../controllers/user.controllers.js";

const userRouter = Router();

//GET / : Get all users
//GET /:id : Get user by ID
//POST / : Create a new user
//PUT /:id : Update user by ID
//DELETE /:id : Delete user by ID

userRouter.get("/", getAllUsers);

userRouter.get("/:id", authorizeRequest, getUserById);

userRouter.post("/", (req, res) => {
	res.send({ message: "Create New User" });
});

userRouter.put("/:id", (req, res) => {
	res.send({ message: `Update User with ID: ${req.params.id}` });
});

userRouter.delete("/:id", (req, res) => {
	res.send({ message: `Delete User with ID: ${req.params.id}` });
});

export default userRouter;
