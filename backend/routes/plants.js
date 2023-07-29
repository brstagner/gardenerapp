'use strict';

/** Routes for plants. */
require('dotenv').config();
const jsonschema = require('jsonschema');
const express = require('express');
const { authenticateJWT, isAdmin, isUser } = require('../authorization');
const { BadRequestError, UnauthorizedError } = require('../expressError');

const Plant = require('../models/plant');
const plantNewSchema = require('../schemas/plantNew.json');
const plantUpdateSchema = require('../schemas/plantUpdate.json');

const router = express.Router();

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
    res.header("Vary", "Origin, Access-Control-Request-Headers, Access-Control-Request-Method");

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

/** GET /plants/all: { } => { plants }
 *  Get all plants
 *  Authorization required: isAdmin
 */
router.get('/all', async function (req, res, next) {
    try {
        const user = authenticateJWT(req.headers.authorization);
        isAdmin(user);
        const plants = await Plant.getAllPlants();
        return res.json({ plants });
    }
    catch (err) {
        return next(err);
    }
});

/** GET /plants/user/:user_id: { user_id } => { plants }
 *  Get user's plants
 *  Authorization required: relevant user or isAdmin
 */
router.get('/user/:user_id', async function (req, res, next) {
    try {
        const authUser = authenticateJWT(req.headers.authorization);
        isUser(req.params.user_id, authUser);
        const plants = await Plant.getUserPlants(req.params.user_id);
        return res.json({ plants });
    }
    catch (err) {
        return next(err);
    }
});

/** GET /plants/:plant_id - { plant_id } => { plant }
 *  Get one plant
 *  Authorization required: relevant user or isAdmin
 */
router.get('/:plant_id', async function (req, res, next) {
    try {
        const authUser = authenticateJWT(req.headers.authorization);
        const plant = await Plant.getOnePlant(req.params.plant_id);
        isUser(plant.user_id, authUser);
        return res.json({ plant });
    }
    catch (err) {
        return next(err);
    }
});

/** POST /plants - { plant } => { plant }
 *  Add one plant
 *  Authorization required: relevant user or isAdmin
 */
router.post('/', async function (req, res, next) {
    try {
        // Validate against new plant schema
        const validator = jsonschema.validate(req.body, plantNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const authUser = authenticateJWT(req.headers.authorization);
        isUser(req.body.user_id, authUser);

        const plant = await Plant.addPlant(req.body);
        return res.status(201).json({ plant });
    }
    catch (err) {
        return next(err);
    }
});

/** PATCH /plants/:plant_id - { user_id, plant } => { plant }
 *  Patch one plant
 *  Authorization required: relevant user or isAdmin
 */
router.patch('/:plant_id', async function (req, res, next) {

    try {
        // Check authorization against token data
        const authUser = authenticateJWT(req.headers.authorization);
        isUser(req.body.user_id, authUser);
        delete req.body.user_id;
        // Validate against update schema
        const validator = jsonschema.validate(req.body, plantUpdateSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        // Update plant, return plant data
        const plant = await Plant.update(req.params.plant_id, req.body);
        return res.status(200).json({ plant });
    }
    catch (err) {
        return next(err);
    }
});

/** DELETE /plants/:plant_id - { user_id, plant_id } => { }
 *  Delete one plant
 *  Authorization required: relevant user or isAdmin
 */
router.delete('/:plant_id', async function (req, res, next) {
    try {
        // Check authorization against token data
        const plant = await Plant.getOnePlant(req.params.plant_id);
        const authUser = authenticateJWT(req.headers.authorization);
        isUser(plant.user_id, authUser);
        // Delete plant
        await Plant.delete(req.params.plant_id);
        return res.status(200).json({ message: `Plant #${req.params.plant_id} deleted` });
    }
    catch (err) {
        return next(err);
    }
});

module.exports = router;