import React from 'react';
import classes from './BuildControl.module.css'

const buildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button className={classes.Less} disabled={props.disabled} onClick={props.remove}>-</button>
      <button className={classes.More} onClick={props.add}>+</button>
    </div>
  )
}

export default buildControl;
