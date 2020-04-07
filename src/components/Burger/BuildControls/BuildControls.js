import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
  { label: 'Bacon' , type: 'bacon' }
]

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>Current Price: <strong>{props.price}</strong></p>
      {controls.map(ctrl =>  {
         return <BuildControl
           key={ctrl.label}
           label={ctrl.label}
           add={() => props.add(ctrl.type)}
           remove={() => props.remove(ctrl.type)}
           disabled={props.disabledInfo[ctrl.type]}
         />
      })}
    </div>
  )
}

export default buildControls;
