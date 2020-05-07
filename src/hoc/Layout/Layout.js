import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import styles from './Layout.module.css';
import Toolbar from '../../components/UI/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/UI/Navigation/SideDrawer/SideDrawer';

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
