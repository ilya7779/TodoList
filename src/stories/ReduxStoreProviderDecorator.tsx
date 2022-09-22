// import React from "react";
// import {Provider} from "react-redux";
// import {store} from "../state/store";
//
// export const ReduxStoreProviderDecorator = (storyFn: any) => {
//   return <Provider store={store}> {storyFn()}</Provider>
// }

import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {tasksReducer} from '../state/tasks-reducer'
import {todolistsReducer} from '../state/todolists-reducer'
import {v1} from 'uuid'
import {AppRootStateType} from '../state/store'
import {TaskPriorities, TaskStatuses} from '../api/todolists-api'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer
})

const initialGlobalState: AppRootStateType = {
  todolists: [
    {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0},
    {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0}
  ] ,
  tasks: {
    ["todolistId1"]: [
      {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
      {id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
    ],
    ["todolistId2"]: [
      {id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
      {id: v1(), title: "React Book", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
    ]
  }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
  <Provider
    store={storyBookStore}>{storyFn()}
  </Provider>)

