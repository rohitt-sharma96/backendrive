const jwt = require('jsonwebtoken');
const redis = require('../config/cache')


const identifyUser = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({
            message: "invalid token"
        })
    }

    const isTokenBlacklisted = await redis.get(token);
    
    if(isTokenBlacklisted){
        return res.status(401).json({
            message:"token blacklisted"
        })
    }
    

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded; // custom property -> req.user (req.chacha)
        next();
    }
    catch (err) {
        console.log("err in decoded")
    }

    /* console.log(decoded);  format -> {
                                         id:'534535354dsfs55',
                                         username: 'test'
                                        } */
}

module.exports = identifyUser;