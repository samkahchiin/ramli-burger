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

  removeIngredientsHandler = (type) => {
    if (this.state.ingredients[type] <= 0) {
      return;
    }
    const newIngredients = {...this.state.ingredients};
    newIngredients[type] = this.state.ingredients[type] - 1;

    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

    this.setState({
      ingredients: newIngredients,
      totalPrice: newPrice
    });
  }

  render() {
    let disabledInfo = {...this.state.ingredients};

    for (let ingredient in disabledInfo) {
      disabledInfo[ingredient] = disabledInfo[ingredient] <= 0
    }

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          add={this.addIngredientsHandler}
          remove={this.removeIngredientsHandler}
          disabledInfo={disabledInfo}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
