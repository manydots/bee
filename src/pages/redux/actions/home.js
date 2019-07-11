'use strict';

// constants 与 actions 在一起
import { nameSpace} from 'utils/index';
let ns = nameSpace('HOME');
export const UP_DATA = ns('UP_DATA');

export function upData(data) {
  return (dispatch) => {
    dispatch({
      type: UP_DATA,
      data: data
    });
  };
}


