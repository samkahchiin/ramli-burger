import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../../Logo/Logo';
import classes from './SideDrawer.module.css';
import Aux from '../../../../hoc/Aux/Aux';
import Backdrop from '../../Backdrop/Backdrop';

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];

  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={props.open} closeModal={props.close}/>
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
}

export default sideDrawer;
