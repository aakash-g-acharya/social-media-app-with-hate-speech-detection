import React,{useState} from 'react'

export default function Signup(props) {



  const url = 'http://localhost:5000/auth/newuser'

  const [ncredentials,setnCredentials] = useState({
    username:"",
    password:"",
    cpassword:"",
    name:""
  })

 
  const onchange = (event)=>{

      setnCredentials({...ncredentials,[event.target.name]:event.target.value});
  }

  const submit = async (event)=>{
    
      event.preventDefault();
      
      if(ncredentials.password===ncredentials.cpassword){

        const response = await fetch(url, {
          method: 'POST', 
          headers: {
          'Content-Type': 'application/json',
        },
          body:JSON.stringify({username:ncredentials.username,password:ncredentials.password,name:ncredentials.name})
        });
  
  
        const data =  await response.json()
        if(data.status===2)
        {
          localStorage.setItem("token",data.token);
          props.login(true,data.name,data.users);
        }
        else {
          alert("Username already exists")
          props.login(false,"",[]);
        }
      }
      else{
        alert("Passwords dont match");
      }
    }

  return (
    <div>

<form className="row g-3" onSubmit={submit}>
  <div className="col-md-6">
    <label htmlFor="inputName" className="form-label">Name</label>
    <input type="text" value={ncredentials.name} onChange={onchange} name='name' className="form-control" id="inputName"/>
  </div>
  <div className="col-md-6">
    <label htmlFor="inputUsername" className="form-label">Username</label>
    <input type="text" value={ncredentials.username} onChange={onchange} name="username" className="form-control" id="inputUsername"/>
  </div>
  <div className="col-md-6">
    <label htmlFor="inputPassword1" className="form-label">Password</label>
    <input type="password" value={ncredentials.password} onChange={onchange} name="password" className="form-control" id="inputPassword1"/>
  </div>
  <div className="col-md-6">
    <label htmlFor="inputPassword2" className="form-label">Confirm Password</label>
    <input type="password" value={ncredentials.cpassword} onChange={onchange} name="cpassword" className="form-control" id="inputPassword2"/>
  </div>
  
  <div className="col-12">
    <div className="form-check">
      <input className="form-check-input" type="checkbox" id="gridCheck"/>
      <label className="form-check-label" htmlFor="gridCheck">
        Check me out
      </label>
    </div>
  </div>
  <div className="col-12">
    <button type="submit" className="btn btn-primary">Sign Up</button>
  </div>
</form>

    </div>
  )
}
