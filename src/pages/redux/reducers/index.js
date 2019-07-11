'use strict';

import { combineReducers } from 'redux';
import Home from './home/index';
import { routerReducer } from 'react-router-redux';


// 将现有的reduces加上路由的reducer
const rootReducer = combineReducers({
  Home,
  routing: routerReducer
});

export default rootReducer;
