import React from 'react';
import Aux from '../../hoc/Aux/Aux';
import styles from './Layout.module.css';
import Toolbar from '../UI/Navigation/Toolbar/Toolbar';
import SideDrawer from '../UI/Navigation/SideDrawer/SideDrawer';

const layout = (props) => {
  return (
    <Aux>
      <SideDrawer />
      <Toolbar />
      <main className={styles.Content}>{props.children}</main>
    </Aux>
  );
};

export default layout;
