const JWT = require('jsonwebtoken');
const getUserData = require('../services/user.js');

async function authenticationMiddleware(req, res, next) {

    let token = req.header('Authorization');

    if (!token) {
        console.log('no token')
        return res.status(401).json("Access denied");
    }

    token = token.split(" ");

    if (token.length !== 2) {
        console.log('bad token')
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
        console.log('error on middleware', err)
        res.status(401).json("Access denied");
    }
}

function isAdmin(req, res, next) {
    if (req.user.dataValues.role === 'dev') {
        return next();
    }
    return res.status(401).json("Access denied");
}

function trueIfAdmin() {
    if (req.user.dataValues.role === 'dev') {
        return true;
    }
    return false;
}

function isHR(req, res, next) {
    if (req.user.dataValues.role === 'hr' || req.user.dataValues.role === 'dev') {
        return next();
    }
    return res.status(401).json("Access denied");
}

function canGetCompany(companyId, req, res, next) {
    if (req.user.dataValues.role === 'dev' || req.user.dataValues.company_id === companyId) {
        return next();
    }
    return res.status(401).json("Access denied");
}

function canPostCompany(companyId, req, res, next) {
    if (req.user.dataValues.role === 'dev' || (req.user.dataValues.company_id === companyId && req.user.dataValues.role === 'hr')) {
        return next();
    }
    return res.status(401).json("Access denied");
}



module.exports = { authenticationMiddleware, isAdmin, isHR, canGetCompany, canPostCompany, trueIfAdmin };