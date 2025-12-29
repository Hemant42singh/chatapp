import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        authUser:null,
        otherUsers:null,
        selectedUser: null,
        onlineUsers:null,
    },
    reducers:{// contain action  use to change the intialstate data
        setAuthUser:(state, action)=>{
            state.authUser = action.payload;//  payload means jo frontend se data bhejnge vo as itis  yha store ho jayega
        },
        setOtherUsers:(state,action)=>{
            state.otherUsers = action.payload;
        },
        setSelectedUser:(state,action) =>{
            state.selectedUser = action.payload;
        },
        setOnlineUsers:(state, action)=>{
            state.onlineUsers = action.payload;
        }
    }
});
export const {setAuthUser, setOtherUsers,setSelectedUser, setOnlineUsers} = userSlice.actions;
export default userSlice.reducer;