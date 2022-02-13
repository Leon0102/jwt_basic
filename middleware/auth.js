const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require('../errors');

const authenticationMiddleware = async (req, res, next) => {
    // console.log(req.headers);
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Missing or invalid authorization header');
    }

    const token = authHeader.split(' ')[1];
    // console.log(token);
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log('decoded', decoded);
        // console.log('decoded', decoded.username);
        const {id,username} = decoded;
        req.user = {
            id,
            username
        };
        next();
        // const LuckyNumber = Math.round(Math.random() * 100);
        // res.status(200).json({
        //     msg: `Welcome to the dashboard ${decoded.username}`,
        //     secret: `Here is your authorized data, your lucky is ${LuckyNumber}`
        // })
    }catch(err){
        throw new UnauthenticatedError('No authorized to access this route');
    }
}

module.exports = authenticationMiddleware;
