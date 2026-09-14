const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [
    { id: 1, title: 'Atomic Habits', author: 'James Clear' },
    { id: 2, title: 'Deep Work', author: 'Cal Newport' }
];

// routes
app.get('/books', (req, res) => {
    res.json(books);
});

// get a book by id
app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);

    if (!book) {
        res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
});

// add a new book
app.post('/books', (req, res) => {
    const title = req.body?.title || '';
    const author = req.body?.author || '';

    if (!title || !author) {
        return res.status(400).json({ message: 'Title and author are required' });
    }

    const newBook = { id: books.length + 1, title, author };
    books.push(newBook);
    res.status(201).json(newBook);
});

// update a book by id
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const { title } = req.body;
    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    book.title = title;

    res.json(book);
});

// delete a book by id
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    books = books.filter(b => b.id !== bookId);

    res.json({ message: `Book with ID ${bookId} deleted successfully` });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});