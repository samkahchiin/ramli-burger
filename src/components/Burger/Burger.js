import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.module.css';

const burger = (props) => {
  const burgerContents = Object.keys(props.ingredients)
  .map(type => {
    return [...Array(props.ingredients[type])].map((_, i) => {
      return <BurgerIngredient key={type + i} ingredient={type} />
    });
  });

  return (
    <div className={classes.Burger}>
      <BurgerIngredient ingredient='bread-top' />
      {burgerContents}
      <BurgerIngredient ingredient='bread-bottom' />
    </div>
  );
}

export default burger;
