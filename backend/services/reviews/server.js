import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Ajouter un avis
app.post("/reviews", async (req, res) => {
    const { userId, productId, rating, comment } = req.body;
    try {
        const review = await prisma.review.create({
            data: { userId, productId, rating, comment },
        });
        res.json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Récupérer les avis d'un produit
app.get("/reviews/:productId", async (req, res) => {
    const { productId } = req.params;
    try {
        const reviews = await prisma.review.findMany({ where: { productId } });
        res.json(reviews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(5006, () => console.log("Reviews Service running on port 5006"));
