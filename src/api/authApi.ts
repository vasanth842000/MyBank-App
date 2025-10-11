import API from "../axios";
import {urls} from "../api/apiUrls"
import type { LoginData } from "../@types";


export const loginAPI = async (data: LoginData) => {
  const res = await API.post(urls.login, data);
  return res.data; // { token: string }
};