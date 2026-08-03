import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { memo, useState } from "react";
import axios from 'axios';


export const GetAccuracy = () => {

  const [file, setFile] = useState<File | null>(null);
  //const [userId, setUserId] = useState("test_user"); // テスト用に初期値をセット
  const [resultData, setResultData] = useState(null); // レスポンス全体を保持
  const [message, setMessage] = useState("");

  const cardStyle = {
    display: "block",
    transitionDuration: "0.3s",
    height: "650px",
    width: "600px",
    variant: "outlined",
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      if (!selectedFile.type.startsWith('image/')) {
        setMessage("画像ファイルを選択してください。");
        return;
      }
      
      setFile(selectedFile);
      setMessage(`選択中: ${selectedFile.name}`);
    }
  };

  const handlegetAccuracy = async () => {
    if (!file) {
      setMessage("画像ファイルが選択されていません。");
      return;
    }

    // 💡 2. 画像ファイル形式の安全チェック
    if (!file.type.startsWith('image/')) {
      setMessage("画像ファイル以外のデータは送信できません。");
      return;
    }

    try {
     console.log("PHPへリクエストを送信します...");
      
     const formData = new FormData()

    formData.append(
      "image",
      file
    )
     
      // AxiosでPHPへPOST送信
      const response = await axios.post('http://localhost:8000/api/GetAccuracy', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
      
      console.log("PHPからのレスポンス:", response.data);

      const data = response.data

      // レスポンスデータをセット
      setResultData(data);
      setMessage(data.message || "データの取得に成功しました！");

    } catch (error) {
      console.error('エラーが発生しました:', error);
      setMessage("データの取得に失敗しました。");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 5
      }}
    >
      <Card sx={cardStyle} variant="outlined">
        <CardHeader title="シマエナガ 判定テスト" />
        <CardContent>
          {/* 💡 1. ファイルを選択するボタンを追加！ */}
          <Box sx={{ mb: 2 }}>
            <Button variant="outlined" component="label">
              画像ファイルを選択
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
          </Box>

          {message && (
            <Typography color="secondary" sx={{ mt: 2, mb: 2 }}>
              {message}
            </Typography>
          )}

          {/* 💡 2. 判定結果を表示 */}
          {resultData && (
            <pre style={{ background: "#f5f5f5", padding: "10px", borderRadius: "4px", overflowX: "auto" }}>
              {JSON.stringify(resultData, null, 2)}
            </pre>
          )}
        </CardContent>

        <CardActions sx={{ px: 2, pb: 2 }}>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={handlegetAccuracy}
            disabled={!file} // 💡 ファイル未選択時はボタンを押せないように制御
          >
            シマエナガのデータを取得
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default GetAccuracy;