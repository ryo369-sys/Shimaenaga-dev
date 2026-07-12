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
import { useNavigate } from 'react-router-dom';

export const Register = memo(() => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const cardStyle = {
    display: "block",
    transitionDuration: "0.3s",
    height: "650px",
    width: "600px",
    variant: "outlined",
  };

  
const handleregister = async () => {
  try{
    const response = await axios.post('http://localhost:8000/api/register',{
        user_id: userId,
        password: password,
        email : email,
        gender : gender,
        age : age,
    });

    console.log("PHPからの生のお返事:", response.data);

    if (response.data.success) {
        setMessage('新規作成成功！');
        // 🚀 成功したらダッシュボードページへジャンプ！
        navigate('/Home/${age}'); 
      } else {
        setMessage(response.data.message || '新規作成失敗');
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
        <CardHeader title="Register" />
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
            <TextField
              fullWidth
              id="email"
              type="email"
              label="email"
              placeholder="email"
              margin="normal"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              id="gender"
              type="gender"
              label="gender"
              placeholder="gender"
              margin="normal"
              onChange={(e) => setGender(e.target.value)}
            /> 
            <TextField
              fullWidth
              id="age"
              type="age"
              label="age"
              placeholder="genageder"
              margin="normal"
              onChange={(e) => setAge(e.target.value)}
            />                            
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={handleregister}
          >
            register
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
});

export default Register;