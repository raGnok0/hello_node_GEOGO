const express = require('express')
const { client } = require('./postgreConnect')
const { showTable, insertTable } = require('./query')
const router = express.Router()

//get routers
router.get('/todos',(req,res)=>{
    client.query(showTable).then(data=>{
        res.send(data.rows)
    }).catch(err=>console.log('routes err',err))
})
router.get('/todos/:id',(req,res)=>{
    client.query(`SELECT * FROM todolist WHERE id=${req.params.id}`).then(data=>{
        res.send(data.rows)
    }).catch(err => console.log('router id err',err))
})

//post routes
router.post('/todos',(req,res)=>{
    const {title,description,status,duedate} = req.body;
    client.query(`
        INSERT INTO todolist(title,description,status,duedate) values('${title}','${description}','${status}','${duedate}')`).then(data => {
        res.send(data)
    }).catch(err => console.log("routes post error",err))
})

//put route
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

//delete route
router.delete('/todos/:id',(req,res)=>{
    client.query(`DELETE from todolist WHERE id = ${req.params.id}`).then((data)=>{
        if(data.rowCount == 1){
            res.send("DELETED")
        }else{
            res.send(500)
        }
    }).catch(err=>console.log("DELETE ERR",err))
})

module.exports = router