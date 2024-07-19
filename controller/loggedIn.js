const db = require("../router/database-config")
const jwt= require("jsonwebtoken");
const loggedIn = (req,res,next)=>{
    if(!req.cookies.user) return next();
    try {
        const decode = jwt.verify(
            req.cookies.user,
            process.env.JWT_SECRET
        )
        db.query('SELECT * FROM users WHERE id =?',[decode.id],(err,result)=>{
            if(err) return next();
            req.user = result[0];
            return next();
        })
    } catch (error) {
        if(error) return next()
    }
}
module.exports=loggedIn;