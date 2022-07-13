import React from 'react'

export default function Show(props) {

    const click = ()=>{
        props.fun();
    }

  return (
    <div>
        <p>This post has hate speech.Want to see it?</p>
        <button onClick={click} type="button" class="btn btn-primary">click</button>
    </div>
  )
}
