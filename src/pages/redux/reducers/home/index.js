'use strict';

import * as actions from '../../actions/home.js';

// 对页面prop 数据进行管理
const initialState = {
  type:'test',
  number:0
};
const defaultAction = {
  type: 'None',
  number:0
};

export default function sidemenu(state = initialState, action = defaultAction) {

  switch (action.type) {

    case actions.UP_DATA:

      return Object.assign({}, state, {
        type: action.data.type,
        number: action.data.number
      });

    default:
      return state;
  }
}
