const jwt = require('jsonwebtoken')

function identifyUser(req, res, next){
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({
            message: "token not provided"
        })
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    }
    catch (err) {
        return res.status(401).json({ message: "user not authorized" })
    }
    // const {userId} = decoded;

    req.user = decoded;// req.modi  | req.trump (custom property)
    next();

}

module.exports = identifyUser;