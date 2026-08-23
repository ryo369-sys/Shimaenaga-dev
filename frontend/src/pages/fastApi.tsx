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



export const FastApi = memo(() => {
  const [user_id, setUserId] = useState("test_user"); // テスト用に初期値をセット
  const [resultData, setResultData] = useState(null); // レスポンス全体を保持
  const [message, setMessage] = useState("");

  const cardStyle = {
    display: "block",
    transitionDuration: "0.3s",
    height: "650px",
    width: "600px",
    variant: "outlined",
  };

  const handlefastApi = async () => {
    try {
      console.log("PHPへリクエストを送信します...");
      
      // AxiosでPHPへPOST送信
      const response = await axios.post('http://localhost:8000/api/fastApi', {
        user_id: user_id
      });
      
      console.log("PHPからのレスポンス:", response.data);

      // レスポンスデータをセット
      setResultData(response.data);
      setMessage(response.data.message || "データの取得に成功しました！");

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
      <Card style={cardStyle}>
        <CardHeader title="FastAPI 疎通テスト" />
        <CardContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            ボタンを押して、PHP経由でFastAPIから正答率を取得します。
          </Typography>
        
          {message && (
            <Typography color="secondary" sx={{ mt: 2, mb: 2 }}>
              {message}
            </Typography>
          )}

          {/* 💡 データが取得できた時だけ綺麗にJSON表示する */}
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
            onClick={handlefastApi}
          >
            FastAPIデータを取得
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
});

export default FastApi;