import axios from "axios";

//todoデータの編集
export const todoGet = (
  userId: string,
  password: string
) => {
  return axios.post(
    "http://localhost:1323/api/Todo",
    {
      user_id: userId,
      password: password
    }
  );
};