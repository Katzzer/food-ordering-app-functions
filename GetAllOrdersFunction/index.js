require('dotenv').config();
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

        const query = "SELECT * FROM c";
        const { resources: items } = await container.items.query(query).fetchAll();

        context.res = {
            status: 200,
            body: items,
        };
    } catch (error) {
        context.log("Error fetching data from Cosmos DB:", error.message);
        context.res = {
            status: 500,
            body: "Error fetching data from Cosmos DB.",
        };
    }
};