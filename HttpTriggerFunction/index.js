const { CosmosClient } = require("@azure/cosmos");

// Inicializace Cosmos DB klienta
const client = new CosmosClient({
    endpoint: "https://pavelkostalcom.documents.azure.com:443/",
    key: "rlqQp1cyMTHC93BHXl9aFL2HFItZ8sSlpxakpvbQgAbbdcz0gHOcBDG3herKjbv0jlhBjtE6KdDSACDbz42nmQ==",
});

const databaseId = "AI_Prompt";
const containerId = "ListOfPrompts";

module.exports = async function (context, req) {
    try {
        // Připojení k databázi a kontejneru
        const database = client.database(databaseId); // Get the database object
        const container = database.container(containerId); // Get the container object

        // Načtení všech položek v kontejneru
        const query = "SELECT * FROM c"; // Jednoduchý SQL dotaz
        const { resources: items } = await container.items.query(query).fetchAll();

        // Vrácení dat jako odpověď
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