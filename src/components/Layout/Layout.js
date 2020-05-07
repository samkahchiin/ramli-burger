import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import styles from './Layout.module.css';
import Toolbar from '../UI/Navigation/Toolbar/Toolbar';
import SideDrawer from '../UI/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  toggleSideDrawerHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  }

  closeSideDrawerHandler = () => {
    this.setState({
      showSideDrawer: false
    });
  }

  render() {
    return (
     <Aux>
       <SideDrawer
         open={this.state.showSideDrawer}
         close={this.closeSideDrawerHandler}/>
       <Toolbar toggleSideDrawer={this.toggleSideDrawerHandler}/>
       <main className={styles.Content}>{this.props.children}</main>
     </Aux>
   );
  }
}

export default Layout;
