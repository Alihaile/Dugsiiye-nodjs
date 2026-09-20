const routes = require('express').Router();
const { findBooks, findBookById, updateBookById, deleteBook, addNewBook } = require('../controllers/bookController');

// get all books
routes.get('/books', findBooks);

// get a book by id
routes.get('/books/:id', findBookById);

// add a new book
routes.post('/books', addNewBook);

// update a book by id
routes.put('/books/:id', updateBookById);

// delete a book by id
routes.delete('/books/:id', deleteBook);

module.exports = routes;