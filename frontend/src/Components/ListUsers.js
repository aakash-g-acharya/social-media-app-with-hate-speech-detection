import React from 'react'

export default function ListUsers(props) {
  return (
    <div style={{display:"inline",marginLeft:"10px"}}>
        <a href="/" style={{display:"inline",fontSize:"20px",textDecoration:"none",color:"black"}}>{props.user}</a>
    </div>
  )
}
