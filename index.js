require("dotenv").config();
const connectDB = require("./db");
const Todo = require("./models/Todo");

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

//Koppla till databasen
connectDB();

app.use(cors());
app.use(bodyParser.json());


// READ alla todos
app.get("/api/todos", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: "Kunde inte hämta todos" });
    }
});


// READ en enskild todo
app.get("/api/todos/:id", async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ error: "Todo hittades inte" });
        res.json(todo);
    } catch (err) {
        res.status(500).json({ error: "Kunde inte hämta todo" });
    }
});


// CREATE
app.post("/api/todos", async (req, res) => {
    try {
        const { title, description, status } = req.body;

        //Skapar todo
        const todo = await Todo.create({
            title,
            description,
            status
        });

        res.status(201).json(todo);
    } catch (err) {

        //felmeddelande
        res.status(400).json({ error: err.message });
    }
});


// UPDATE status, titel, beskrivning
app.put("/api/todos/:id", async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ error: "Todo hittades inte" });

        if (title) todo.title = title;
        if (description !== undefined) todo.description = description;
        if (status !== undefined) todo.status = status;

        await todo.save();
        res.json(todo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// DELETE en todo
app.delete("/api/todos/:id", async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) return res.status(404).json({ error: "Todo hittades inte" });
        res.json({ message: "Todo borttagen" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
