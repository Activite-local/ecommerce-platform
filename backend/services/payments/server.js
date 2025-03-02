import express from "express";
import stripePackage from "stripe";
import dotenv from "dotenv";

dotenv.config();
const stripe = stripePackage(process.env.STRIPE_SECRET);
const app = express();
app.use(express.json());

app.post("/pay", async (req, res) => {
    const { amount, currency, orderId } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            metadata: { orderId },
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(5004, () => console.log("Payments Service running on port 5004"));
