import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.7,
  meat: 1,
  bacon: 2
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
    purchaseable: false,
    purchased: false,
    loading: false,
    error: null
  }

  componentDidMount() {
    axios.get('/ingredients.json')
      .then(res => {
        this.setState({ ingredients: res.data })
      })
      .catch(err => {
        this.setState({ error: true })
      });
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
    this.setState({purchased: true});
  }

  cancelPurchaseHandler = () => {
    this.setState({purchased: false});
  }

  continuePurchaseHandler = () => {
    this.setState({ loading: true })
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Sam',
        email: 'sam@gmail.com'
      }
    };
    // for firebase: need to put .json as suffix of the collection
    axios.post('/orders.json', order)
      .then(response => this.setState({ loading: false, purchased: false }))
      .catch(error => this.setState({ loading: false, purchased: false }));
  }

  render() {
    let disabledInfo = {...this.state.ingredients};

    for (let ingredient in disabledInfo) {
      disabledInfo[ingredient] = disabledInfo[ingredient] <= 0
    }

    let orderSummary = <Spinner />;
    let burger = this.state.error ? <p>No ingredients</p> : <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls
            add={this.addIngredientsHandler}
            remove={this.removeIngredientsHandler}
            price={this.state.totalPrice.toFixed(2)}
            disabledInfo={disabledInfo}
            purchaseable={this.state.purchaseable}
            purchase={this.purchase}
          />
        </Aux>
      )
      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        purchase={this.purchase}
        purchaseCancelled={this.cancelPurchaseHandler}
        price={this.state.totalPrice.toFixed(2)}
        purchaseContinued={this.continuePurchaseHandler}/>;
    }

    if ( this.state.loading ) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={this.state.purchased} closeModal={this.cancelPurchaseHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
