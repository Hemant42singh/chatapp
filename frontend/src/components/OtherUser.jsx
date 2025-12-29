import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';

const OtherUser = ({user}) => {

   const dispatch = useDispatch();
   const {selectedUser, onlineUsers} = useSelector(store =>store.user);
   const isOnline = onlineUsers?.includes(user._id);
   
   const selectedUserHandler =(user) =>{
      dispatch(setSelectedUser(user));
   }

  return (
    <>
       <div onClick={()=>selectedUserHandler(user)} className={`${selectedUser?._id=== user?._id ?'bg-zinc-200 text-black': ''} flex gap-2 items-center text-white hover:text-zinc-900 hover:bg-zinc-200 rounded p-2 cursor-pointer`}>
         <div>
            <div className='w-12 rounded-full'>
                <img className={`w-12 h-12 rounded-full border-2 ${isOnline ? 'border-green-400': 'border-gray-800'}`} src={user?.profilePhoto} alt="user-photo" />
            </div>
         </div>
         <div className='flex flex-col flex-1'>
            <div className='flex justify-between gap-2'>
               <p>{user?.fullName}</p>
            </div>
         </div>
       </div>
       <div className=' divider my-0 py-0 h-1'></div>
    </>
  )
}

export default OtherUser
