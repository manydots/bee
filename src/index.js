'use strict';
import React from 'react';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activityId: 797445,
            name: '太阳'

        };

        
    }
    componentWillMount() {

        
    }
    componentDidMount() {
        //params data
     
    }
    shouldComponentUpdate() {
        return true;
    }
    render() {

        return (
        	<div>
        	   当前数字:{this.state.activityId}，{this.state.name}
        	</div>
        )
    }

}

export default App;