const express = require("express");
const router = express.Router();

const registerCrud = require("../swagger.helper");
const { registry } = require("../swagger");
const { BookSchema, CreateBookSchema } = require("../schemas/book.schemas");

const {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    patchBook,
    deleteBook,
} = require("../controllers/books.controller");

// Swagger auto CRUD
registerCrud(registry, "/books", {
    List: BookSchema.array(),
    Create: CreateBookSchema,
    Update: BookSchema,
});

// Routes
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", createBook);
router.put("/:id", updateBook);
router.patch("/:id", patchBook);
router.delete("/:id", deleteBook);

module.exports = router;
