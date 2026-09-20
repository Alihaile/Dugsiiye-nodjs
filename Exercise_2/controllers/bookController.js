

const Book = require('../models/books');

// find all books
exports.findBooks = async (req, res) => {
    const { title, author, genre, publishedYear } = req.query;
    const filters = {};

    if (title) filters.title = title;
    if (author) filters.author = author;
    if (genre) filters.genre = genre;
    if (publishedYear) filters.publishedYear = Number(publishedYear);

    const books = await Book.find(filters);

    if (!books || books.length === 0) {
        return res.status(404).json({ message: 'No books found' });
    }

    res.json(books);
}

// find a book by id
exports.findBookById = async (req, res) => {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
}

// create new book
exports.addNewBook = async (req, res) => {
    const { title, author, publishedYear, genre } = req.body;

    if (!title || !author) {
        return res.status(400).json({ message: 'Title and author are required' });
    }

    const newBook = new Book({ title, author, publishedYear, genre });
    await newBook.save();

    res.status(201).json(newBook);

}

//update a book by id
exports.updateBookById = async (req, res) => {
    const bookId = req.params.id;
    const { title, author, publishedYear, genre } = req.body;

    const book = await Book.findById(bookId);

    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.publishedYear = publishedYear || book.publishedYear;
    book.genre = genre || book.genre;

    await book.save();

    res.json(book);
}

// delete a book
exports.deleteBook = async (req, res) => {
    const bookId = req.params.id;
    const book = await Book.findByIdAndDelete(bookId);

    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: `Book with id ${bookId} deleted successfully` });
}