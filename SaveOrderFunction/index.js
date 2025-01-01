const { CosmosClient } = require("@azure/cosmos");

const client = new CosmosClient({
    endpoint: process.env.COSMOS_DB_ENDPOINT,
    key: process.env.COSMOS_DB_KEY
});

const databaseId = process.env.COSMOS_DB_DATABASE;
const containerId = process.env.COSMOS_DB_CONTAINER;

module.exports = async function (context, req) {
    try {
        const database = client.database(databaseId);
        const container = database.container(containerId);

        const requestData = req.body;

        if (!requestData) {
            context.res = {
                status: 400,
                body: "Invalid data. Please provide data to save."
            };
            return;
        }

        const { resource: newItem } = await container.items.create(requestData);

        context.res = {
            status: 201,
            body: newItem
        };
    } catch (error) {
        context.log("Error saving data to Cosmos DB:", error.message);
        context.res = {
            status: 500,
            body: "Error saving data to Cosmos DB."
        };
    }
};