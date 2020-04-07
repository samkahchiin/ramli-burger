import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/modal/modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
    totalPrice: 0,
    purchaseable: false,
    purchased: false
  }

  updatePurchaseable = (ingredients) => {
    const sum = Object.values(ingredients).reduce((total, amount) => total + amount);

    this.setState({purchaseable: sum > 0});
  }

  addIngredientsHandler = (type) => {
    const newIngredients = {...this.state.ingredients};
    newIngredients[type] = this.state.ingredients[type] + 1;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({
      ingredients: newIngredients,
      totalPrice: newPrice
    });
    this.updatePurchaseable(newIngredients);
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
    this.updatePurchaseable(newIngredients);
  }

  purchase = () => {
    this.setState({purchased: true})
  }

  render() {
    let disabledInfo = {...this.state.ingredients};

    for (let ingredient in disabledInfo) {
      disabledInfo[ingredient] = disabledInfo[ingredient] <= 0
    }

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <Modal show={this.state.purchased}>
          <OrderSummary ingredients={this.state.ingredients} purchase={this.purchase}/>
        </Modal>
        <BuildControls
          add={this.addIngredientsHandler}
          remove={this.removeIngredientsHandler}
          price={this.state.totalPrice.toFixed(2)}
          disabledInfo={disabledInfo}
          purchaseable={this.state.purchaseable}
          purchase={this.purchase}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
