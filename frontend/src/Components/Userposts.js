import React, { useState } from 'react'
import Show from './Show';

export default function Userposts(props) {
  
  const [show,setShow] = useState(props.text.flag);

  const set = ()=>{
      setShow(false);
  }
  return (
    <div style={{marginBottom:"40px"}}>
    <div className="card m-3" style={{border:"None",backgroundColor:"#e1dbdb"}}>
            <div className="card-body" style={{backgroundColor: "white",boxShadow: "8px 8px 8px grey",borderRadius:"30px"}}>
                <p>{ show ?<Show fun={set}/>:props.text.postContent}</p>
                <i className="fa fa-solid fa-thumbs-up ptr" style={{margin:"15px"}}>  Like</i>
                <i className="fa fa-solid fa-comments ptr" style={{margin:"15px"}}>  Comments</i>
                <i className="fa fa-solid fa-flag ptr" style={{margin:"15px"}}>  Flag</i>
            </div>
          </div>
    </div>
  )
}

