// Import necessary node modules
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

// Load environment variables from .env file
dotenv.config();

// Import custom middlewares and API routes
import errorHandler from "./middlewares/errors.middleware.js";
import notFound from "./middlewares/notfound.middleware.js";
import arcJetMiddleware from "./middlewares/arc.middleware.js";

// Import API route handlers
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import workFlowRouter from "./routes/workflow.routes.js";

// Initialize the Express application
const app = express();

// Middleware for logging HTTP requests in development mode
app.use(morgan("dev"));

// Middleware to enhance security by setting various HTTP headers
app.use(helmet());

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies
app.use(cookieParser());

//ArchJet Middleware
app.use(arcJetMiddleware);

// Middleware to parse URL-encoded data
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/workflows",workFlowRouter);

// Define a simple route for the root URL
app.get("/", (req, res) => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	res.sendFile(path.join(__dirname, "html", "root.html"));
});

// Middleware to handle 404 errors for undefined routes
app.use(notFound);

// Middleware to handle errors globally
app.use(errorHandler);

// Export the Express application instance
export default app;
