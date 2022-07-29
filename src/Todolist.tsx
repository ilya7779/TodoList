import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {TasksStateType} from "./AppWithRedux";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id: string
  title: string
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  filter: FilterValuesType
  removeTodolist: (id: string) => void
  changeTodolistTitle: (id: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {
  const tasks = useSelector<AppRootState, Array<TaskType>>( state => state.tasks[props.id])
  const dispatch = useDispatch();

  const onAllClickHandler = () => {
    props.changeFilter("all", props.id)
  }
  const onActiveClickHandler = () => {
    props.changeFilter("active", props.id)
  }
  const onCompletedClickHandler = () => {
    props.changeFilter("completed", props.id)
  }
  const removeTodolist = () => {
    props.removeTodolist(props.id)
  }
  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle)
  }

  let allTodolistTasks = tasks;
  let tasksForTodolist = allTodolistTasks;
  if (props.filter === "active") {
    tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
  }
  if (props.filter === "completed") {
    tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
  }

  return <div>
    <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
      <IconButton onClick={removeTodolist}>
        <Delete/>
      </IconButton>
    </h3>
    <AddItemForm addItem={(title) => {
      dispatch(addTaskAC(title, props.id));
    }}/>
    <div>
      {
        tasksForTodolist.map(t => {
          const onClickHandler = () => {
            dispatch(removeTaskAC(t.id, props.id));
          }
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            dispatch(changeTaskStatusAC(t.id, newIsDoneValue, props.id));
          }
          const onChangeTitleHandler = (newValue: string) => {
            dispatch(changeTaskTitleAC(t.id, newValue, props.id));
          }

          return <div key={t.id} className={t.isDone ? "is-done" : ""}>
            <Checkbox color="primary" onChange={onChangeStatusHandler} checked={t.isDone}/>
            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={onClickHandler}>
              <Delete/>
            </IconButton>
          </div>
        })
      }
    </div>
    <div>
      <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
              onClick={onAllClickHandler}
              color={'inherit'}>
        All
      </Button>
      <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
              onClick={onActiveClickHandler}
              color={'primary'}>
        Active
      </Button>
      <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
              onClick={onCompletedClickHandler}
              color={'secondary'}>
        Completed
      </Button>
    </div>
  </div>
}

