const jwt = require('jsonwebtoken');


const homeMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);

    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.json({
            success : false,
            message : 'Not authorized to this home page'
        });
    }

    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decodeToken);
        req.userInfo = decodeToken;
        next();
    } catch(error) {
        return res.status(400).json({
            success : false,
            message : 'Decoded token process failed'
        });
    }
    
}


module.exports = homeMiddleware;