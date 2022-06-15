import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
    <input
      value={title}
      onChange={onChangeHandler}
      onKeyPress={onKeyPressHandler}
      className={error ? "error" : ""}/>
    <button onClick={addTask}>+</button>
    {error && <div className="error-message">{error}</div>}
  </div>
}