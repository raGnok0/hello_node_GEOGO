const {Client} = require('pg')

const client = new Client({
    user:"postgres",
    password:"1234",
    host:"localhost",
    database:"geogoassignment",
    port:"5432"
})


client.connect().then(()=>console.log("connected to database")).catch(err=> console.log("db connect err",err))

module.exports = {
    client
}
