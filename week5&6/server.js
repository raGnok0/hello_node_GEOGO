const express = require('express')
const router = require('./routes');
const bodyParser = require('body-parser')
const app = express();
require('dotenv').config();
require('./postgreConnect')

app.use(bodyParser.json())
app.use('/',router)

app.listen(3000,()=>{
    console.log("server is running on 3000")
})