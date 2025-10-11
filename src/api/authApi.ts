import API from "../axios";

interface LoginData {
  username: string;
  password: string;
}

export const loginAPI = async (data: LoginData) => {
  const res = await API.post("/login", data);
  return res.data; // { token: string }
};