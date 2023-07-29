"use strict";

/** Routes for authentication. */
require('dotenv').config();
const jsonschema = require("jsonschema");

const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../authorization");

const userAuthSchema = require("../schemas/userAuth.json");
const userRegisterSchema = require("../schemas/userNew.json");
const { BadRequestError } = require("../expressError");

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


/** POST /auth/token: { user, password } => { token } */
router.post("/token", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userAuthSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const { username, password } = req.body;
        const user = await User.authenticate(username, password);
        const token = createToken(user);
        return res.json({ ...user, token });
    } catch (err) {
        return next(err);
    }
});


/** POST /auth/register:   { user } => { token }
 *
 * user must include { username, password, firstName, lastName, email }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/register", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userRegisterSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const newUser = await User.register({ ...req.body, isAdmin: false });
        const token = createToken(newUser);

        return res.status(201).json({ ...newUser, token });
    } catch (err) {
        return next(err);
    }
});


module.exports = router;