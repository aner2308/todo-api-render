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



// UPDATE status

// DELETE

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
