const jwt = require("jsonwebtoken");
const { secret } = require("../config");

function authMiddleware(req, res, next) {
    const fullToken = req.headers.authorization;
    const tokenP = fullToken.split(" ");
    const finalToken = tokenP[1];
    const decoded = jwt.verify(finalToken, secret);
    if (decoded.userId) {
        req.userId = decoded.userId;
        next();
    }
    else {
        res.status(403).json({
            message: "User not signed up"
        })
        return ;
    }
}
module.exports = {
    authMiddleware
}