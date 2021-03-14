// Mongoose connection to DB, scripts that need to run  
require('../src/db/mongoose')
// Mongoose task model needed to complete the methods on the DB
const Task = require('../src/models/task')


// Task.findByIdAndDelete("604e2e55d73a0103f0f96de5").then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })  // Use return before the 2nd promise 
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })


const deleteAndCount = async (id) => {
    const deleted = await Task.findByIdAndDelete(id)
    const newCount = await Task.countDocuments({ completed: false})
    return newCount
}

deleteAndCount("604e2f0cd73a0103f0f96de6").then((newCount) => {
    console.log(newCount)
}).catch((e) => {
    console.log(e)
})




// User.findByIdAndUpdate("604e299e49eead21fc35a7ef", {age: 40}).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 10 })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })
