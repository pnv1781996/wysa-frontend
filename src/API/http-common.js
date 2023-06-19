import axios from "axios";

const axiosApi = axios.create({
  baseURL: "http://localhost:3001/api/",
  headers: {
    "Content-type": "application/json",
  },
});

export default axiosApi;
export async function get(url, params, config = {}) {
  let paramString = "";

  if (params) {
    paramString = `?currentpage=${params}`;
  }

  return axiosApi.get(`${url}${paramString}`, { ...config });
}

export async function post(url, data, config = {}) {
  return axiosApi.post(`${url}`, data, { ...config });
}
