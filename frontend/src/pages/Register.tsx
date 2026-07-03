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
  const [todoTitle, setTodoTitle] = useState("");
  const [content, setContent] = useState("");

  const cardStyle = {
    display: "block",
    transitionDuration: "0.3s",
    height: "450px",
    width: "400px",
    variant: "outlined",
  };

  
const onClickTodoGet = async () => {

    const response = await todoGet(
        todoTitle,
        content,
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
              onChange={(e) => setTodoTitle(e.target.value)}
            />
            <TextField
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              onChange={(e) => setContent(e.target.value)}
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
            Login
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
});
