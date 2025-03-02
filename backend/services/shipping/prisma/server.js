import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Créer une expédition
app.post("/ship", async (req, res) => {
    const { orderId, address, city, country, postalCode } = req.body;
    try {
        const shipping = await prisma.shipping.create({
            data: { orderId, address, city, country, postalCode, status: "PREPARING" },
        });
        res.json(shipping);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Mettre à jour le statut de livraison
app.put("/ship/:id", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updatedShipping = await prisma.shipping.update({
            where: { id },
            data: { status },
        });
        res.json(updatedShipping);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(5005, () => console.log("Shipping Service running on port 5005"));
