// const mysql = require('mysql2')

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-complete',
//     password: 'Nhattri@123'
// })

// module.exports = pool.promise()

// const Sequelize = require('sequelize')

// const sequelize = new Sequelize('node-complete', 'root', 'Nhattri@123', {dialect: 'mysql', host: 'localhost'})

// module.exports = sequelize

const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

let _db

const mongoConnect = cb => {
    MongoClient.connect('mongodb+srv://chip:chip123@cluster0.oafqocm.mongodb.net/shop?retryWrites=true&w=majority')
    .then(client => {
        console.log('connected')
        _db = client.db()
    })
    .catch(err => {
        console.log(err)
        throw err
        
    })
}

const getDb = () => {
    if(_db) {
        return _db
    }

    throw 'No database found!'
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb