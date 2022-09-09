import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistsApi} from "../api/todolists-api";

export default {
  title: 'API'
}

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "17eae0a2-af43-4b48-8085-c56b6c8e5891"
  }
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistsApi.getTodolists()
      .then((res) => {
        setState(res.data)
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistsApi.createTodolist("Hello Vlad")
      .then((res) => {
        setState(res.data)
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = "16589b4b-1ea6-49ee-b29c-efe9f1e1d904";
    todolistsApi.deleteTodolist(todolistId)
      .then((res) => {
        setState(res.data)
      })
  }, [])

  return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = "41baa43c-d91c-4d9c-916b-8da83115e23e";
    todolistsApi.updateTodolist(todolistId, "Vlad hello")
      .then((res) => {
        setState(res.data)
      })
  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = "2b1d7bdd-3c25-4531-9dea-a29ccbc5a80b";
    todolistsApi.getTasks(todolistId)
      .then((res) => {
        setState(res.data)
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const DeleteTasks = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = "41baa43c-d91c-4d9c-916b-8da83115e23e";
    const taskId = "";
    todolistsApi.deleteTask(todolistId, taskId)
      .then((res) => {
        setState(res.data)
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}


