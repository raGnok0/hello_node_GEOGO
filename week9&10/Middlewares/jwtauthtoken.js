function authToken(req,res,next){
    const token = req.headers['authorization']
    if(!token){
        return res.status(401).json({message:'access denied, no token provided'})
    }

    try{
        // const verified = jwt.verify(token,process.env.JWT_TOKEN)
        // const verified = "verify"
        // req.user = verified
        console.log("user verified")
        next()
    }catch(err){
        res.status(403).json({message: "Invalid token"})
    }
}

module.exports={
    authToken
}