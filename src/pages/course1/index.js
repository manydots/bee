'use strict';
import React from 'react';



class Base extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

        
    }
    componentWillMount() {

        
    }
    componentDidMount() {
        //base
     
    }
    shouldComponentUpdate() {
        return true;
    }
    render() {

        return (
        	<div>
        	   test11
        	</div>
        )
    }

}

export default Base;