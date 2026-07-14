import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import { memo, useState } from "react";
import { register } from "../services/auth";
import axios from 'axios';
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import React, {  useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const FastApi = memo(() => {
    const [success, setSuccess] = useState([]);
    const [data, setData] = useState(true);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const cardStyle = {
    display: "block",
    transitionDuration: "0.3s",
    height: "650px",
    width: "600px",
    variant: "outlined",
  };

  
const handlefastApi = async () => {
    try{
        console.log("PHPへリクエストを送信します...");
        // Axiosを使用してデータを取得
        const response = await axios.get( 'http://localhost:8000/api/fastApi')
        
        console.log(response.data);
        setSuccess(response.data);
          setMessage("データの取得に成功しました！");
        } catch (error) {
          console.error('エラーが発生しました:', error);
          setMessage("データの取得に失敗しました。");
        }
    }

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

          {/* 取得したデータを画面に表示してみる */}
          {success && (
            <pre style={{ background: "#f5f5f5", padding: "10px", borderRadius: "4px" }}>
              {JSON.stringify(success, null, 2)}
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