import API from "../axios";

export const getUserAccountDetails = async () => {
  const res = await API.get("/getUserDetails");
  return res.data; // { token: string }
};