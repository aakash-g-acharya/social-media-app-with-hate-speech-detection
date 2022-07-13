import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import noteContext from '../Context/NoteContext';


export default function Navbar(props) {

  const {addNote} = useContext(noteContext)

  const [newPost,setNewPost] = useState({
      title:"",
      post:""
  })

  const update = (event)=>{
    setNewPost({...newPost,[event.target.name]:event.target.value})
  }

    const addPost = ()=>{

        if(newPost.title!==""&&newPost.post!=="")
        {
          addNote(newPost.title,newPost.post);
          setNewPost({
            title:"",
            post:""
          })
        }
        else{
          alert("Fill the post");
        }
    }
    

    const location = useLocation();

    const click = ()=>{
      props.login(false,"",null);
      localStorage.setItem("token",null);
      localStorage.setItem("users",null);
      localStorage.setItem("user",null);
    }

  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-primary" style={{fontWeight:"bold"}}>
    <div className="container-fluid">
      <Link className="navbar-brand" to="/" style={{color:"white"}}>Welcome {localStorage.getItem("name")}</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/"?"active":""}`} style={{color:"white"}} aria-current="page" to="/">Home</Link>
          </li>
           <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/Myposts"?"active":""}`} style={{color:"white"}} to="/Myposts">Your Posts</Link>
          </li>
          {location.pathname==="/Myposts" && <button type="button" style={{marginLeft:"15px"}} className="btn btn-danger ml-3 nav-item" data-bs-toggle="modal" data-bs-target="#postModal">
              Add post
          </button>}
        </ul>
        <form className="d-flex" >
          <input style={{width:"300px"}} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button style={{marginRight:"320px"}} className="btn btn-success " type="submit">Search</button>
        </form>


        <div className="btn-group dropstart">
          <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              {localStorage.getItem("name")}
          </button>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to='/'>Profile</Link></li>
          <li><Link className="dropdown-item" onClick={click} to='/'>Logout</Link></li>
          </ul>
          </div>
      </div>
    </div>
  </nav>



<div className="modal fade" id="postModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="postModal">Post</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="mb-3">
      <label htmlFor="exampleFormControlInput1"  className="form-label">Title</label>
      <input type="text" className="form-control" name="title" onChange={update} value={newPost.title} id="exampleFormControlInput1"/>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleFormControlTextarea1"  className="form-label">Textarea</label>
      <textarea className="form-control" name="post" onChange={update} value={newPost.post} id="exampleFormControlTextarea1" rows="3"></textarea>
    </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={addPost} data-bs-dismiss="modal" >Add</button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}
