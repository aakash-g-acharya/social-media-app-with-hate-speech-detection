import React,{useContext} from 'react'
import noteContext from '../Context/NoteContext';


export default function Post(props) {

  const {deleteNote} = useContext(noteContext);

  return (
  
    <div style={{marginBottom:"40px"}}>
    <div className="card m-3" style={{border:"None",backgroundColor:"#e1dbdb"}}>
            <div className="card-body" style={{backgroundColor: "white",boxShadow: "8px 8px 8px grey",borderRadius:"30px"}}>
                <p>{props.text.postContent}</p>
                <i className="fa fa-solid fa-comments ptr" style={{margin:"15px"}}>  Comments</i>
                <i className="fa fa-regular fa-pen ptr" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>props.change(props.text)} style={{margin:"15px"}}>  Edit</i>
                <i className=" fa fa-solid fa-trash ptr" onClick={()=>deleteNote(props.text._id)} style={{margin:"25px"}}>  Delete</i>
            </div>
          </div>
          
          
    </div>
  )
}


// <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//             <div className="modal-dialog">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title" id="exampleModalLabel">Edit Post</h5>
//                   <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                 </div>
//                 <div className="modal-body">
//                 <form>
//                 <div className="mb-3">
//                   <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
//                   <input type="text" className="form-control" onChange={update} name='etitle' value={ecredentials.etitle} id="exampleInputEmail1" aria-describedby="emailHelp"/>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="exampleInputPassword1" className="form-label">PostContent</label>
//                   <input type="text" className="form-control" onChange={update} name='epost' value={ecredentials.epost} id="exampleInputPassword1"/>
//                 </div>
                
//               </form>
//                 </div>
//                 <div className="modal-footer">
//                   <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                   <button type="button" onClick={editPost} className="btn btn-primary">Save changes</button>
//                 </div>
//               </div>
//             </div>
//           </div>


/*

const [ecredentials,seteCredentials] = useState({
    etitle:props.text.title,
    epost:props.text.postContent
  })

  const update = (event)=>{
    seteCredentials({...ecredentials,[event.target.name]:event.target.value})
  }

  const editPost = ()=>{

    if(ecredentials.etitle!==""&&ecredentials.epost!=="")
    {
      editNote(props.text._id,ecredentials.epost);
      seteCredentials({
        etitle:"",
        epost:""
      })
    }
    else{
      alert("Fill the post");
    }
}

*/