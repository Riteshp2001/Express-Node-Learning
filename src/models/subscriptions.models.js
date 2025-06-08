import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Subscription name is required"],
			minlength: 3,
			maxlength: 50,
			trim: true,
		},
		price: {
			type: Number,
			required: [true, "Subscription price is required"],
			min: 0,
		},
		currency: {
			type: String,
			required: [true, "Currency is required"],
			enum: ["USD", "EUR", "GBP", "INR"],
			default: "INR",
		},
		frequency: {
			type: String,
			enum: ["daily", "weekly", "monthly", "yearly"],
			default: "monthly",
		},
		category: {
			type: String,
			enum: [
				"personal",
				"business",
				"enterprise",
				"sports",
				"education",
				"entertainment",
				"health",
			],
			required: [true, "Subscription category is required"],
		},
		paymentMethod: {
			type: String,
			required: [true, "Payment method is required"],
			trim: true,
		},
		status: {
			type: String,
			enum: ["active", "inactive", "cancelled", "expired"],
			default: "inactive",
		},
		startDate: {
			type: Date,
			required: true,
			validator: {
				validator: (value) => value <= new Date(),
				message: "Start date cannot be in the future",
			},
		},
		renewalDate: {
			type: Date,
			validator: {
				validator: function (value) {
					return value > this.startDate;
				},
				message: "Renewal date must be in the future",
			},
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			index: true,
		},
	},
	{ timestamps: true }
);

// Adding a pre-save hook to validate the renewal date
subscriptionSchema.pre("save", function (next) {
	if (!this.renewalDate) {
		const renewalFrequency = {
			daily: 1,
			weekly: 7,
			monthly: 30,
			yearly: 365,
		};

		this.renewalDate = new Date(this.startDate);
		this.renewalDate.setDate(
			this.renewalDate.getDate() + renewalFrequency[this.frequency]
		);
	}

	// Validate that the renewal date is after the start date
	if (this.renewalDate < this.startDate) {
		this.status = "expired";
	}

	next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
