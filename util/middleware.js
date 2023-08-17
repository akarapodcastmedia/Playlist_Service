// import jsonwebtoken
const jwt = require("jsonwebtoken");
const middlewarer = async (req,res,next)=>{
    const token = req.header("Authorization");
    if(token){
        const real_token = token.split(" ")[1];
        jwt.verify(real_token,process.env.PROGRAM_TOKEN_SECRET,(error,data)=>{
            if(error){
                return res.json({
                    error : true,
                    message : error.message
                })
            }else{
                if(data.user == "signed" && data.email !=null){
                    req.email = data.email;
                    next();
                }else{
                    return res.json({
                        error : true,
                        message : "token is lack of authorized credential"
                    })
                }
            }
        })
    }else{
        return res.json({
            error : true,
            message : "require token"
        })
    }
}

module.exports = {
    middlewarer
}