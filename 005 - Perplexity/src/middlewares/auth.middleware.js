import jwt from 'jsonwebtoken'


const identifyUser = async (req, res, next) => {

    const token = req.cookies.token

    if (!token) {
        return res.status(400).json({
            message: 'unauthorized',
            success: false,
            err: 'no token provided'
        })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = decoded;
        next();
        
    }
    catch (err) {
        return res.status(400).json({
            message: 'token invalid',
            success: false,
            err: err.message
        })
    }

}


export default identifyUser;