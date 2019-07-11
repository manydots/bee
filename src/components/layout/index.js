'use strict';

import React from 'react';
import Header from 'components/header/index';
import SideMenu from 'components/side-menu/index';
import classnames from 'classnames';
import './index.scss';

class Layout extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      folden: false
    }
  }
  shouldComponentUpdate(state) {
      return true; 
  }
  componentDidMount(){
    let self = this;
  }
  componentWillMount(){

  }
  componentDidUpdate(state){
      //console.log(state)
  }
  onMenuFolden(flag){
    this.setState({
      folden: flag
    })
  }
  render() {
    let {folden} = this.state;
    let className = classnames({
      "right-content": true,
      "right-content-full": !folden
    });
    return (
  
      <div className="main container">
        <Header />
        <div className="main-content">
          <SideMenu />
          <div className={className}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
