const registerCrud = (registry, basePath, schemas) => {
    const { List, Create, Update } = schemas;

    registry.registerPath({
        method: "get",
        path: basePath,
        responses: {
            200: {
                description: "List items",
                content: {
                    "application/json": {
                        schema: List,
                    },
                },
            },
        },
    });

    registry.registerPath({
        method: "get",
        path: `${basePath}/{id}`,
        responses: {
            200: { description: "Get by ID" },
        },
    });

    registry.registerPath({
        method: "post",
        path: basePath,
        request: {
            body: {
                content: {
                    "application/json": {
                        schema: Create,
                    },
                },
            },
        },
        responses: {
            201: { description: "Created" },
        },
    });

    registry.registerPath({
        method: "put",
        path: `${basePath}/{id}`,
        request: {
            body: {
                content: {
                    "application/json": {
                        schema: Update,
                    },
                },
            },
        },
        responses: {
            200: { description: "Updated" },
        },
    });

    registry.registerPath({
        method: "patch",
        path: `${basePath}/{id}`,
        request: {
            body: {
                content: {
                    "application/json": {
                        schema: Update.partial(),
                    },
                },
            },
        },
        responses: {
            200: { description: "Patched" },
        },
    });

    registry.registerPath({
        method: "delete",
        path: `${basePath}/{id}`,
        responses: {
            204: { description: "Deleted" },
        },
    });
};

module.exports = registerCrud;
