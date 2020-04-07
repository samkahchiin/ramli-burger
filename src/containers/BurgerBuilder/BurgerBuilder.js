import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.7,
  meat: 1,
  bacon: 2
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad : 0,
      cheese: 0,
      bacon : 0,
      meat  : 0
    },
    totalPrice: 0
  }

  addIngredientsHandler = (type) => {
    const newIngredients = {...this.state.ingredients};
    newIngredients[type] = this.state.ingredients[type] + 1;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({
      ingredients: newIngredients,
      totalPrice: newPrice
    });
  }

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls add={this.addIngredientsHandler}/>
      </Aux>
    );
  }
}

export default BurgerBuilder;
