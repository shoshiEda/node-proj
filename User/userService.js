const userRepo = require("./userRepo")
const jwt = require("jsonwebtoken")
const User = require("./userModel.js")

const secret =process.env.SECRET1 || 'Secret'

const login = async (username, email) =>{

    const users = await userRepo.getAllUsers()
    const user = users.find(user=>user.username===username && user.email===email)
    if (!user) throw new Error('Invalid username or email')
    const selectedUser =  await User.findOne({fullname:user.fullname})
    const now = new Date();
    const todayDate = now.toISOString().split('T')[0]; 
    
    if (!selectedUser.lastLogin) {
        selectedUser.lastLogin = now;
        await selectedUser.save();
    } else {
        const lastLoginDate = selectedUser.lastLogin.toISOString().split('T')[0];
        
        if (lastLoginDate !== todayDate) {
            selectedUser.numOfActions = 10;
            selectedUser.lastLogin = now;
            await selectedUser.save();
        }
    }
    const token =  jwt.sign({fullname:user.fullname,actionsPerDay:selectedUser.numOfActions}, secret)
    return { token: token,userfullname:user.fullname}
}

//login("Bret","Sincere@april.biz")

module.exports = {login}


