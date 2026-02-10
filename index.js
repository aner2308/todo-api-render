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

// UPDATE status

// DELETE

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
