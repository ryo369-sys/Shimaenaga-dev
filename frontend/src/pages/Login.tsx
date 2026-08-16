import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';
import { isAxiosError } from 'axios';
import api from '../axios'; // ★1. 作成した共通Axiosインスタンスをインポート

export const Login: FC = () => {
  const [user_id, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const cardStyle = {
    display: "block",
    transitionDuration: "0.3s",
    height: "450px",
    width: "400px",
    variant: "outlined",
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      // ★1. 共通の api を使って短く記述
      const response = await api.post('/login', {
        user_id: user_id,
        password: password
      });

      if (response.data.success) {
        setMessage('ログイン成功！');

        // ★2 & ★3. 階層を response.data.user.user_id に修正し、バックティック `` に変更
        const targetUserId = response.data.user.user_id;
        navigate(`/dashboard/${targetUserId}`); 
      }
    } catch (error) {
      console.error(error);

      // ★4. Laravelから 401 や 422 が返ってきた場合（catch側で処理）
      if (isAxiosError(error) && error.response) {
        setMessage(error.response.data.message || 'ユーザーIDまたはパスワードが違います');
      } else {
        setMessage('サーバー通信エラーが発生しました');
      }
    }
  };

  const handleNavigateToRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/register'); 
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20
      }}
    >
      <Card style={cardStyle}>
        <CardHeader title="ログインページ" />
        <CardContent>
          <div>
            <TextField
              fullWidth
              id="username"
              type="text"
              label="Username"
              placeholder="Username"
              margin="normal"
              onChange={(e) => setUserId(e.target.value)}
            />
            <TextField
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {message && <Typography color="error" sx={{ mt: 2 }}>{message}</Typography>}
        </CardContent>

        <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={handleLogin}
          >
            Login
          </Button>

          <Button
            variant="outlined"
            size="large"
            color="secondary"
            onClick={handleNavigateToRegister}
          >
            新規作成
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};