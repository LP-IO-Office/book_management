const { z } = require("zod");
const { registry } = require("../swagger");

const BookSchema = z.object({
    id: z.number(),
    title: z.string(),
    author: z.string(),
    description: z.string(),
    rating: z.number(),
});

const CreateBookSchema = z.object({
    title: z.string(),
    author: z.string(),
    description: z.string(),
    rating: z.number(),
});

// Register schemas → auto Swagger
registry.register("Book", BookSchema);
registry.register("CreateBook", CreateBookSchema);

module.exports = {
    BookSchema,
    CreateBookSchema,
};
