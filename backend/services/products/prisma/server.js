import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Récupérer tous les produits
app.get("/products", async (req, res) => {
    const products = await prisma.product.findMany();
    res.json(products);
});

// Ajouter un produit
app.post("/products", async (req, res) => {
    const { name, description, price, stock, categoryId, images } = req.body;
    try {
        const product = await prisma.product.create({
            data: { name, description, price, stock, categoryId, images },
        });
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(5002, () => console.log("Products Service running on port 5002"));
