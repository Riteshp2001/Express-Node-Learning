import workflowClient from "../config/upstash.js";
import Subscription from "../models/subscriptions.models.js";
import { SERVER_URL } from "../config/env.js";

export async function createSubscription(req, res, next) {
	try {
		const subscription = await Subscription.create({
			...req.body,
			user: req.user._id,
		});

		const { workflowRunId } = await workflowClient.trigger({
			url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
			body: {
				subscriptionId: subscription.id,
			},
			headers: {
				"content-type": "application/json",
			},
			retries: 0,
		});

		// Send a success response with the created subscription
		res.status(200).json({
			success: true,
			message: "Subscription created successfully",
			data: {
				subscription,
				workflowRunId,
			},
		});
	} catch (error) {
		next(error);
	}
}

export async function getSubscription(req, res, next) {
	try {
		const { id } = req.params;

		if (id.toString() !== req.user._id.toString()) {
			const error = new Error("You are not the Owner of this Account!");
			error.status = 401;
			throw error;
		}
		const subscription = await Subscription.find({ user: id });

		if (!subscription) {
			res.status(404).json({
				message: "Subscription Not Found",
			});
		}

		// Send a success response with the created subscription
		res.status(200).json({
			success: true,
			message: `Your Subscription with ID:${id} is ${subscription[0].status}`,
			data: subscription,
		});
	} catch (error) {
		next(error);
	}
}

export async function getAllSubscriptions(req, res, next) {
	try {
		const subscriptions = await Subscription.find({});

		if (!subscriptions) {
			return res.status(404).json({
				success: false,
				message: "No subscriptions found",
			});
		}

		res.status(200).json({
			success: true,
			message: `Total ${subscriptions.length} subscriptions found`,
			data: subscriptions,
		});
	} catch (error) {
		next(error);
	}
}

export async function getSubscriptionById(req, res, next) {
	try {
		const { id } = req.params;

		const subscription = await Subscription.findById(id);

		if (!subscription) {
			return res.status(404).json({
				success: false,
				message: "Subscription not found",
			});
		}

		res.status(200).json({
			success: true,
			message: `Subscription with ID: [${id} -> ${subscription.name}] fetched successfully`,
			data: subscription,
		});
	} catch (error) {
		next(error);
	}
}
