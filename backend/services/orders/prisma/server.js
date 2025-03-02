import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Passer une commande
app.post("/orders", async (req, res) => {
    const { userId, total } = req.body;
    try {
        const order = await prisma.order.create({
            data: { userId, total, status: "PENDING" },
        });
        res.json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(5003, () => console.log("Orders Service running on port 5003"));
