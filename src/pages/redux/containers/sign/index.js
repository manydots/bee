'use strict';

import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/home';

class Home extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          type:'sigintrue'
      }
  }
  componentDidMount(){
     const {dispatch} = this.props;
     dispatch(actions.upData({type:'cmd',number:1000}));
  }
  render() {
    console.log(this.props);
    return (
      <div className="taocard">
          redux内容Test 
      </div>
    );
  }
}

export default connect((state) => {
    return state;
})(Home);