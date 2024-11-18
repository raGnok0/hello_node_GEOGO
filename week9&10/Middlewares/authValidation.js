const Joi = require('joi')

const signUpValidation = async(req,res,next)=>{
    const Schema = Joi.object({
        _csrf:Joi.string(),
        name:Joi.string().required(),
        email:Joi.string().min(10).max(100).required(),
        password:Joi.string().min(4).required(),
    })
    const {error} = Schema.validate(req.body)
    if(error){
        return res.status(400).json({message:"Bad Request",error})
    }
    next()
}
const loginValidation = async(req,res,next)=>{
    const Schema = Joi.object({
        csrf: Joi.string(),
        email:Joi.string().min(10).required(),
        password:Joi.string().min(4).required()
    })
    const {error} = Schema.validate(req.body)

    if(error){
        return res.status(400).json({message:"Bad Request",error})
    }
    next();
}

module.exports= {
    signUpValidation,
    loginValidation
}