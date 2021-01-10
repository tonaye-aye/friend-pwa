import React from "react";

// material components
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

// icons
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import DoneIcon from "@material-ui/icons/Done";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";

// custom Material UI styles
const useStyles = makeStyles({
  root: {
    display: "flex",
    margin: "0 0 1rem 0"
  },
  todo: {
    flex: "1"
  },
  todoText: {
    textDecoration: "line-through",
    opacity: "0.5"
  },
  buttonChecked: {
    opacity: ".5"
  }
});

export default function Todo({ text, todo, todos, setTodos }) {
  //custom styles
  const classes = useStyles();

  // delete handler for todo items
  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !== todo.id));
  };
  // complete handler for todo items
  const completeHandler = (e) => {
    console.log(e);
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            completed: !item.completed
          };
        }
        return item;
      })
    );
  };

  // return template JSX
  return (
    <Card className={classes.root}>
      <CardContent className={classes.todo}>
        <Typography
          variant="body1"
          component="p"
          className={`${todo.completed ? classes.todoText : ""}`}
        >
          {text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          className={`${todo.completed ? classes.buttonChecked : ""}`}
          value="balls"
          variant="contained"
          color="primary"
          onClick={completeHandler}
        >
          {todo.completed ? <ClearOutlinedIcon /> : <DoneIcon />}
        </Button>
        <Button variant="contained" color="secondary" onClick={deleteHandler}>
          <DeleteOutlineIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
