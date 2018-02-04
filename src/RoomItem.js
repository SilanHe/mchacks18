import React, { Component } from 'react';
import "./RoomItem.css";
import axios from 'axios';
import { Button } from 'reactstrap';

class RoomItem extends Component{
	constructor(props){
		super(props);

		this.state = {listOfMessages:[]};

		this.handleClick = this.handleClick.bind(this);

	}

	handleClick(){
		console.log("clicked");
	}

	render(){
		return(
            <Button outline onClick={this.handleClick} color="secondary" size="lg" block>{this.props.roomName}</Button>
		)
	}
}

export default RoomItem;