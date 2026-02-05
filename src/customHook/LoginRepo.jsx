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
    },

    change_password: (data, jwt) => {
        return axios.post(`${domain}/api/auth/change-password`, data, {
            headers: { Authorization: `Bearer ${jwt}` }
        });
    },

    getAllUsers: (jwt) => {
        return axios.get(`${domain}/api/users?populate=role`, {
            headers: { Authorization: `Bearer ${jwt}` }
        });
    },

    deleteUser: (id, jwt) => {
        return axios.delete(`${domain}/api/users/${id}`, {
            headers: { Authorization: `Bearer ${jwt}` }
        });
    },
    
    getUserById: (id, jwt) => {
        return axios.get(`${domain}/api/users/${id}?populate=role`, {
            headers: { Authorization: `Bearer ${jwt}` }
        });
    },

    getCashierOrders: (userId, token) => {
        return axios.get(`${domain}/api/orders?filters[cashier][id][$eq]=${userId}&fields[0]=total`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    },
}

export default loginRepo;