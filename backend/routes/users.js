'use strict';

/** Routes for users. */
const { db } = require('../db');
const jsonschema = require('jsonschema');

const express = require('express');
const { isAdmin, isUser, authenticateJWT } = require('../authorization');
const { BadRequestError } = require('../expressError');
const User = require('../models/user');
const { createToken } = require('../authorization');
const userNewSchema = require('../schemas/userNew.json');
const userUpdateSchema = require('../schemas/userUpdate.json');

const router = express.Router();

// router.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
//     res.header("Access-Control-Allow-Methods", "GET, POST, PATCH");
//     res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
// });

router.use(authenticateJWT);

/**Get all users */
router.get('/', isAdmin, async function (req, res, next) {
    try {
        const users = await User.getAllUsers();
        return res.json({ users });
    }
    catch (err) {
        return next(err);
    }
});

/**Get one user */
router.get('/:username', async function (req, res, next) {
    try {
        const user = await User.getOneUser(req.params.username);
        return res.json({ user });
    }
    catch (err) {
        return next(err);
    }
});

/**Add one user */
router.post('/', async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const user = await User.register(req.body);

        const token = createToken(user);
        console.log(user);
        return res.status(201).json({ user, token });
    }
    catch (err) {
        return next(err);
    }
});

/**Update one user */
router.patch('/:username', async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userUpdateSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const user = await User.update(req.params.username, req.body);
        return res.status(200).json({ user });
    }
    catch (err) {
        return next(err);
    }
});

module.exports = router;

// 'use strict';

// /** Routes for users. */
// require('dotenv').config();
// const jsonschema = require('jsonschema');

// const express = require('express');
// // const { isAdmin, isUser } = require('../auth');
// const { createToken, authenticateJWT, isAdmin, isUser } = require('../authorization');
// const { BadRequestError } = require('../expressError');
// const User = require('../models/user');
// // const { createToken } = require('../auth');
// const userNewSchema = require('../schemas/userNew.json');
// const userUpdateSchema = require('../schemas/userUpdate.json');

// const router = express.Router();

// const FRONTEND_URL = process.env.FRONTEND_URL;

// // router.use(function (req, res, next) {
// //     res.header("Access-Control-Allow-Origin", FRONTEND_URL);
// //     res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS, DELETE");
// //     res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept, Authorization, header");
// //     next();
// // });

// // router.use(function (req, res, next) {
// //     res.header("Access-Control-Allow-Origin", "https://gardenbloom.surge.sh");
// //     res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS, DELETE");
// //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

// //     // Add the Vary header for CORS-related headers
// //     res.header("Vary", "Origin, Access-Control-Request-Headers, Access-Control-Request-Method, Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers");

// //     // Handle preflight requests
// //     if (req.method === 'OPTIONS') {
// //         return res.sendStatus(200);
// //     }

// //     next();
// // });

// /** GET /users/all: { } => { users }
//  *  Get all users
//  *  Authorization required: isAdmin
//  */
// router.get('/all', async function (req, res, next) {
//     try {
//         const authUser = authenticateJWT(req.headers.authorization);
//         isAdmin(authUser);
//         const users = await User.getAllUsers();
//         return res.json({ users });
//     }
//     catch (err) {
//         return next(err);
//     }
// });

// /** GET /users/:user_id - { user_id } => { user }
//  *  Get one user
//  *  Authorization required: logged-in user or isAdmin
//  */
// router.get('/:user_id', async function (req, res, next) {
//     try {
//         const authUser = authenticateJWT(req.headers.authorization);
//         isUser(req.params.user_id, authUser);
//         const user = await User.getOneUser(req.params.user_id);
//         return res.json({ user });
//     }
//     catch (err) {
//         return next(err);
//     }
// });

// /** POST /users - { user } => { user }
//  *  Add one user
//  *  Authorization required: none
//  */
// router.post('/', async function (req, res, next) {
//     try {
//         const validator = jsonschema.validate(req.body, userNewSchema);
//         if (!validator.valid) {
//             const errs = validator.errors.map(e => e.stack);
//             throw new BadRequestError(errs);
//         }
//         const user = await User.register(req.body);

//         const token = createToken(user);

//         return res.status(201).json({ user, token });
//     }
//     catch (err) {
//         return next(err);
//     }
// });

// /** PATCH /users/:user_id - { user_id, user } => { user }
//  *  Patch one user
//  *  Authorization required: logged-in user or isAdmin
//  */
// router.patch('/:user_id', async function (req, res, next) {
//     try {
//         // Check authorization against token data
//         const authUser = authenticateJWT(req.headers.authorization);
//         isUser(req.params.user_id, authUser);

//         const validator = jsonschema.validate(req.body, userUpdateSchema);
//         if (!validator.valid) {
//             const errs = validator.errors.map(e => e.stack);
//             throw new BadRequestError(errs);
//         }
//         const user = await User.update(req.params.user_id, req.body);
//         return res.status(200).json({ user });
//     }
//     catch (err) {
//         return next(err);
//     }
// });

// /** DELETE /users/:user_id - { user_id } => { }
//  *  Delete one user
//  *  Authorization required: relevant user or isAdmin
//  */
// router.delete('/:user_id', async function (req, res, next) {
//     try {
//         // Check authorization against token data
//         const authUser = authenticateJWT(req.headers.authorization);
//         isUser(req.params.user_id, authUser);
//         await User.delete(req.params.user_id);
//         return res.status(200).json({ message: `User #${req.params.user_id} deleted` });
//     }
//     catch (err) {
//         return next(err);
//     }
// });

// module.exports = router;