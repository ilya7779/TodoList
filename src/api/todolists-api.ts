import axios from "axios";


const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "17eae0a2-af43-4b48-8085-c56b6c8e5891"
  }
}

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  ...settings
})

export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}

type CreateTodolistResponseType = {
  resultCode: number
  messages: string[]
  data: {
    item: TodolistType
  }
}
type DeleteUpdateTodolistResponseType = {
  resultCode: number
  messages: Array<string>
  data: {}
}

type ResponseType<D = {}> = {
  resultCode: number
  messages: Array<string>
  data: D
}

type TaskType = {
  description: string
  title: string
  completed: boolean
  status: number
  priority: number
  startDate: string
  deadline: string
  id: string
  todolistId: string
  order: number
  addedDate: string
}

type GetTaskResponse = {
  error: string | null
  totalCount: number
  items: TaskType[]
}


export const todolistsApi = {
  getTodolists() {
    const promise = instance.get<TodolistType[]>("todo-lists")
    return promise;
  },
  createTodolist(title: string) {
    const promise = instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", {title: title})
    return promise;
  },
  deleteTodolist(id: string) {
    const promise = instance.delete<ResponseType>(`todo-lists/${id}`, settings)
    return promise;
  },
  updateTodolist(id: string, title: string) {
    const promise = instance.put<ResponseType>(`todo-lists/${id}`, {title: title})
    return promise;
  },
  getTasks(todolistId: string) {
    return instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`)
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
  }
}