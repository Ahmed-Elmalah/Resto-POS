import axios from 'axios';
import { domain } from "../store"; // استدعاء الدومين من الستور

// استخدام المتغير لتركيب الرابط
const API_URL = `${domain}/api/tables`;

// التصدير بنظام الـ Named Export
export const tableRepo = {
  // جلب كل الترابيزات
  getAll: (params = {}) => axios.get(API_URL, { 
    params: { populate: "*", ...params } 
  }),

  // إضافة ترابيزة جديدة
  create: (data, token) => axios.post(API_URL, { data }, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  }),

  // تعديل بيانات ترابيزة
  update: (id, data, token) => axios.put(`${API_URL}/${id}`, { data }, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  }),

  // حذف ترابيزة
  delete: (id, token) => axios.delete(`${API_URL}/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  }),

  // جلب ترابيزة واحدة محددة
  getById: (id) => axios.get(`${API_URL}/${id}?populate=*`)
};  