import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type AddItemFormPropsType = {
  addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
  let [title, setTitle] = useState("");
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      addTask();
    }
  };
  let [error, setError] = useState<String | null>(null)
  const addTask = () => {
    if (title.trim() !== "") {
      props.addItem(title.trim());
      setTitle("");
    } else {
      setError("Title is required")
    }
  };


  return <div>
    <TextField variant="outlined"
               error={!!error}
               value={title}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               label="Title"
               helperText={error} />
    <IconButton color="primary" onClick={addTask}>
      <AddBox />
    </IconButton>
  </div>
}