import axios from "axios";

//todoデータの編集
export const birdGet = (
  birdId: string,
  picture: string,
) => {
  return axios.post(
    "http://localhost:1323/api/bird",
    {
      user_id: birdId,
      password: picture
    }
  );
};