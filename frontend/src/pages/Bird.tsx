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
import { birdGet } from "../services/bird";
import  RetuenBotton  from "../components/ReturnBotton";


export const Bird = memo(() => {
  const [birdId, setBirdId] = useState("");
  const [picture, setPicture] = useState("");

  const cardStyle = {
    display: "block",
    transitionDuration: "0.3s",
    height: "450px",
    width: "400px",
    variant: "outlined",
  };

  
const onClickBird = async () => {

    const response = await birdGet(
        birdId,
        picture,
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
              onChange={(e) => setBirdId(e.target.value)}
            />
            <TextField
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              onChange={(e) => setPicture(e.target.value)}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={onClickBird}
          >
            Bird
          </Button>
          <RetuenBotton/>
        </CardActions>
      </Card>
    </Box>
  );
});

export default Bird;