/** Start express server */

// const app = require('./app');

require('dotenv').config();
// const PORT = process.env.PORT;

// app.listen(process.env.PORT,
//     () => console.log(`App on port ${PORT}`));

// ALL BELOW ADDED
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length; // Get the number of CPU cores

const app = require('./app'); // Your Express app

if (cluster.isMaster) {
    // Fork workers for each CPU core
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        // Restart the worker if it dies
        cluster.fork();
    });
} else {
    // Workers will share the same port for incoming connections
    const server = http.createServer(app);
    const PORT = process.env.PORT || 3000;

    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}, Worker ${cluster.worker.id}`);
    });
}