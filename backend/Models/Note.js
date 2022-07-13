const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema({
  ID: {
    type:String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  postContent:{
    type: String,
    required: true,
  },
  comments: {
    type: Array,
  },
  likesCount: {
    type: Number,
    default: 0,
  },
  flag:{
      type:Boolean,
      default:0
  }
  
  
});


const Note = mongoose.model("note", noteSchema);
module.exports = Note;
