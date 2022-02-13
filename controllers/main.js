// check username, password in post(login) request
// if exist create new JWT
// send back to front-end
// if not exist send back error message
// setup authentication so only the request with JWT can access the dashboard

const jwt = require('jsonwebtoken');
const {BadRequestError} = require('../errors');

const login = async(req, res) => {
    const {username, password} = req.body;
    // mongoose validation
    // check in my controller

    if (!username || !password) {
        throw new BadRequestError ('Username or password is missing');
    }

    // demo, normally provided by DB
    const id = new Date().getDate();

    // try to keep payload small, better experience for user (bigger the payload => more data you send over the wire)
    // just for demo, in production use long, complex and unguessable string value!!!!!!!!!
    const token = jwt.sign(
        {
            id,
            username}
            ,process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )

    console.log(username,password);
    // res.send('Fake login/register/setup');
    res.status(200).json({
        msg: 'Login successful',
        token
    });
}

const dashboard = async(req, res) => {

    // console.log(req.user);

    const LuckyNumber = Math.round(Math.random() * 100);
        res.status(200).json({
            msg: `Welcome to the dashboard ${req.user.username}`,
            secret: `Here is your authorized data, your lucky is ${LuckyNumber}`
        })
}

module.exports = {
    login,
    dashboard
}