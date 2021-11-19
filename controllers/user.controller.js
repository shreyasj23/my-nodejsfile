const userModel = require("../model/user");
const userEducationModel = require("../model/user_education");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");

module.exports.login = async(req,res) =>{
    let {email,password} = req.body;
    try {
        let userData = await userModel.findOne({"email":email});
        if(userData){
            bcrypt.compare(password,userData.password,function(err, response) {
                if(err){
                    res.status(200).send({message:"Invalid password !!!"});
                    return;
                }else{
                    let token = jwt.sign({'_id':userData._id},process.env.SECRETKEY,{expiresIn:'120s'});
                    if(token){
                        res.status(200).send({token:token});
                        return;                
                    }else{
                        res.status(200).send({message:"Error in token genration !!"});
                        return;    
                    }
                }
            });
        }else{
            res.status(200).send({message:"Email id not present in database"});
            return;
        }    
    } catch (error) {
        res.status(500).send({error:error.message,message:"Internal server error"});
        return;
    }        
}

module.exports.register = async(req,res) =>{
    let {name,password,email,phone} = req.body
    try {
        let userData = new userModel({name,password,email,phone});
        let savedUserData = await userData.save();
        if(savedUserData){
            let userEducation = new userEducationModel(req.body);
            let saveEducationData = await userEducation.save();
            if(saveEducationData){
                let token = jwt.sign({'_id':userData._id},process.env.SECRETKEY);
                if(token){
                    res.status(200).send({token:token,message:"User data saved successfully !!"});
                    return;                
                }else{
                    res.status(200).send({token:token,message:"Error in token genration !!"});
                    return;    
                }
            }else{
                res.status(200).send({token:"",message:"Error in saving user data in user_education !!"});
                return;     
            }
        }else{
            res.status(200).send({token:"",message:"Error in saving user data in user collection !!"});
            return;    
        }    
    } catch (error) {
        res.status(500).send({error:error.message,message:"Internal server error",token:""});
        return;
    }
}

module.exports.userProfile = async(req,res) =>{
    let {token} = req.body;

}