const JWT = require('jsonwebtoken');
const getUserData = require('../services/user.js');

async function authenticationMiddleware(req, res, next) {

    let token = req.header('Authorization');

    if (!token) {
        return res.status(401).json("Access denied");
    }

    token = token.split(" ");

    if (token.length !== 2) {
        return res.status(401).json("Access denied");
    }

    token = token[1];

    try {
        // Verify token and put the payload of it in the req.user
        const payload = await new Promise((resolve, reject) => {
            JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(payload);
                }
            });
        });

        const id = Number(payload.id);

        req.user = await getUserData(id);
        next();
    } catch (err) {
        res.status(401).json("Access denied");
    }
}

module.exports = authenticationMiddleware;