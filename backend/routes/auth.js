const express = require("express");
const router = express.Router();
const User = require('../Models/User')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


//get various users
router.get('/allusers',async (req,res)=>{
    try {
        
        var all = await User.find({});
        res.send(all);


    } catch (error) {
        res.send(error);
    }
})

//create account route
router.post(
    '/newuser',
    async (req,res)=>{
        try {
            let user = await User.findOne({username:req.body.username});
            if(user){
               return res.send({token:null,status:1,name:null,users:[]}); 
            }

            const salt = await bcrypt.genSalt(10); //use await because promise returned
            const hash = await bcrypt.hash(req.body.password, salt);

            const new_user = await User.create({
                username:req.body.username,
                name:req.body.name,
                password:hash
            })

            var auth = {
                user:{
                    unique:new_user.username
                }
            }
            var token = jwt.sign({ auth }, 'secret');

            var array = []

            array = await User.find({});

 
             var array1 = array.filter((ele)=>{
                 return ele.username!==new_user.username;
             })


            res.send({token,status:2,name:new_user.name,users:array1});
            
        } catch (error) {
            res.send(error);
        }
    }
)

//login route
router.post(
    '/login',
    async (req,res)=>{
        try {
            let user = await User.findOne({username:req.body.username})
            if(!user){
                return res.send({msg:false,token:null,name:null,users:[]});
            }
            
            const comparePass = await bcrypt.compare(req.body.password, user.password);
        
            if(!comparePass){
                return res.send({msg:false,token:null,name:null,users:[]});
            }

            var auth = {
                user:{
                    unique:user.username
                }
            }
            var array = []

           array = await User.find({});

            var array1 = array.filter((ele)=>{
                return ele.username!==user.username;
            })
            var token = jwt.sign( {auth} , 'secret');
            console.log(array1);
            res.send({msg:true,token:token,name:user.name,users:array1});
            
        } catch (error) {
            res.send(error);
        }
    }
)

//middleware
const valid = (req,res,next)=>{

    const token = req.header("auth-token"); 
    if(!token){
        res.send("Validate token properly")
    }
    try {
       
        var decoded = jwt.verify(token, 'secret');
        req.unique=decoded.auth.user.unique; 
        //console.log(decoded)=={ auth: { user: { unique: '1' } }, iat: 1644923261 }
        next();

    } catch (error) {
        res.send(error);
    }
}
//route to authenticate user while posting
router.post('/post',valid,async (req,res)=>{
        try {
            const user = await User.findOne({username:req.unique});
            res.send({user,success:1});
        } catch (error) {
            res.send(error);
        }
    }
)

module.exports = router;
