import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const burger = (props) => {
  let burgerContents = Object.keys(props.ingredients)
    .map(type => {
      return [...Array(props.ingredients[type])].map((_, i) => {
        return <BurgerIngredient key={type + i} ingredient={type} />
      });
    })
    .reduce((accum, elem) => {
      return accum.concat(elem);
    }, []);

  if (burgerContents.length === 0) {
    burgerContents = <p>Please select some ingredients</p>
  };

  return (
     <div className={classes.Burger}>
       <BurgerIngredient ingredient='bread-top' />
       {burgerContents}
       <BurgerIngredient ingredient='bread-bottom' />
     </div>
  );
}

export default burger;
