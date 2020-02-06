import * as React from 'react';
import { Grid } from '@material-ui/core';

import { SERVICES, WORKPLACES, RUN } from './constants'
import Services from './services'
import Workplaces from './workplaces'
import Runs from './runs'


interface MenuContentSwitcherProps {
  type: string;
}

export const MenuContentSwitcher: React.FC<MenuContentSwitcherProps> = ({ type }) => {
  switch (type) {
    case SERVICES:
      return <Services />
    case WORKPLACES:
      return <Workplaces />
    case RUN:
      return <Runs />
    default:
      break;
  }
}