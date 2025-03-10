const jwt = require('jsonwebtoken');
require('dotenv').config()
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    // console.log(token + )
    if (!token) {
        return res.status(403).send('Token is missing');
    }
console.log(token)
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid token');
        }
        req.user = decoded;  
        next();
    });
};
// dds
module.exports = authMiddleware
