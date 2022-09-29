import React from 'react';
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";


export default {
  title: 'EditableSpan Component',
  component: EditableSpan
}

const changeCallback = action("Value changed")

export const EditableSpanBaseExample = () => {
  return (<EditableSpan value={"Start value"} onChange={changeCallback} />)
}



