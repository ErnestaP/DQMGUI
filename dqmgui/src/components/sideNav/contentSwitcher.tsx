import * as React from 'react';
import { Grid } from '@material-ui/core';

import { SERVICES, WORKPLACES, RUN } from '../constants'
import Services from '../activeTabs/services'
import Workplaces from '../activeTabs/workplaces'
import Runs from '../activeTabs/runs'
import NotSetted from '../activeTabs/notSetteed'


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
    case '':
      return <NotSetted />
    default:
      break;
  }
}