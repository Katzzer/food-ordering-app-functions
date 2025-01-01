# Food ordering app

## Description

- This application is an **Azure Function** designed to act as a serverless API endpoint for interacting with an **Azure Cosmos DB** instance.
- It is used with `food-ordering-app` a Next.js application that runs on [https://food-ordering-app.pavelkostal.com/](https://food-ordering-app.pavelkostal.com/)
- When pushed to GitHub, then GitHub action will run workflow and put all functions from this project to the specified Azure Function App
  - Workflows are in `/.github/workflows` 

## How it works
- There are two directories `GetAllOrdersFunction` and `SaveOrderFunction`
- The Name of the directory will be named of the function in Azure Function App
- In each directory are two files:
  - `function.json:` specify a type of trigger, methods, auth level, etc.
  - `index.js`: this is the functions
- In file `/host.json` is setting for Azure
- In `package.json` are dependencies and script 

## How to run locally
- To be able to run Azure function locally run `npm install -g azure-functions-core-tools@4 --unsafe-perm`
- Run `npm install` to install all dependencies
- Create file `.env` and put there:
```dotenv
COSMOS_DB_ENDPOINT=https://your-cosmos-db-account.documents.azure.com:443/
COSMOS_DB_KEY=your-secret-cosmos-db-key
COSMOS_DB_DATABASE=your-database-name
COSMOS_DB_CONTAINER=your-database-container
```
- Then run `npm start` it will create endpoints on url `http://localhost:7071`
- Use `GET` request to [http://localhost:7071/api/GetAllOrdersFunction](http://localhost:7071/api/GetAllOrdersFunction)
- Use `POST` request to [http://localhost:7071/api/SaveOrderFunction](http://localhost:7071/api/SaveOrderFunction)

## How to configure it on Azure Function app (all steps)
- Create App Function - use `Consumption` plan and allow to get code from GitHub (on `Consumption` plan it is not possible to create function directly in Azure) 
- Deployment from GitHub could be also set in `Function App` → `Menu` → `Deployment Center`
- Set env variables:
```dotenv
COSMOS_DB_ENDPOINT=https://your-cosmos-db-account.documents.azure.com:443/
COSMOS_DB_KEY=your-secret-cosmos-db-key
COSMOS_DB_DATABASE=your-database-name
COSMOS_DB_CONTAINER=your-database-container
```
- When testing `POST` request add to headers `application/json` and then send any `json` (atm there is no restriction for JSON)

## TODO
- regenerate key for Cosmo DB
- Add restriction to payload