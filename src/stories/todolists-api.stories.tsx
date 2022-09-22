import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistsAPI} from "../api/todolists-api";

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
    todolistsAPI.getTodolists()
      .then((res) => {
        setState(res.data)
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistsAPI.createTodolist("Hello Vlad")
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
    todolistsAPI.deleteTodolist(todolistId)
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
    todolistsAPI.updateTodolist(todolistId, "Vlad hello")
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
    todolistsAPI.getTasks(todolistId)
      .then((res) => {
        setState(res.data)
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}

// export const DeleteTasks = () => {
//   const [state, setState] = useState<any>(null)
//   useEffect(() => {
//     const todolistId = "41baa43c-d91c-4d9c-916b-8da83115e23e";
//     const taskId = "";
//     todolistsApi.deleteTask(todolistId, taskId)
//       .then((res) => {
//         setState(res.data)
//       })
//
//   }, [])
//   return <div> {JSON.stringify(state)}</div>
// }
export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  const [taskId, setTaskId] = useState<string>('')
  const [todolistId, setTodolistId] = useState<string>('')

  const deleteTask = () => {
    todolistsAPI.deleteTask(todolistId, taskId)
      .then((res) => {
        setState(res.data)
      })
  }

  return <div> {JSON.stringify(state)}
    <div>
      <input placeholder={'todolistId'} value={todolistId}
             onChange={(e) => {
               setTodolistId(e.currentTarget.value)
             }}/>
      <input placeholder={'taskId'} value={taskId}
             onChange={(e) => {
               setTaskId(e.currentTarget.value)
             }}/>
      <button onClick={deleteTask}>delete task</button>
    </div>
  </div>
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  const [taskTitle, setTaskTitle] = useState<string>('')
  const [todolistId, setTodolistId] = useState<string>('')

  const createTask = () => {
    todolistsAPI.createTask(todolistId, taskTitle)
      .then((res) => {
        setState(res.data)
      })
  }

  return <div> {JSON.stringify(state)}
    <div>
      <input placeholder={'todolistId'} value={todolistId}
             onChange={(e) => {
               setTodolistId(e.currentTarget.value)
             }}/>
      <input placeholder={'Task Title'} value={taskTitle}
             onChange={(e) => {
               setTaskTitle(e.currentTarget.value)
             }}/>
      <button onClick={createTask}>create task</button>
    </div>
  </div>
}

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null)
  const [title, setTitle] = useState<string>('title 1')
  const [description, setDescription] = useState<string>('descripton 1')
  const [status, setStatus] = useState<number>(0)
  const [priority, setPriority] = useState<number>(0)
  const [startDate, setStartDate] = useState<string>('')
  const [deadline, setDeadline] = useState<string>('')

  const [todolistId, setTodolistId] = useState<string>('')
  const [taskId, setTaskId] = useState<string>('')

  const createTask = () => {
    todolistsAPI.updateTask(todolistId, taskId, {
      deadline: "",
      description: description,
      priority: priority,
      startDate: "",
      status: status,
      title: title
    })
      .then((res) => {
        setState(res.data)
      })
  }

  return <div> {JSON.stringify(state)}
    <div>
      <input placeholder={'taskId'} value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value) }}/>
      <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value) }}/>
      <input placeholder={'Task Title'} value={title} onChange={(e) => { setTitle(e.currentTarget.value)}}/>
      <input placeholder={'Description'} value={description} onChange={(e) => { setDescription(e.currentTarget.value)}}/>
      <input placeholder={'status'} value={status} type="number" onChange={(e) => { setStatus(+e.currentTarget.value)}}/>
      <input placeholder={'priority'} value={priority} type="number" onChange={(e) => { setPriority(+e.currentTarget.value)}}/>
      <button onClick={createTask}>update task</button>
    </div>
  </div>
}


