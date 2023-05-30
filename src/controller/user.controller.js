const route = require('express').Router()
const { getAllData, getAllDataById, createUser, updateUser, deleteUsers } = require('../service/user.service')
const {isValidUserId, isValidBody} = require('../helper/validation')

route.get('/', async (req, res) => {
    try {
        const data = await getAllData();
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

route.get('/:id', isValidUserId, async (req, res) => {
    try {
        const { id } = req.params
        const data = await getAllDataById(id);
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

route.post('/', isValidBody, async (req, res) => {
    try {
        const { birth, city, age, name, surname } = req.body
        const data = await createUser(birth, city, age, name, surname)
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

route.put('/:id', isValidUserId, isValidBody, async (req, res) => {
    try {
        const { id } = req.params
        const { birth, city, age, name, surname } = req.body
        const data = await updateUser(id, birth, city, age, name, surname)
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

route.delete('/:id', isValidUserId, async (req, res) => {
    try {
        const { id } = req.params
        const data = await deleteUsers(id)
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = route