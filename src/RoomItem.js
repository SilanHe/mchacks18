import React, { Component } from 'react';
import "./RoomItem.css";
import axios from 'axios';

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
			<button onClick={this.handleClick}>
			 {this.props.roomName}
			 </button>
		)
	}
}

export default RoomItem;