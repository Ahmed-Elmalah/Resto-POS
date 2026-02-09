import axios from "axios";
import { domain } from "../store";

const MenuRepo = {
  getAllProducts: (params = {}) => {
    return axios.get(`${domain}/api/products`, {
      params: {
        populate: "*", 
        ...params
      }
    });
  },

  getAllCategories: () => {
    return axios.get(`${domain}/api/categories?populate=*`);
  },

  addProduct: (data, token) => {
    return axios.post(`${domain}/api/products`, { data }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  updateProduct: (id, data, token) => {
    return axios.put(`${domain}/api/products/${id}`, { data }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  deleteProduct: (id, token) => {
    return axios.delete(`${domain}/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  uploadImage: (formData, token) => {
    return axios.post(`${domain}/api/upload`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  getProductById: (id) => {
    return axios.get(`${domain}/api/products/${id}?populate=*`);
  },
};
export default MenuRepo;