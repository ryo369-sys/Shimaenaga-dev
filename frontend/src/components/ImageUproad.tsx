import axios from 'axios';
import { memo, useState } from "react";

type ImageUproad = {
  img_name: string
  resultName: string
  resultAccuary:string
}

type Props = {
  file: File | null
  onResult: (data: ImageUproad[]) => void
}

export const ImageUproad = ({
  file,
  onResult
}: Props) => {
    const [message, setMessage] = useState("");

    const handleImageUproad = async () => {

    if (!file) {
      alert("ファイルを選択してください")
      return
    }

    const formData = new FormData()

    formData.append(
      "img_file",
      file
    )
  try{
    const response = await axios.post(
       'http://localhost:8000/api/GetAccuracy',
       formData, // 🌟 オブジェクトではなくformDataをそのまま渡します
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
    );
    const data = await response.data

    const imgUpdata: ImageUproad[] = data.time.map((item: any) => ({
        img_name: file.name,               // 選択した画像のファイル名を入れる
        resultName: item.resultName || "シマエナガ", // APIの返り値のキー名に合わせる
        resultAccuary: item.resultAccuary || "0.0"  // タイポ（resultAccuary）に合わせる
      }));
  onResult(imgUpdata)
    } catch (error) {
      console.error(error);
      setMessage('エラーが発生しました');
    }
  }

  return (
    <button onClick={handleImageUproad} >
      FFT解析開始
    </button>
  )
}