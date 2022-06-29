import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
  changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
  filter: FilterValuesType
  removeTodolist: (id: string) => void
  changeTodolistTitle: (id: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {
  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }
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

  return <div>
    <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
      <IconButton onClick={removeTodolist}>
        <Delete/>
      </IconButton>
    </h3>
    <AddItemForm addItem={addTask}/>
    <div>
      {
        props.tasks.map(t => {
          const onClickHandler = () => {
            props.removeTask(t.id, props.id)
          }
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeTaskStatus(t.id, newIsDoneValue, props.id);
          }
          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id);
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

