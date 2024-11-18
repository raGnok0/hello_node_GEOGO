const express = require('express')
const path = require('path')
const router = require('./routes');
const bodyParser = require('body-parser')
const app = express();
require('dotenv').config();
require('./postgreConnect')

app.set('view engine','ejs')
app.set("views",path.resolve('./views'))

app.use(bodyParser.json())
app.use('/',router);

app.get('/api',(req,res)=>{
    return res.render("app")
})

app.listen(3000,()=>{
    console.log("server is running on 3000")
})