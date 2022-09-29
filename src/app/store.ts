import {applyMiddleware, combineReducers, createStore} from "redux";
import {TasksActionsType, tasksReducer} from "../state/tasks-reducer";
import {TodolistsActionsType, todolistsReducer} from "../state/todolists-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer} from "./app-reducer";



const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
})


export type AppRootStateType = ReturnType<typeof rootReducer>


export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppActionsType = TodolistsActionsType | TasksActionsType;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
// @ts-ignore
window.store = store;