'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from 'components/layout/index';
import Sign from './containers/sign/index';

let pageTitle = document.title;

/**
 * menu 选中态map,其中value为side-menu组件中的itemid
 */
//左侧必须与路由一致
const menuMap = {
  '/index': 'taocard-sign',
  '/smsCheck':'taocard-smsCheck',
  '/sales':'taocard-sales',
  '/manual':'taocard-manual',
  '/smsR':'taocard-smsR',
  '/Log':'taocard-Log',
  '/Logs':'taocard-Logs',
  '/Recharge':'taocard-Recharge',
  '/seller':'taocard-seller',
  '/temple':'taocard-temple'
}

const onRouteEnter = (nextState, replace, callback) => {
  callback();
  //根据路由设置菜单选中
  document.title = nextState.routes[1].title || pageTitle;
  let routePath = nextState.location.pathname;
  window.selectedMenuKey = menuMap[routePath];
};
const onRouteChange = (prevState, nextState, replace, callback) => {
  callback();
  document.title = nextState.routes[1].title || pageTitle;
  
    //根据路由设置菜单选中
  let routePath = nextState.location.pathname;
  window.selectedMenuKey = menuMap[routePath];
};

export default (<Route path="/" component={Layout} onEnter={onRouteEnter} onChange={onRouteChange}>
  <Route path="index" component={Sign} title="签名审核" />
  <IndexRoute component={Sign}/>
  <Route path="*" component={Sign}/>
</Route>);
