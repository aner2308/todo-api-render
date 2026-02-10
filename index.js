const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// testdatabas
let todos = [];
let nextId = 1;

// READ alla todos
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

// CREATE
app.post('/api/todos', (req, res) => {
    const { title, description, status } = req.body;

    //Validerar titeln
    if (!title || title.length < 3) {
        return res.status(400).json({ error: "Titel måste vara minst 3 tecken lång." });
    }

    //Validering av beskrivning (max 200 tecken)
    if (description && description.length > 200) {
        return res.status(400).json({ error: "Beskrivningen får max vara 200 tecken." });
    }

    //Validering av status
    const allowedStatus = [0, 1, 2]; // 0=Ej påbörjad, 1=Pågående, 2=Avklarad
    let todoStatus = status !== undefined ? status : 0; // default 0
    if (!allowedStatus.includes(todoStatus)) {
        return res.status(400).json({ error: "Status måste vara 0, 1 eller 2." });
    }

    //Skapar todo
    const todo = {
        id: nextId++,
        title,
        description: description || "",
        status: todoStatus
    };

    //Lägger in ny todo i arrayen todos
    todos.push(todo);
    res.status(201).json(todo);
});

// UPDATE status, titel, beskrivning
app.put('/api/todos/:id', (req, res) => {
    const { id } = req.params; // id från URL
    const { title, description, status } = req.body; // data från body

    // Hitta todo i arrayen
    const todo = todos.find(t => t.id == id);
    if (!todo) {
        return res.status(404).json({ error: "Todo hittades ej." });
    }

    // Validerar titeln samt längd på titel
    if (title && title.length < 3) {
        return res.status(400).json({ error: "Titel måste vara minst 3 tecken lång." });
    }

    // Validerr beskrivningen
    if (description && description.length > 200) {
        return res.status(400).json({ error: "Beskrivningen får max vara 200 tecken." });
    }

    // Validerar status och att det är en giltig siffra
    const allowedStatus = [0, 1, 2];
    if (status !== undefined && !allowedStatus.includes(status)) {
        return res.status(400).json({ error: "Status måste vara 0, 1 eller 2." });
    }

    // Uppdatera fälten
    if (title) todo.title = title;
    if (description) todo.description = description;
    if (status !== undefined) todo.status = status;

    res.json(todo);
});


// DELETE en todo
app.delete('/api/todos/:id', (req, res) => {
    const { id } = req.params;

    // Kontrollerar om todo finns
    const index = todos.findIndex(t => t.id == id);

    //Om todo inte finns, skickas 404 not found
    if (index === -1) {
        return res.status(404).json({ error: "Todo hittades ej." });
    }

    // Tar bort todo med en splice
    todos.splice(index, 1);

    // Skickar status 204, No Content
    res.status(204).send();
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
