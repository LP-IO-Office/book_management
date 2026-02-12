require("dotenv").config();
const express = require("express");
const cors = require("cors");

// ✅ ADD THESE TWO LINES
const swaggerUI = require("swagger-ui-express");
const { generateSwaggerSpec } = require("./swagger");

const booksRoutes = require("./routes/books.route");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Swagger UI
app.use(
    "/books-docs",
    swaggerUI.serve,
    swaggerUI.setup(generateSwaggerSpec())
);

// Routes
app.use("/books", booksRoutes);

app.get("/", (req, res) => {
    res.send("BOOKS API IS RUNNING...");
});

module.exports = app;
