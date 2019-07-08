'use strict';
import React from 'react';
import C1 from 'pages/course1/index';

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

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
        	   <C1 />
        	</div>
        )
    }

}

export default Test;