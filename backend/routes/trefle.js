require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.use(express.json());

const FRONTEND_URL = process.env.FRONTEND_URL;

// router.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", FRONTEND_URL);
//     res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS, DELETE");
//     res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept, Authorization, header");
//     next();
// });

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://gardenbloom.surge.sh");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    // Add the Vary header for CORS-related headers
    // res.header("Vary", "Origin, Access-Control-Request-Headers, Access-Control-Request-Method");
    res.header("Vary", "Origin, Access-Control-Request-Headers, Access-Control-Request-Method, Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers");



    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

/** POST /trefle/search - { name, color, months, token } => { plants, page links }
 *  Request a list of plants from Trefle API
 *  Authorization required: Trefle API token
 */
router.post("/search", async (req, res, next) => {

    let urlString = 'https://trefle.io/api/v1/plants/';

    if (req.body.name) {
        urlString += `search?q=${req.body.name}&`;
    }
    else {
        urlString += `?`;
    }

    if (req.body.color) urlString += `filter[flower_color]=${req.body.color}&`;

    if (req.body.months.length) urlString += `filter[bloom_months]=${req.body.months}&`;

    urlString += `token=${process.env.TREFLE_TOKEN}`;

    try {
        const response = await axios.get(urlString);
        return res.json(response.data);
    }
    catch (err) {
        next(err);
    }
});

/** POST /trefle/page - { link, token } => { plants, page links }
 *  Request a new page of plants from Trefle API
 *  Authorization required: Trefle API token
 */
router.post("/page", async (req, res, next) => {
    try {
        const response = await axios.get(
            `https://trefle.io${req.body.link}&token=${process.env.TREFLE_TOKEN}`
        );

        return res.json(response.data);
    }
    catch (err) {
        next(err);
    }
});

/** POST /trefle/species - { species_id, token } => { plant }
 *  Get individual plant data from Trefle API
 *  Authorization required: Trefle API token
 */
router.post("/species", async (req, res, next) => {
    try {
        const response = await axios.get(
            `https://trefle.io/api/v1/species/${req.body.species_id}?token=${process.env.TREFLE_TOKEN}`
        );

        return res.json(response.data);
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;
