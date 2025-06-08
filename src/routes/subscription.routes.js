import { Router } from "express";
import authorizeRequest from "../middlewares/auth.middleware.js";
import {
	createSubscription,
	getSubscription,
	getSubscriptionById,
	getAllSubscriptions,
} from "../controllers/subscription.controllers.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", getAllSubscriptions);

subscriptionRouter.get("/:id", getSubscriptionById);

subscriptionRouter.post("/", authorizeRequest, createSubscription);

subscriptionRouter.put("/:id", authorizeRequest, (req, res) => {
	res.send({ message: `Update Subscription with ID: ${req.params.id}` });
});

subscriptionRouter.delete("/:id", authorizeRequest, (req, res) => {
	res.send({ message: `Delete Subscription with ID: ${req.params.id}` });
});

subscriptionRouter.get("/users/:id", authorizeRequest, getSubscription);

subscriptionRouter.put("/:id/cancel", authorizeRequest, (req, res) => {
	res.send({ message: `Cancel Subscription with ID: ${req.params.id}` });
});

subscriptionRouter.put("/:id/activate", authorizeRequest, (req, res) => {
	res.send({ message: `Activate Subscription with ID: ${req.params.id}` });
});

subscriptionRouter.put("/upcoming-subscriptions", (req, res) => {
	res.send({ message: "Update Upcoming Subscriptions" });
});

export default subscriptionRouter;
