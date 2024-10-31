const {Client} = require('pg');
require('dotenv').config();

const client = new Client({
    user:process.env.USER,
    host:process.env.HOST,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    port:process.env.PORT
});

client.connect().then(()=>console.log("connected to database")).catch(err=>console.log(err.stack))

module.exports={
    client
}