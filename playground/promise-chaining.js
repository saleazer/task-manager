require('../src/db/mongoose')
const User = require('../src/models/user')


// 604e05141cc6243b8cf782d1

// User.findByIdAndUpdate("604e299e49eead21fc35a7ef", {age: 40}).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 10 })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('604e299e49eead21fc35a7ef', 2).then((count) =>{
    console.log(count)
}).catch((e) => {
    console.log(e)
})