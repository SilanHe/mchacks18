import React, { Component } from 'react';
import "./Input.css";
import axios from 'axios';
import RoomItem from './RoomItem'


class Input extends Component{
	constructor(props){
		super(props);
		this.state = {
			exampleData: [],
			authToken: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	handleChange(event){
		this.setState({authToken : event.target.value});
	}

	handleSubmit(event){
		axios.get("https://api.ciscospark.com/v1/rooms", {headers: {Authorization: 'Bearer '.concat(this.state.authToken)}}).then(response => {
			const example = response.data.items;
			this.setState({exampleData : example});
		})
		.catch((error =>{
			console.log('error 3 ' + error);
		}));
    	event.preventDefault();
	}

	render(){
		
		return(
			<div>
				<form onSubmit={this.handleSubmit}>
					<label>
						User token:
						<input type="text" value={this.state.authToken} onChange={this.handleChange} />
					</label>
					<input type="submit" value="Submit"/>
				</form>

				<ul>
				{this.state.exampleData.map(item =>
					<li key={item.id}> <RoomItem roomName={item.title} roomId={item.id} authToken={this.state.authToken} /></li>)}
				</ul>
			</div>
		);
	}
}

export default Input;