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
    	console.log(this.state)
        return (
        	<div>
        	  当前数字:{this.state.activityId}
        	</div>
        )
    }

}

export default App;