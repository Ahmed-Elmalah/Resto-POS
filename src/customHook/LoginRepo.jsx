import axios from "axios";
import { domain } from "../store";

const loginRepo = {
    auth_login : (values) =>{
        return axios.post(`${domain}/api/auth/local`,{
            identifier : values.email,
            password : values.password
        });
    },

    auth_signup: (values) => {
        return axios.post(`${domain}/api/auth/local/register`, {
            username: values.username,
            email: values.email,
            password: values.password,
        });
    },

    update_user: (id, extraData, jwt) => {
        return axios.put(`${domain}/api/users/${id}`, extraData, {
            headers: { Authorization: `Bearer ${jwt}` }
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