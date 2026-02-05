import axios from 'axios';
import { domain } from "../store";

const API_URL = `${domain}/api/tables`;

export const tableRepo = {
  // Fetch all tables
  getAll: (params = {}) => axios.get(API_URL, { 
    params: { populate: "*", ...params } 
  }),

  // Create new table
  create: (data, token) => axios.post(API_URL, { data }, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  }),

  // Update table
  update: (id, data, token) => axios.put(`${API_URL}/${id}`, { data }, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  }),

  // Delete table
  delete: (id, token) => axios.delete(`${API_URL}/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  }),

  // Get single table
  getById: (id) => axios.get(`${API_URL}/${id}?populate=*`)
};