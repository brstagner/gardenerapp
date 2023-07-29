/** Start express server */

// const app = require('./app');

// require('dotenv').config();

// const PORT = process.env.PORT;

// app.listen(process.env.PORT,
//     () => console.log(`App on port ${PORT}`));

const throng = require('throng');
const app = require('./app');
require('dotenv').config();

const workers = process.env.WEB_CONCURRENCY || 1;

function start () {
    // Start your Express server here
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`App on port ${PORT}`));
}

// Use throng to start multiple instances of your server
throng({ workers, start });