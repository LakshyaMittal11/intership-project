const { error } = require("console");
const db=require("../router/database-config");
const bcrypt=require("bcryptjs");
const signup=async(req,res)=>{
    const{name,email,password: Npassword}=req.body;
    if(!name||email||Npassword){
        return res.json({
            status:"error",
            error:"please enter your Name,Email,and password",
        });
    }else{
        db.query(
            "select email From user Where email=?",
            [email],
            async(err,result)=>{
                if(err) throw err;
                if(result.length>0){
                    return res.json({
                        status:"error",
                        error:"Email has already been register",

                    });
                } else
                {

                const password=await bcrypt.hash(Npassword,8);
                db.query(
                    "INSERT INTO users SET ?",
                    {email:email,password:password,name:name},
                    (error,result)=>{
                        if(error) throw error;
                        return res.json({
                            status:"success",
                            success:"user has been registered"
                        });
                    }
                );
                }
            }
        );
    }
};
module.exports=signup;
