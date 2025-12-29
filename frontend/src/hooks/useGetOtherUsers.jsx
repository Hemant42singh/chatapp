import axios from 'axios';
import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import {setOtherUsers} from '../redux/userSlice'


const useGetOtherUsers = () => {
 
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchOtherUsers = async()=>{
         
            try{
                axios.defaults.withCredentials = true; // jha jha api fetch korege jisme middle ware use ho rha ha vha ye krna padega 
                const res = await axios.get(`http://localhost:8080/api/auth/all`);
                console.log(res)
                // store
                dispatch(setOtherUsers(res.data));
            }
            catch(error){
                 console.log(error)
            }
        }
        fetchOtherUsers();
    },[])

}

export default useGetOtherUsers
