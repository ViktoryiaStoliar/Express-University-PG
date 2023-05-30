const { getAllDataDB, getDataByIdDB, createUserDB, updateUserDB, deleteUsersDB } = require('../repository/user.repository')
const ExceptionType = require('../exception/exception')

async function getAllData() {
    const data = await getAllDataDB()
    if (!data.length) throw new Error(ExceptionType.DB_USER_GET)
    return data
}

async function getAllDataById(id) {
    const data = await getDataByIdDB(id)
    if (!data.length) throw new Error(ExceptionType.DB_USER_GET_BY_ID)
    return data
}

async function createUser(birth, city, age, name, surname) {
    const data = await createUserDB(birth, city, age, name, surname)
    return data
}

async function updateUser(id, birth, city, age, name, surname) {
    const data = await updateUserDB(id, birth, city, age, name, surname)
    return data
}

async function deleteUsers(id) {
    const data = await deleteUsersDB(id)
    return data
}


module.exports = { getAllData, getAllDataById, createUser, updateUser, deleteUsers}