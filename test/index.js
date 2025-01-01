const { CosmosClient } = require("@azure/cosmos");

// Initialize the Cosmos DB client
const client = new CosmosClient({
    endpoint: "https://pavelkostalcom.documents.azure.com:443/",
    key: "rlqQp1cyMTHC93BHXl9aFL2HFItZ8sSlpxakpvbQgAbbdcz0gHOcBDG3herKjbv0jlhBjtE6KdDSACDbz42nmQ==",
});

const databaseId = "AI_Prompt";
const containerId = "ListOfPrompts";

async function runAzureFunctionLocally(context, req) {
    try {
        // Connect to the database and container
        const database = client.database(databaseId);
        const container = database.container(containerId);

        // Define the query to select all items
        const query = "SELECT * FROM c";

        // Execute the query and fetch all results
        const { resources: items } = await container.items.query(query).fetchAll();

        // Mock sending an HTTP response
        context.res = {
            status: 200,
            body: items,
        };

        console.log("Response:", context.res);
    } catch (error) {
        // Log error and simulate a failure response
        console.error("Error fetching data from Cosmos DB:", error.message);
        context.res = {
            status: 500,
            body: "Error fetching data from Cosmos DB.",
        };

        console.log("Response:", context.res);
    }
}

// Mock Azure Function context and request objects
if (require.main === module) {
    const context = {
        log: console.log, // Log output for debugging
        res: null, // Placeholder for HTTP response
    };

    const req = {
        method: "GET", // Simulating a GET request
        query: {}, // Add query parameters if you want
    };

    // Call the function as if triggered by Azure
    runAzureFunctionLocally(context, req);
}

module.exports = runAzureFunctionLocally;