import React, { useEffect, useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/HomePage'
import Signup from './components/Signup'
import Login from './components/Login'
import { useDispatch, useSelector } from 'react-redux'
import store from './redux/store'
import {io}from 'socket.io-client'
import { setSocket } from './redux/socketSlice'
import { setOnlineUsers } from './redux/userSlice'

const router = createBrowserRouter([
  {
    path:"/",
    element:<HomePage/>
  },
   
  {
      path:"/register",
      element:<Signup/>
  },
  {
    path:"/login",
    element:<Login/>
  },
])
const App = () => {
  
  
  const {authUser} = useSelector(store=>store.user);
  const {socket}= useSelector(store=>store.socket);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    if(authUser?._id){
      const socket = io('http://localhost:8080', {
       query:{
        userId: authUser._id
       }
      });
      dispatch(setSocket(socket));

      socket.on('getOnlineUsers', (onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
      });
      return ()=> socket.close()// jab bhi app ko chor kr jaenge vo automatically diconnect hojayega
    }
    else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }
  },[authUser])

  return (
    <div className='p-4 h-screen  flex items-center justify-center'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App

