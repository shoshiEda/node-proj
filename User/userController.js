const express = require("express")
const router = express.Router()
const userService = require("./userService")
const log = require("../Logger/loggerSrevice")


// http://localhost:8000/auth/login
router.post("/login", async (req,res) => {

    const username = req.body.username
    const email = req.body.email
    if (!username || !email) return res.status(401).send({error: "username and password are required"})
    try{
        const data = await userService.login(username,email)
        log.info(`user:${data.userfullname} - successfully logged in`)
        res.cookie('loginToken',data.token)
        res.json({success: true, user:data.userfullname})
    }
    catch (err) {
        log.error(`There was an error to logged in:${err}`)
        res.status(500).send({ err: 'Failed to login' })
    }
})

router.post("/logout", async (req,res) => {
    try {
        res.clearCookie('loginToken')
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to logout' })
    }
})



module.exports = router





/*function getLoginToken(user) {
    const userInfo = { 
        _id : user._id, 
        username: user.username, 
        email: user.email, 
    }
    return cryptr.encrypt(JSON.stringify(userInfo))    
}

function validateToken(loginToken) {
    try {
        const json = cryptr.decrypt(loginToken)
        const loggedinUser = JSON.parse(json)
        return loggedinUser
    } catch(err) {
        console.log('Invalid login token')
    }
    return null
}

function decryptLoginToken(encryptedToken) {
    const decryptedUserInfo = cryptr.decrypt(encryptedToken);
    return JSON.parse(decryptedUserInfo);
}*/