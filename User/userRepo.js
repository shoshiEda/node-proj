const axios = require("axios")

const url = "https://jsonplaceholder.typicode.com/users"

const getAllUsers = async () => {
    const resp = await axios.get(url)
    const allUsers = resp.data
    return allUsers.map(user=>({username:user.username,email:user.email,fullname:user.name}))
}
getAllUsers()

module.exports = {getAllUsers}