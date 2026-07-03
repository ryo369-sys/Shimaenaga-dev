import axios from "axios";

//ログイン
export const login = (
  userId: string,
  password: string
) => {
  return axios.post(
    "http://localhost:1323/api/login",
    {
      user_id: userId,
      password: password
    }
  );
};

//ログアウト
export const logout = () => {
  return axios.post(
    "http://localhost:1323/api/logout",
  );
};

//会員登録
export const register = (
  userId: string,
  password: string
) => {
  return axios.post(
    "http://localhost:1323/api/register",
    {
      user_id: userId,
      password: password
    }
  );

};