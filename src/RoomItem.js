import React, { Component } from 'react';
import "./RoomItem.css";
import axios from 'axios';
import { Button } from 'reactstrap';
import StatsCard from './StatsCard';

class RoomItem extends Component{
	constructor(props){
		super(props);

		this.state = {listOfMessages:[], dataToDisplay: false, users: {}};

		this.callbackFunc = this.callbackFunc.bind(this);

	}

	callbackFunc(response) {
    // do something with the response
    	console.log(response);
	}



	render(){
		return(
			<div>
				<Button outline onClick={this.props.handleClick} color="secondary" size="lg" block>{this.props.roomName}</Button>		 
			</div>
		)
	}
}

export default RoomItem;