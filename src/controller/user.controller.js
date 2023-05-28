const route = require('express').Router()
const { getAllData, createUser } = require('../service/user.service')

route.get('/', async (req, res) => {
    try {
        const data = await getAllData();
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

route.post('/', async (req, res) => {
    try {
        const { birth, city, age, name, surname } = req.body
        const data = await createUser(birth, city, age, name, surname)
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = route