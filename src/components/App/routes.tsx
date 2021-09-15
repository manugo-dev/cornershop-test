/* eslint-disable @typescript-eslint/naming-convention */
import { lazy } from 'react';

import PATHS from './paths';

const Welcome = lazy(() => import('screens/Welcome'));
const Counters = lazy(() => import('screens/Counters'));
const Cookbook = lazy(() => import('screens/Cookbook'));

export default [
  {
    exact: true,
    path: PATHS.counters,
    component: Counters
  },
  {
    exact: true,
    path: PATHS.cookbook,
    component: Cookbook
  },
  {
    exact: false,
    path: PATHS.home,
    component: Welcome
  }
];
