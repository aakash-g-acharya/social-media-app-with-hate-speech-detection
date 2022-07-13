import React from 'react'
import Userposts from './Userposts'

export default function Renderposts(props) {
  return (
    <div>
    {props && props.posts.map((post,index)=>{
          return (
            <Userposts key={index} text={post}/>
          )
        }) }
    </div>
  )
}

