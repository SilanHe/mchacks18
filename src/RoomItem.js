import React, { Component } from 'react';
import "./RoomItem.css";
import axios from 'axios';
import { Button } from 'reactstrap';
import StatsCard from './StatsCard';

class RoomItem extends Component{
	constructor(props){
		super(props);

		this.state = {listOfMessages:[], dataToDisplay: false, users: {}};

		this.handleClick = this.handleClick.bind(this);
		this.callbackFunc = this.callbackFunc.bind(this);

	}

	callbackFunc(response) {
    // do something with the response
    	console.log(response);
	}


	handleClick(){
		axios.get("https://api.ciscospark.com/v1/messages?roomId=".concat(this.props.roomId), {headers: {Authorization: 'Bearer '.concat(this.props.authToken)}}).then(response => {
			const example = response.data.items;
			var users = {}
			for (var i = 0; i < example.length; i++){
				if (example[i].personEmail in users){
					users[example[i].personEmail] = users[example[i].personEmail] + 1;
				}else{
					users[example[i].personEmail] = 1;
				}
			}
			this.setState({dataToDisplay: true, listOfMessages : example, users: users});
		})
		.catch(error =>{
			console.log('error 3 ' + error);
		});
	}

	activeUsers(){
		var users = {}
		for (var i = 0; i < this.state.listOfMessages.length; i++){
			users[this.state.listOfMessages[i].personEmail] = 1;
		}
	}

	render(){
		var statsCard = (
			<StatsCard  users={this.state.users} />
		);
		return(
			<div>
				<Button outline onClick={this.handleClick} color="secondary" size="lg" block>{this.props.roomName}</Button>

			{this.state.dataToDisplay ? statsCard : null}
			 
			</div>
		)
	}
}

export default RoomItem;