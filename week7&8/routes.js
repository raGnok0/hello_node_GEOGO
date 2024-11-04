const express = require('express')
const { client } = require('./pgsqlconnect')
const router = express.Router()

//get routes
router.get('/todos',(req,res)=>{
    client.query(`SELECT * from todolist;`).then(data=>{
        const dataArray = data.rows
        res.render('index',{rows:dataArray})
    })
})
router.get('/todos/:id',async(req,res)=>{
    client.query(`SELECT * from todolist where id = ${req.params.id};`).then(data=>{
        res.render('index',{rows: data.rows})
    })
})

router.post('/todos',(req,res)=>{
    console.log(req.body)
    const {title,description,status,duedate} = req.body;
    client.query(`
        INSERT INTO todolist(title,description,status,duedate) values('${title}','${description}','${status}','${duedate}')`)
        .then(data=>{
            if(data.rowCount == 1){
                res.render('success',{message:"Data Inserted"})
            }
        }).catch(err=> console.log('post err',err))
})

router.put('/todos/:id',(req,res)=>{
    client.query(`UPDATE todolist set title='${req.body.title}', description='${req.body.description}', status='${req.body.status}', duedate='${req.body.duedate}' WHERE id=${req.params.id}`)
    .then((data)=>{
        if(data.rowCount == 1){
            res.send("CHANGED")
        }else{
            res.send(500)
        }
    }).catch(err => console.log("PUT ERROR ROUTES",err))
})

router.delete('/todos/:id',(req,res)=>{
    client.query(`DELETE from todolist WHERE id = ${req.params.id}`).then((data)=>{
        if(data.rowCount == 1){
            res.send("DELETED")
        }else{
            res.send(500)
        }
    }).catch(err=>console.log("DELETE ERR",err))
})

module.exports = {
    router
}