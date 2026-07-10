import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
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

    console.log(response.data.success)

    if (response.data.success) {
        setMessage('ログイン成功！');
        // 🚀 成功したらダッシュボードページへジャンプ！
        navigate('/dashboard'); 
      } else {
        setMessage(response.data.message || 'ログイン失敗');
      }
    } catch (error) {
      console.error(error);
      setMessage('エラーが発生しました');
    }
  };

  return (
    <Box
        sx = {{
          display : "flex",
          alignItems : "center",
          justifyContent : "center",
          padding : 20
        }}
    >
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
          {/* 💡 画面にエラーや成功メッセージを出すために、ここに表示用タグを置いておくと便利です */}
          {message && <p style={{ color: message.includes('成功') ? 'green' : 'red' }}>{message}</p>}
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={handleLogin}
          >
            Login
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
