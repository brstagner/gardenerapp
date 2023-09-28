require('dotenv').config();
const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("./expressError");

/**
 * Returned signed JWT from user_id and is_admin
 * @ param {object} user - {user_id, is_admin}
 * @ return { token }
 */
function createToken (user) {

    let payload = {
        userId: user.user_id,
        isAdmin: user.is_admin || false,
    };

    return jwt.sign(payload, process.env.SECRET_KEY);
}

/**
 * If a token was provided, verify it.
 * If valid, store the token payload {userId, isAdmin} on req.user.
 * 
 * @ param {object} req - {headers: {authorization: token}, params: {user_id}}
 */


// WORKS?
function authenticateJWT (req, res, next) {
    try {
        const token = req.headers && req.headers.authorization;
        if (token) {
            res.locals.user = jwt.verify(token, process.env.SECRET_KEY);
        }
        return next();
    } catch (err) {
        return next();
    }
}
// WORKS?


// function authenticateJWT (token) {
//     try {
//         const payload = jwt.verify(token, process.env.SECRET_KEY);
//         return payload;
//     }
//     catch (error) {
//         // No error passed for missing or faulty token
//         return;
//     }
// }


function isAdmin (req, res, next) {
    try {
        if (!res.locals.user || !res.locals.user.isAdmin) throw new UnauthorizedError();
        return next();
    } catch (err) {
        return next(err);
    }
}


// function isAdmin (user) {
//     if (!user.isAdmin) {
//         throw new UnauthorizedError("Must be administrator to view this page");
//     }
//     else {
//         return true;
//     }
// }

function isUser (req, res, next) {
    try {
        if (!res.locals.user || ((req.params.user_id != res.locals.user.user_id) && (!res.locals.user.isAdmin)))
            throw new UnauthorizedError();
        return next();
    } catch (err) {
        return next(err);
    }
}

// function isUser (currUserId, authUser) {
//     if (
//         (!authUser.isAdmin && // Not admin
//             (+currUserId !== +authUser.userId)) // Requested user_id is not userId from token
//     ) {
//         throw new UnauthorizedError(`Must be authorized user to view this page`);
//     }
//     else {
//         return true;
//     }
// }

module.exports = {
    createToken,
    authenticateJWT,
    isAdmin,
    isUser,
};