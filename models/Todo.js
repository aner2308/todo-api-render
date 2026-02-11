const mongoose = require("mongoose");

//Nytt schema för min Todo-data
const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3
  },
  description: {
    type: String,
    maxlength: 200,
    default: ""
  },
  status: {
    type: Number,
    enum: [0, 1, 2],
    default: 0
  }
});

module.exports = mongoose.model("Todo", TodoSchema);
