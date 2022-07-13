const express = require("express");
const router = express.Router();
const Note = require('../Models/Note')
var jwt = require('jsonwebtoken');




//create new note route
router.post(
    '/addNote',
    async (req,res)=>{
        try {

            const token = req.header("auth-token"); 
        
            var decoded = jwt.verify(token, 'secret');
            var unique=decoded.auth.user.unique;

            const new_note = await new Note({
                ID:unique,
                title:req.body.title,
                postContent:req.body.post,
                comments:[],
                likesCount:0,
                flag:req.body.flag
            })

            const saved = await new_note.save();

            
            res.send(saved);

            
        } catch (error) {
            res.send(error);
        }
    }
)

//retrieve posts
router.get(
    '/getNote',
    async (req,res)=>{
        try {

            const token = req.header("auth-token"); 

            var decoded = jwt.verify(token, 'secret');
            var unique=decoded.auth.user.unique;
            var array=[];

            array = await Note.find({});

            res.send({array,unique});

            
        } catch (error) {
            res.send(error);
        }
    }
)


//delete posts
router.delete("/deletenote/:id", async (req, res) => {
    try {
      //find note by id in url to be deleted
      let note = await Note.findById(req.params.id);
  
      if (!note) {
        return res.status(404).send("not found"); 
      }
  
      //update note based on id
      note = await Note.findByIdAndDelete(req.params.id);
  
      res.json({ sucess: "note deleted", note: note });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "internal error" }); 
    }
  });


//update posts
router.put(
    '/updateNote/:id',
    async (req,res)=>{
        try {


            let note = await Note.findById(req.params.id);

            if (!note) {
                return res.status(404).send("not found"); //if note doesnt exist
            }

            
                const newPost = req.body.post
                const flag = req.body.flag
                note = await Note.findByIdAndUpdate(
                    req.params.id,
                    {postContent:newPost,flag:flag},
                    {new: true}
                    );
    
            
            console.log(req.params.id)
            res.json(note);

            
        } catch (error) {
            res.send(error);
        }
    }
)


module.exports = router;
