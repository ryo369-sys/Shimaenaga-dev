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
import { todoGet } from "../services/todo";

export const Todo = memo(() => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [comment, setComment] = useState("");

  const cardStyle = {
    display: "block",
    transitionDuration: "0.3s",
    height: "450px",
    width: "400px",
    variant: "outlined",
  };

  
const onClickTodoGet = async () => {

    const response = await todoGet(
      userId,
      password,
      comment
    );

    console.log(response.data);
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
        <CardHeader title="todoList" />
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
              id="comment"
              type="comment"
              label="comment"
              placeholder="comment"
              margin="normal"
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={onClickTodoGet}
          >
            todo
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
});
