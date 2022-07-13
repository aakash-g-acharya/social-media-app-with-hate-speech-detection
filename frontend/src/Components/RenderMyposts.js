import React from 'react'
import Post from './Post'

export default function RenderMyposts(props) {
  return (
    <div>
    {props && props.posts.map((post,index)=>{
        return (
          <Post key={index} text={post} change={props.change}/>
        )
      }) }
    </div>
  )
}
