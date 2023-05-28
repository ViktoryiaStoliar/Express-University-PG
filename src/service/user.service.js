const { getAllDataDB, createUserDB } = require('../repository/user.repository')

async function getAllData() {
    const data = await getAllDataDB()
    if (!data.length) throw new Error('data from DB is not found')
    return data
}

async function createUser(birth, city, age, name, surname) {
    const data = await createUserDB(birth, city, age, name, surname)
    if (!data.length) throw new Error('data is not created')
    return data
}

module.exports = { getAllData, createUser }