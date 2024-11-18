const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { client } = require('../pgsqlconnect')
require('dotenv').config()

const secret_code = "okkkk"

const signup = async(req,res)=>{
    try{
        const {name,email,password} = req.body
        const user = await client.query('select * from user_accounts where email = $1',[email])
        if(user.rows.length == 1){
            return res.status(409).json({message:"User already exist",success: false})
        }
        const salt = bcrypt.genSaltSync(10);
        const pass_hash = await bcrypt.hashSync(password, salt);
        client.query('insert into user_accounts(username,email,password) values($1,$2,$3) RETURNING *',[name,email,pass_hash])
            .then(data=>{
                if(data.rowCount == 1){
                    res.render('success',{message:"Data Inserted"})
                }
            }).catch(err=> console.log('post err',err))
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Internal server error",success:false})
    }
}

const login = async(req,res)=>{
    try{
        const {email,password} = req.body
        const user = await client.query('SELECT * from user_accounts where email = $1',[email])
        if(user.rows.length == 0){
            return res.status(409).json({message:"User does not exist",success: false})
        }
        const user_data = user.rows[0]
        const hashed_data = user_data.password  
        const isMatch = bcrypt.compareSync(password,hashed_data);
        

        if(!isMatch){
            return res.status(403).json({message:"password does not match",success:false})
        }
        const jwtToken = jwt.sign({userId: user_data.id },secret_code,{expiresIn:'24h'})
        res.json({message:"login success",jwtToken})
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Internal server error",success:false})
    }
}

module.exports={
    signup,
    login,
    
}