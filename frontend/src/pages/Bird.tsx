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
      <Card style={cardStyle}>
        <CardHeader title="todoList" />
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={onClickBird}
          >
          </Button>
          <RetuenBotton/>
        </CardActions>
      </Card>
  );
});

export default Bird;