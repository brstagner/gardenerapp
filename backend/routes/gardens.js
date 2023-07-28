'use strict';

/** Routes for gardens. */
const jsonschema = require('jsonschema');

const express = require('express');
// const { isAdmin, isUser, userId } = require('../auth');

const { authenticateJWT, isAdmin, isUser } = require('../authorization');


const { BadRequestError, UnauthorizedError } = require('../expressError');
const Garden = require('../models/garden');
const gardenNewSchema = require('../schemas/gardenNew.json');
const gardenUpdateSchema = require('../schemas/gardenUpdate.json');
const { userId } = require('../auth');

const router = express.Router();

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept, Authorization, header");
    next();
});

/** GET /gardens/all: { } => { gardens }
 *  Get all gardens
 *  Authorization required: isAdmin
 */
router.get('/all', async function (req, res, next) {
    try {
        const user = authenticateJWT(req.headers.authorization);
        isAdmin(user);
        const gardens = await Garden.getAllGardens();
        return res.status(200).json({ gardens });
    }
    catch (error) {
        return next(error);
    }
});

/** GET /gardens/user/:user_id: { user_id } => { gardens }
 *  Get user's gardens
 *  Authorization required: relevant user or isAdmin
 */
router.get('/user/:user_id', async function (req, res, next) {
    try {
        const authUser = authenticateJWT(req.headers.authorization);
        isUser(req.params.user_id, authUser);
        const gardens = await Garden.getUserGardens(req.params.user_id);
        return res.status(200).json({ gardens });
    }
    catch (error) {
        return next(error);
    }
});

/** GET /gardens/:garden_id - { garden_id } => { garden }
 *  Get one garden
 *  Authorization required: relevant user or isAdmin
 */
router.get('/:garden_id', async function (req, res, next) {
    try {
        const authUser = authenticateJWT(req.headers.authorization);
        const garden = await Garden.getOneGarden(req.params.garden_id);
        isUser(garden.user_id, authUser);
        return res.status(200).json({ garden });
    }
    catch (err) {
        return next(err);
    }
});

/** POST /gardens - { garden } => { garden }
 *  Add one garden
 *  Authorization required: relevant user or isAdmin
 */
router.post('/', async function (req, res, next) {
    try {
        // Validate against new garden schema
        const validator = jsonschema.validate(req.body, gardenNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        // Check authorization against token data
        const authUser = authenticateJWT(req.headers.authorization);
        isUser(req.body.user_id, authUser);
        // Create garden, return garden data
        const garden = await Garden.addGarden(req.body);
        return res.status(201).json({ garden });
    }
    catch (err) {
        return next(err);
    }
});

/** PATCH /gardens/:garden_id - { user_id, garden } => { garden }
 *  Patch one garden
 *  Authorization required: relevant user or isAdmin
 */
router.patch('/:garden_id', async function (req, res, next) {
    try {
        // Check authorization against token data
        const authUser = authenticateJWT(req.headers.authorization);
        isUser(req.body.user_id, authUser);
        delete req.body.user_id;
        // Validate against update schema
        const validator = jsonschema.validate(req.body, gardenUpdateSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        // Update garden, return garden data
        const garden = await Garden.update(req.params.garden_id, req.body);
        return res.status(200).json({ garden });
    }
    catch (err) {
        return next(err);
    }
});

/** DELETE /gardens/:garden_id - { user_id, garden_id } => { }
 *  Delete one garden
 *  Authorization required: relevant user or isAdmin
 */
router.delete('/:garden_id', async function (req, res, next) {
    try {
        const garden = await Garden.getOneGarden(req.params.garden_id);
        // Check authorization against token data
        const authUser = authenticateJWT(req.headers.authorization);
        isUser(garden.user_id, authUser);
        // Delete garden
        await Garden.delete(req.params.garden_id);
        return res.status(200).json({
            message: `Garden #${req.params.garden_id} deleted`
        });
    }
    catch (err) {
        return next(err);
    }
});

module.exports = router;