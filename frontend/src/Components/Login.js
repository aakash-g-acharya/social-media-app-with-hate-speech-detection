import React,{useState} from 'react'

export default function Login(props) {

  const url = 'http://localhost:5000/auth/login'

  const [credentials,setCredentials] = useState({
    username:"",
    password:""
  })

 
  const onchange = (event)=>{

      setCredentials({...credentials,[event.target.name]:event.target.value});
  }

  const submit = async (event)=>{
    
      event.preventDefault();
      
     
        const response = await fetch(url, {
        method: 'POST', 
        headers: {
        'Content-Type': 'application/json',
      },
        body:JSON.stringify({username:credentials.username,password:credentials.password})
      });


      const data =  await response.json()
      if(data.msg)
      {
        localStorage.setItem("token",data.token);
        localStorage.setItem("users",data.users);
        
        props.login(true,data.name,data.users);
      }
      else {
        alert("Check credentials")
        props.login(false,"",null);
      }
      
  }


      return (
    <div   >
      <form className="row g-3" onSubmit={submit}>
      <div className="col-md-6">
        <label htmlFor="inputUsername1" className="form-label">Username</label>
        <input type="text" name='username' value={credentials.username} onChange={onchange} className="form-control" id="inputUsername1"/>
      </div>
      <div className="col-md-6">
        <label htmlFor="inputPassword3" className="form-label">Password</label>
        <input type="password" name='password' value={credentials.password} onChange={onchange} className="form-control" id="inputPassword3"/>
      </div>
        <div className="col-12">
        <button type="submit" className="btn btn-primary">Sign in</button>
      </div>
    </form>
    </div>
    
)}
