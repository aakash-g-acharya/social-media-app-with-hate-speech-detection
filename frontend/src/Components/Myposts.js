import React,{useContext,useEffect,useState} from 'react'
import ListUsers from './ListUsers';
import noteContext from '../Context/NoteContext';
import RenderMyposts from './RenderMyposts'


export default function Myposts(props) {

  const context = useContext(noteContext);
  const { notes,getNote,editNote,id,getUsers,user} = context;

  const result5 = user ? user.filter(element =>  element.username!==localStorage.getItem("user")) : null;


  const [ecredentials,seteCredentials] = useState({
    etitle:"",
    epost:"",
    e_id:""
  })

  const update = (event)=>{
    seteCredentials({...ecredentials,[event.target.name]:event.target.value})
  }

  const change = (post)=>{

    seteCredentials({etitle:post.title,epost:post.postContent,e_id:post._id})      
  }

  const editPost = (event)=>{

    if(ecredentials.etitle!==""&&ecredentials.epost!=="")
    {
      event.preventDefault();//to avoid reloading
      editNote(ecredentials.e_id,ecredentials.epost);
      seteCredentials({
        etitle:"",
        epost:""
      })
    }
    else{
      alert("Fill the post");
    }
}


   useEffect(  () => {
    getNote();
    getUsers();
    //eslint-disable-next-line
  },[])
  
  
  var result4 = notes ? notes.array.filter(element =>  element.ID===id) : null;  



  return (
    <div>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Edit Post</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                  <input type="text" className="form-control" onChange={update} name='etitle' value={ecredentials.etitle} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">PostContent</label>
                  <input type="text" className="form-control" onChange={update} name='epost' value={ecredentials.epost} id="exampleInputPassword1"/>
                </div>
                
              </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" onClick={editPost} data-bs-dismiss="modal" className="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
    <div className='row m-2' style={{backgroundColor:"#e1dbdb"}}>
    <div className='col-3' style={{borderRadius:"5px", backgroundColor:"white",height:"505px"}} >
    <h3 style={{marginBottom:"20px"}}>Connect with others</h3>
    {
      result5 && result5.map((user,index)=>{
        return(
          <div key={index} style={{marginBottom:"10px",marginLeft:"20px"}}>
          <i className="fa fa-solid fa-user"></i>
          <ListUsers key={index} user={user.name}></ListUsers>
          </div>
        )
      })
    }
    </div>
    <div className='container col-6'>
    {
      result4 && <RenderMyposts posts={result4} change={change}/>
    }
    </div>
    <div className='col-3' style={{borderRadius:"5px", backgroundColor:"white",height:"800px"}}>

    <h2 style={{marginLeft:"85px"}}>BLOGS</h2>
    <div className="card" style={{width: "18rem",marginTop:"30px"}}>
    <img style={{height: "130px"}} src="https://blog.hyperiondev.com/wp-content/uploads/2019/02/Blog-Types-of-Web-Dev.jpg" className="card-img-top" alt="..."/>
    <div className="card-body">
      <h5 className="card-title">Webdev</h5>
      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="/" className="btn btn-primary">Go somewhere</a>
    </div>
    </div>

    <div className="card" style={{width: "18rem",marginTop:"30px"}}>
    <img style={{height: "130px"}} src="https://image.shutterstock.com/image-photo/modern-desktop-computer-wireless-keyboard-260nw-55573504.jpg" className="card-img-top" alt="..."/>
    <div className="card-body">
      <h5 className="card-title">Computer</h5>
      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="/" className="btn btn-primary">Go somewhere</a>
    </div>
    </div>

    </div>
    </div>
    </div>
  )
}
