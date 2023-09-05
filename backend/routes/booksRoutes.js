// const express = require('express')
// const router = express.Router()
// const Book = require('../models/Book')
// //Routes for new book
// router.post('/', async (req, res) => {
//     try {
//         if (!req.body.title || !req.body.author || !req.body.publishYear) {
//             return res.status(400).send({
//                 msg: "Fill All Required Fields"
//             })
//         }
//         const newBook = {
//             title: req.body.title,
//             author: req.body.author,
//             publishYear: req.body.publishYear,
//         }
//         const book = await Book.create(newBook);
//         return res.status(201).send(book)
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ msg: error.msg })

//     }
// })

// //Routes for get book

// router.get('/', async (req, res) => {
//     try {
//         const books = await Book.find({})
//         return res.status(200).json({
//             count: books.length,
//             data: books
//         })
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ msg: error.msg })

//     }
// })


// //Routes for get book by id

// router.get('/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const book = await Book.findById(id)
//         return res.status(200).json(book)
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ msg: error.msg })

//     }
// })

// //Routes for update book

// router.patch('/:id', async (req, res) => {
//     try {
//         if (!req.body.title || !req.body.author || !req.body.publishYear) {
//             return res.status(400).send({
//                 msg: "Fill All Required Fields"
//             })
//         }
//         const id = req.params.id;
//         const res = await Book.findByIdAndUpdate(id, req.body);
//         if (!res) {
//             return res.status(404).json({ message: "Book not found" })
//         } {

//             return res.status(200).json({ message: "Book updated successfuly" })
//         }

//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ message: error.message })

//     }
// })
// //Routes for delete book

// router.delete('/:id', async (req, res) => {
//     try {
//         const id = req.params.id; // Get the book ID from the request params

//         // Find the book by ID and delete it
//         const deletedBook = await Book.findByIdAndDelete(id);

//         if (!deletedBook) {
//             // If the book with the specified ID was not found
//             return res.status(404).json({ message: 'Book not found' });
//         }

//         // If the book was successfully deleted
//         return res.status(200).json({ message: 'Book deleted successfully' });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: error.message });
//     }
// });

// module.exports = router

//============================gpt code =============
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Middleware to check if required fields are present
function validateFields(req, res, next) {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
        return res.status(400).send({ msg: "Fill All Required Fields" });
    }
    next();
}

// Error handler middleware
function errorHandler(res, error) {
    console.error(error);
    res.status(500).send({ message: error.message });
}

// Routes for new book
router.post('/', validateFields, async (req, res) => {
    try {
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }
        const book = await Book.create(newBook);
        res.status(201).send(book);
    } catch (error) {
        errorHandler(res, error);
    }
});

// Routes for get book
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        errorHandler(res, error);
    }
});

// Routes for get book by id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findById(id);
        res.status(200).json(book);
    } catch (error) {
        errorHandler(res, error);
    }
});

// Routes for update book
router.patch('/:id', validateFields, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body);
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book updated successfully" });
    } catch (error) {
        errorHandler(res, error);
    }
});

// Routes for delete book
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        errorHandler(res, error);
    }
});

module.exports = router;


