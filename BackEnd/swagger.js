const {
    OpenAPIRegistry,
    OpenApiGeneratorV3,
    extendZodWithOpenApi,
} = require("@asteasolutions/zod-to-openapi");

const { z } = require("zod");

// 🔥 REQUIRED
extendZodWithOpenApi(z);

const registry = new OpenAPIRegistry();

const generateSwaggerSpec = () => {
    const generator = new OpenApiGeneratorV3(registry.definitions);

    return generator.generateDocument({
        openapi: "3.0.0",
        info: {
            title: "Books API",
            version: "1.0.0",
        },
        servers: [{ url: "http://localhost:5000" }],
    });
};

module.exports = {
    registry,
    generateSwaggerSpec,
};
