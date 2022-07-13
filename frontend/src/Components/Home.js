import React,{useContext,useEffect} from 'react';
import ListUsers from './ListUsers';
import noteContext from '../Context/NoteContext';
import Renderposts from './Renderposts';


export default function Home(props) {

  const context = useContext(noteContext);
  const { notes,getNote,id,getUsers,user} = context;
   useEffect(  () => {
    getNote();
    getUsers();
    //eslint-disable-next-line
  },[])
  
  
    var result4 = notes ? notes.array.filter(element =>  element.ID!==id) : null;
    var result5 = user ? user.filter(element =>  element.username!==localStorage.getItem("user")) : null;
    result4 = result4? result4.reverse():null;

  return (
    <div className='row m-2' style={{backgroundColor:"#e1dbdb"}}>
    <div className='col-3' style={{borderRadius:"5px", backgroundColor:"white",height:"505px"}} >
    <h3 style={{marginBottom:"20px"}}>Connect with others</h3>
    { result5 && result5.map((user,index)=>{
      return(
        <div key={index} style={{marginBottom:"10px",marginLeft:"20px"}}>
        <i class="fa fa-solid fa-user"></i>
        <ListUsers key={index} user={user.name}></ListUsers>
        </div>
      )
    })}
    </div>
    <div className='container col-6'>
    {
        
          result4 && <Renderposts posts={result4}/>
          
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
  )
}

