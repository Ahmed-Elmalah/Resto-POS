import axios from "axios";
import { domain } from "../store";

const loginRepo = {
    auth_login : (values) =>{
        return axios.post(`${domain}/api/auth/local`,{
            identifier : values.email,
            password : values.password
        });
    },

    check_token : (jwt)=>{
        return axios.get(`${domain}/api/users/me?populate=role` , {
            headers : {
                Authorization : `Bearer ${jwt}`
            }
        })
    }
}

export default loginRepo;