const { CosmosClient } = require("@azure/cosmos");

// Initialize Cosmos DB client
const client = new CosmosClient({
    endpoint: "https://pavelkostalcom.documents.azure.com:443/",
    key: "rlqQp1cyMTHC93BHXl9aFL2HFItZ8sSlpxakpvbQgAbbdcz0gHOcBDG3herKjbv0jlhBjtE6KdDSACDbz42nmQ=="
});

const databaseId = "AI_Prompt";
const containerId = "ListOfPrompts";

module.exports = async function (context, req) {
    try {
        const database = client.database(databaseId);
        const container = database.container(containerId);

        // Get data from the request body
        const requestData = req.body;

        if (!requestData) {
            context.res = {
                status: 400,
                body: "Invalid data. Please provide data to save."
            };
            return;
        }

        // Insert data into Cosmos DB
        const { resource: newItem } = await container.items.create(requestData);

        // Respond with the inserted data
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