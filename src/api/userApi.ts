import API from "../axios";
import {urls} from "../api/apiUrls"


export const getUserAccountDetails = async () => {
  const res = await API.get(urls.userList);
  return res.data; // { token: string }
};