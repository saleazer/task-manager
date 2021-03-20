const express = require('express')
const router = new express.Router()
const Task = require('../models/task')

// POST to add new task
router.post("/tasks", async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// GET to return all tasks
router.get("/tasks", async (req, res) => {
    try {
        const allTasks = await Task.find({})
        return res.status(200).send(allTasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

// GET to return single task by id
router.get("/tasks/:id", async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        return res.status(201).send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})


// PATCH to update single task information
router.patch("/tasks/:id", async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: "Invalid updates!"})
    }
    try {
        const updatedTask = await Task.findById(req.params.id)
        updates.forEach((update) => updatedTask[update] = req.body[update])
        await updatedTask.save()

        if (!updatedTask) {
            return res.status(404).send()
        }
        res.send(updatedTask)
    } catch (e) {
        res.status(400).send(e)
    }
    
})

// DELETE tasks by id
router.delete("/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router