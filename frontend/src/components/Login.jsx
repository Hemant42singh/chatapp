import React from "react";
import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";



const Login = () => {

  const [user,setUser] = useState({
    username:"",
    password:"",
});
const dispatch = useDispatch();//redux mein action ko dispatch krne k liye
const navigate = useNavigate();

const onsubmithandler = async(e) =>{
  e.preventDefault();
  try{// sending data to database
    console.log(user);
    const res = await axios.post('http://localhost:8080/api/auth/login', user, { 
       headers: {
        'Content-Type': 'application/json'
       },
       withCredentials: true
    });
       
        navigate("/");
        console.log(res.data);
        dispatch(setAuthUser(res.data));
  }
  catch(error) {
    toast.error(error.response.data.message);
    console.log(error);
  }
  setUser({ // taki submit krne k baad firse form empty ho jaye
    username:"",
    password:"",
  })
}

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10">
          
          <h1 className="text-3xl font-bold text-center mb-4">
            Login
          </h1>

          <form onSubmit={onsubmithandler} action="">
            {/* Username */}
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Username</span>
              </label>
              <input
               value={user.username}
            onChange={(e)=>setUser({...user, username:e.target.value})}
                className="w-full input input-bordered h-10"
                type="text"
                placeholder="Enter username"
              />
            </div>

            {/* Password */}
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Password</span>
              </label>
              <input
               value={user.password}
            onChange={(e)=>setUser({...user, password:e.target.value})}
                className="w-full input input-bordered h-10"
                type="password"
                placeholder="Enter password"
              />
            </div>


          

            {/* Login link */}
            <div className="text-center my-2">
              <Link to="/register" className="text-blue-500">
                Don't have an account? Signup
              </Link>
            </div>

            {/* Button */}
            <div>
              <button type="submit" className="btn btn-block btn-sm mt-2 border border-slate-700">
                Login
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;
