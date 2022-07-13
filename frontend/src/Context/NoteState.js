import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  
  const host = "http://localhost:5000"


  const [notes, setNotes] = useState(null);
  const [id,setId] = useState(null);
  const [user,setUser] = useState(null);

  //add a note
  const addNote = async (title, post) => {

    const hatedetect = await fetch('http://127.0.0.1:5000/',{
      method: 'POST',
      body: JSON.stringify({text:post}) 
    });

    const block = await hatedetect.json();
    const flag = block.result;

    const response = await fetch(`${host}/notes/addNote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, post, flag}) 
    });

    const note1 = await response.json();
    
    setNotes({array:notes.array.concat([note1])}); //concat returns new array
  };


  //GET ALL USERS

  const getUsers = async () => {
    
    const response = await fetch(`${host}/auth/allusers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();
    setUser(json);
    return json;
  }


  //GET all notes
  const getNote = async () => {
    const response = await fetch(`${host}/notes/getNote`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });

    const json = await response.json();
    var array = json.array;
    setNotes({array});
    setId(json.unique);
    return json;
  };




  //delete a note
  const deleteNote = async (id) => {

    const response = await fetch(`${host}/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
  

      const json = response.json();
      console.log(json);

    const newnotes = notes?notes.array.filter((each) => {
      return each._id !== id;
    }):null;
    console.log({array : newnotes})
    setNotes({array : newnotes});
  };
  //edit a note
  const editNote = async (id, post, like) => {

    const hatedetect = await fetch('http://127.0.0.1:5000/',{
      method: 'POST',
      body: JSON.stringify({text:post}) 
    });

    const block = await hatedetect.json();
    const flag = block.result;

    const response = await fetch(`${host}/notes/updateNote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({post:post,flag}) 
    });


    const json = await response.json();
    console.log(json);

    let newnotes = JSON.parse(JSON.stringify(notes.array));//because notes , a state var cant be used directly to edit

      for (let index = 0; index < newnotes.length; index++) {
        const element = newnotes[index];
        if(element._id===id){
          newnotes[index].postContent=post;
          newnotes[index].likesCount=like;
          break;
        }
      }
      setNotes({array:newnotes});
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote , id,getUsers,user}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
