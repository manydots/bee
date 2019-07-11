'use strict';

import React from 'react';
import Tools from 'utils/index';
import LinkTools from 'utils/linkTools';
import './index.scss';

class Header extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      cmd:'login'
    }
  }
  componentDidMount(){
    
  }
  onInputChange(name, val) {
    if (name) {
      this.state = Object.assign({}, this.state, {
        [name]: val
      });
      this.setState(this.state);
    }
  }
 
  render() {

    return (
        <div className='top'>
              这里是Header
        </div>
    );
  }
}
export default Header;
