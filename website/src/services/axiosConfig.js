import axios from "axios";

let baseURL = "http://localhost:8081/api";

const publicReq = axios.create({
  baseURL,
});

const privateReq = axios.create({
  baseURL,
});

const imageUpload = axios.create({
  baseURL,
});

imageUpload.defaults.headers.common["Content-Type"] = "multipart/form-data";


imageUpload.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

privateReq.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { imageUpload, privateReq };
export default publicReq;
