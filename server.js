const express = require('express');
const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');

const server = express();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

const PORT = 5000;

server.use(
    cors({
        origin: [
            // "http://localhost:5273",
            "https://crud-operations-self-eight.vercel.app",
        ],
        credentials: true,
    })
);

server.use(express.json());
server.use(middlewares);

// Custom routes if needed (e.g., extend data model)

server.use(router);

server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
});
