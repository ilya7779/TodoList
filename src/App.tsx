import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";

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

  return (
    <div className="App">
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
          return  <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            addTask={addTask}
            changeFilter={changeFilter}
            changeTaskStatus={changeStatus}
            filter={tl.filter}
            removeTodolist={removeTodolist}
          />
        })
      }
    </div>
  );
}

export default App;
