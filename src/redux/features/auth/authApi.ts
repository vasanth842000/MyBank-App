import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

interface LoginData {
  username: string;
  password: string;
}

export const loginAPI = async (data: LoginData) => {
  const res = await API.post("/login", data);
  return res.data; // { token: string }
};