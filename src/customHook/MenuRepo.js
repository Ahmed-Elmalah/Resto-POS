import axios from "axios";
import { domain } from "../store";

const MenuRepo = {
  // 1. جلب كل المنتجات (ممكن نبعت params للفلترة)
  getAllProducts: (params = {}) => {
    return axios.get(`${domain}/api/products`, {
      params: {
        populate: "*", // عشان يجيب الصورة والكاتيجوري
        ...params
      }
    });
  },

  // 2. جلب الكاتيجوريز
  getAllCategories: () => {
    return axios.get(`${domain}/api/categories?populate=*`);
  },

  // 3. إضافة منتج جديد (بيحتاج Token)
  addProduct: (data, token) => {
    return axios.post(`${domain}/api/products`, { data }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // 4. تعديل منتج (مثلاً تغيير السعر أو الحالة Stock)
  updateProduct: (id, data, token) => {
    return axios.put(`${domain}/api/products/${id}`, { data }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // 5. حذف منتج
  deleteProduct: (id, token) => {
    return axios.delete(`${domain}/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // 6. رفع صورة (مهم جداً للمنيو)
  uploadImage: (formData, token) => {
    return axios.post(`${domain}/api/upload`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  getProductById: (id) => {
    return axios.get(`${domain}/api/products/${id}?populate=*`);
  }
};

export default MenuRepo;