import React from 'react';
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
  const ingredientList = Object.keys(props.ingredients)
    .map(type => {
      return <li key={type}>
        <span style={{textTransform: 'capitalize'}}>{type}</span>: {props.ingredients[type]}
      </li>
    })

  return (
    <div>
      <p>Thanks for order</p>
      <p>Here is the ingredients</p>
      <ul>
        {ingredientList}
      </ul>
      <p><strong>Total Price: {props.price}</strong></p>
      <p>Still want to continue?!</p>
      <Button btnType='Danger' clicked={props.purchaseCancelled}>CANCEL</Button>
      <Button btnType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
    </div>

  )
}

export default orderSummary;
