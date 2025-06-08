import { Router } from "express";
import { signUp, signOut, signIn } from "../controllers/auth.controllers.js";

const authRouter = Router();

//PATH : /api/v1/auth/sign-up
authRouter.post("/sign-up", signUp);

//PATH : /api/v1/auth/sign-in
authRouter.post("/sign-in", signIn);

//PATH : /api/v1/auth/sign-out
authRouter.post("/sign-out", signOut);

export default authRouter;
