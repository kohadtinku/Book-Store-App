const express = require("express")
const app = express();
const PORT = 5555;
const conn = require('./conn/conn')
const Book = require('./models/Book')
const booksRoutes = require('./routes/booksRoutes')
const cors = require('cors')
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
}));


app.get('/', (req, res) => {
    res.send("hii")
})
app.use('/books', booksRoutes)


app.listen(PORT, () => {
    console.log(`App listen on port : ${PORT}`);
})