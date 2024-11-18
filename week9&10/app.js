const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const methodOverride = require('method-override')
const { router } = require('./routes')
const app = express()

require('dotenv').config()

require('./pgsqlconnect')

app.set('view engine','ejs')
app.set('views',path.resolve('./views'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

app.use(methodOverride('_method'))

const csrfprotection = csrf({cookie:true})
app.use(csrfprotection)

app.use((req,res,next)=>{
    res.locals.csrfToken = req.csrfToken()
    next()
})

app.use('/',router)

app.use((err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
      res.status(403).send('Invalid CSRF token');
    } else {
      next(err);
    }
  });
  

app.listen(3002,()=>{
    console.log("running !! 3002")
})