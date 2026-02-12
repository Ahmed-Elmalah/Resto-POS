import axios from "axios";
import { domain } from "../store";

const API_URL = `${domain}/api/reservations`;

export const reservationRepo = {
  getByDate: (dateString) =>
    axios.get(API_URL, {
      params: {
        "filters[reservation_date][$eq]": dateString,
        "filters[res_status][$ne]": "cancelled",
        populate: "table",
      },
    }),

  create: (data, token) =>
    axios.post(
      API_URL,
      { data },
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      },
    ),

  getUserReservations: (userId, token) =>
    axios.get(API_URL, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      params: {
        "filters[users_permissions_user][id][$eq]": userId, // Filter by User ID
        populate: "*",
        sort: "reservation_date:desc", // Newest first
      },
    }),

  cancel: (id, token) =>
    axios.put(
      `${API_URL}/${id}`,
      {
        data: { res_status: "cancelled" },
      },
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      },
    ),

  getAll: (token, params = {}) =>
    axios.get(API_URL, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      params: {
        populate: ["table", "users_permissions_user"],
        sort: "reservation_date:desc,start_time:asc",
        ...params,
      },
    }),

  updateStatus: (documentId, status, token) =>
    axios.put(
      `${API_URL}/${documentId}`,
      {
        data: { res_status: status },
      },
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      },
    ),

  getByTable: (tableId, todayDate) =>
    axios.get(API_URL, {
      params: {
        "filters[table][documentId][$eq]": tableId, // Filter by Table
        "filters[reservation_date][$gte]": todayDate, // Only future/today
        "filters[res_status][$in]": ["confirmed", "pending"], // Active only
        populate: "*", // Get details
        sort: "reservation_date:asc,start_time:asc", // Sort: Earliest first
      },
    }),

  getTodayActive: (token) => {
    const today = new Date().toISOString().split("T")[0];
    return axios.get(API_URL, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      params: {
        "filters[reservation_date][$eq]": today,
        "filters[res_status][$in]": ["confirmed", "pending"],
        populate: "table", 
      },
    });
  },
};
