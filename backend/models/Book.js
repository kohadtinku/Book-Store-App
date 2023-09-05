const mongoose = require("mongoose")
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publishYear: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

 const Book = mongoose.model("Cat", bookSchema);
 module.exports = Book