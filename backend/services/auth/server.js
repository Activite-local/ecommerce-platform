import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Inscription
app.post("/register", async (req, res) => {
    const { email, password, name, role } = req.body;
    try {
        const user = await prisma.user.create({
            data: { email, password, name, role },
        });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Connexion (Fake, juste une vérification)
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json({ message: "Login successful", user });
});

app.listen(5001, () => console.log("Auth Service running on port 5001"));
