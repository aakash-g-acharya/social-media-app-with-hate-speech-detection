import React,{useState} from "react";
import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Home from './Components/Home'
import NoteState from "./Context/NoteState";
import Myposts from "./Components/Myposts";
import {
  BrowserRouter as Router,
  Route,Routes
} from "react-router-dom";

function App() {


 
  const [login,setLogin] = useState(false);
  const [userList,setUserList] = useState(null);

  const host = "http://localhost:5000"


  const loginHandle = (lstate,names,array)=>{

      if(lstate===false){
        localStorage.setItem("token",null);
      }
      setLogin(lstate);
      localStorage.setItem("name",names)
      setUserList(array);
  }

  var isLogin = localStorage.getItem("token");

  const getNote = async () => {
    const response = await fetch(`${host}/auth/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': isLogin
      },
    });

    const json = await response.json();
    if(json.success===1){
      setLogin(true);
      localStorage.setItem("user",json.user.username);
    }
    else setLogin(false);
  };

  getNote();
  

  
    return !login?(
      <div className="container ">
      <div className="row g-2 ">
        <div className="col-6 " style={{marginTop:"100px"}}>
          <div className="p-3 border bg-light"><Signup login={loginHandle}/></div>
        </div>
        <div className="col-6 " style={{marginTop:"100px"}}>
          <div className="p-3 border bg-light" style={{height:"286px"}}><Login login={loginHandle}/></div>
        </div>
      </div>
    </div>
    ):
   (
      <div>
      <NoteState>
      <Router>
      <Navbar login={loginHandle} />
      <Routes>
        <Route path="/" element={<Home userArray={userList} />}></Route>
        <Route path="/Myposts" element={<Myposts userArray={userList} />}></Route>
      </Routes>
      </Router>
      </NoteState>
      </div>
    );
  }
  


export default App;
