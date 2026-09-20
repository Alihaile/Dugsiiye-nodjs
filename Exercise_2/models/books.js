const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishedYear: {
        type: Number,
    },
    genre: {
        type: String,
    }
});

const book = mongoose.model('Book', bookSchema);

module.exports = book;