import axios from "axios";
import {atom , selector} from 'recoil'


export const UserDetails = atom({
    key:"userDetails",
    default: selector({
        key:"userSelector",
        get: async () =>{
            const res = await axios.get(`http://localhost:3000/api/v1/user/details`,{
                headers:{
                    Authorization: "Bearer " +localStorage.getItem("token")
                }
                
            })
            return res.data;
        }
    })
})