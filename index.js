//** Dotenv **
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000; // Use the port from .env or default to 3000

// middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log("Time:", Date.now());
    next();
});

// Sample users array
const users = [
    { id: 123456789, title: "Jojo" },
    { id: 987654321, title: "Abrar" },
];

// Define routes
app.get("/", (req, res) => {
    res.send("hello world!");
});

// Add new user
app.post("/user", (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: "title is required" });
    }
    users.push({ title, id: Date.now() });
    res.status(201).json({ message: "user is created", data: users });
});

// Get all users
app.get("/users", (req, res) => {
    res.status(200).json({ data: users });
});

// Get single user
app.get("/user/:id", (req, res) => {
    const { id } = req.params;
    const index = users.findIndex((item) => item.id === +id);
    if (index === -1) {
        return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({ data: users[index] });
});

// Delete user
app.delete("/user/:id", (req, res) => {
    const { id } = req.params;
    const index = users.findIndex((item) => item.id === +id);
    if (index === -1) {
        return res.status(404).json({ message: "No user found" });
    }
    users.splice(index, 1);
    res.status(200).json({ message: "user deleted successfully", data: users });
});

// Edit user
app.put("/user/:id", (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const index = users.findIndex((item) => item.id === +id);
    if (index === -1) {
        return res.status(404).json({ message: "no user found" });
    }
    if (!title) {
        return res.status(400).json({ message: "title is required" });
    }
    users[index].title = title;
    res.status(200).json({ message: "user edited successfully", data: users });
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});