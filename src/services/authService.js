const secretKey = process.env.SECRET_KEY;
const httpStatus = require('http-status-codes')
const jwt = require('jsonwebtoken');

const checkTokenMW = (req, res, next) => {

    const token = req.headers['Authorization'];
    if (token !== 'undefined') {
        req.token = bearerHeader.split(' ')[1];
        next();
    } else {
        res.sendStatus(httpStatus.FORBIDDEN);
    }
}

const verifyToken = (req, res) => {

    jwt.verify(req.token, secretKey, (err, authData) => {
        if (err) {
            res.sendStatus(httpStatus.FORBIDDEN);
        } else {
            return req.authData = authData;
        }
    })
}

module.exports = {
    verifyToken,
    checkTokenMW
}