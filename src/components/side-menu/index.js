'use strict';

import React from 'react';
import classnames from 'classnames';
import LinkTools from 'utils/linkTools';
import './index.scss';

class SideMenu extends React.Component {

  render() {
    let className = classnames({
      "left-menu": true
    });
    return (
      <div className={className}>
        侧边导航Test
      </div>
    );
  }
}

export default SideMenu;
