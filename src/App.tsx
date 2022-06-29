import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container, Grid, Paper} from "@mui/material";

export type FilterValuesType = "all" | "active" | "completed";

type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {

  function removeTask(id: string, todolistId: string) {
    let todolistTasks = tasks[todolistId];
    tasks[todolistId] = todolistTasks.filter(t => t.id !== id);
    setTasks({...tasks});
  }

  function addTask(title: string, todolistId: string) {
    let task = {id: v1(), title: title, isDone: false};
    let todolistTasks = tasks[todolistId];
    tasks[todolistId] = [task, ...todolistTasks]
    setTasks({...tasks});
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    let todolistTasks = tasks[todolistId];
    let task = todolistTasks.find(t => t.id === id);
    if (task) {
      task.isDone = isDone;
      setTasks({...tasks});
    }
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    let todolistTasks = tasks[todolistId];
    let task = todolistTasks.find(t => t.id === id);
    if (task) {
      task.title = newTitle;
      setTasks({...tasks});
    }
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists])
    }
  }

  function removeTodolist(id: string) {
    setTodolists(todolists.filter(tl => tl.id != id));
    delete tasks[id];
    setTasks({...tasks});
  }

  function changeTodolistTitle(id: string, newTitle: string) {
    const todolist = todolists.find(tl => tl.id === id);
    if (todolist) {
      todolist.title = newTitle;
      setTodolists([...todolists])
    }
  }

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"},
  ])

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
    ],
    [todolistId2]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "React book", isDone: true},
    ]
  });

  function addTodolist(title: string) {
    let newTodolistId = v1();
    let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: 'all'};
    setTodolists([newTodolist, ...todolists]);
    setTasks({
      ...tasks,
      [newTodolistId]: []
    })
  }

  return (
    <div className="App">
      <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{mr: 2}}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container fixed>
        <Grid container style={{padding: "20px"}}>
          <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
          {
            todolists.map(tl => {
              let allTodolistTasks = tasks[tl.id];
              let tasksForTodolist = allTodolistTasks;
              if (tl.filter === "active") {
                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
              }
              if (tl.filter === "completed") {
                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
              }
              return <Grid item>
                <Paper style={{padding: "10px"}}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    addTask={addTask}
                    changeFilter={changeFilter}
                    changeTaskStatus={changeStatus}
                    changeTaskTitle={changeTaskTitle}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            })
          }
        </Grid>
      </Container>
    </div>
  );
}

export default App;
