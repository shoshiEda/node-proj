const jwt = require('jsonwebtoken');
const secret =process.env.SECRET1 || 'Secret'

const requireAuth = async(req, res, next)=> {
    if (!req?.cookies?.loginToken) {
        return res.status(401).send('Not Authenticated')
    }
    
    const loggedinUser = validateToken(req.cookies.loginToken)
    if (!loggedinUser) return res.status(401).send('Not Authenticated')
    if(!loggedinUser.actionsPerDay) return res.status(400).send('You entered the maximum times you could per day')
    loggedinUser.actionsPerDay--
    console.log(loggedinUser)
    req.loggedinUser = loggedinUser
    next()
}

const validateToken = async (token) => {
    try {
        const decoded = await jwt.verify(token, secret);
        return decoded;
    } catch (err) {
        throw new Error('Invalid token');
    }
}


module.exports = {requireAuth}







