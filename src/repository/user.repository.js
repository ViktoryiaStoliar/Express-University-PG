const { pool } = require('../db')
const ExceptionType = require('../exception/exception')

async function getAllDataDB() {
    const client = await pool.connect()
    const sql = `select * 
    from users
    join users_info on users.info_id = users_info.id`
    const data = (await client.query(sql)).rows
    return data
}

async function getDataByIdDB(id) {
    const client = await pool.connect()
    const sql = `select * 
    from users
    join users_info on users.info_id = users_info.id
    where users_info.id = $1`
    const data = (await client.query(sql, [id])).rows
    return data
}

async function createUserDB(birth, city, age, name, surname) {
    const client = await pool.connect()

    const sql1 = 'insert into users_info (birth, city, age) values ($1, $2, $3) returning *'
    const data1 = ((await client.query(sql1, [birth, city, age])).rows)

    if (!data1.length) throw new Error(ExceptionType.DB_USER_CREATE)

    const sql2 = 'insert into users (name, surname, info_id) values ($1, $2, $3) returning *'
    const data2 = ((await client.query(sql2, [name, surname, data1[0].id])).rows)

    return [{ ...data1[0], ...data2[0] }]
}
async function updateUserDB(id, birth, city, age, name, surname) {
    const client = await pool.connect()

    const sql1 = 'update users_info set birth = $1, city = $2, age = $3 where users_info.id = $4 returning *'
    const data1 = (await client.query(sql1, [birth, city, age, id])).rows

    if (!data1.length) throw new Error(ExceptionType.DB_USER_GET_BY_ID)

    const sql2 = 'update users set name = $1, surname = $2 where info_id = $3  returning *'
    const data2 = (await client.query(sql2, [name, surname, id])).rows

    return [{ ...data1[0], ...data2[0] }]
}

async function deleteUsersDB(id) {
    const client = await pool.connect()

    const sql1 = 'delete from users where info_id = $1 returning *'
    const data1 = (await client.query(sql1, [id])).rows

    if (!data1.length) throw new Error (ExceptionType.DB_USER_GET_BY_ID)

    const sql2 = 'delete from users_info where id = $1 returning *'
    const data2 = (await client.query(sql2, [id])).rows

    return [{...data1[0], ...data2[0]}]
} 



module.exports = { getAllDataDB, getDataByIdDB, createUserDB, updateUserDB, deleteUsersDB }