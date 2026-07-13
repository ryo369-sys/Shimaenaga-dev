import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import React from 'react';
import { memo, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FC } from 'react'
import { login } from "../services/auth";

export const Login : FC =() => {
  const [userId, setUserId] = useState("");
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
  try{
    const response = await axios.post('http://localhost:8000/api/login',{
        user_id: userId,
        password: password
    });

    console.log(response.data.user_id)

    if (response.data.success) {
        setMessage('ログイン成功！');
        // 🚀 成功したらダッシュボードページへジャンプ！
        navigate('/dashboard/${response.data.user_id}'); 
      } else {
        setMessage(response.data.message || 'ログイン失敗');
      }
    } catch (error) {
      console.error(error);
      setMessage('エラーが発生しました');
    }
  };

  const handleNavigateToRegister = async (e: React.FormEvent) => {
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
      {/* ⚠️ ここにあった新規作成ボタンを下に引っ越しさせました */}
      <Card style={cardStyle}>
        <CardHeader title="ログインページ" />
        <CardContent>
          <div>
            <TextField
              fullWidth
              id="username"
              type="email"
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
          {/* メッセージ表示用の領域（もし必要なら） */}
          {message && <Typography color="error" sx={{ mt: 2 }}>{message}</Typography>}
        </CardContent>

        {/* 🚀 ボタンエリア：2つのボタンをここに並べます */}
        <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={handleLogin}
          >
            Login
          </Button>

          {/* 🟢 新規作成ボタンをここに引っ越し！ */}
          <Button
            variant="outlined" // 横並びの時はデザインを変えて「outlined」にするとプロっぽくなります
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
