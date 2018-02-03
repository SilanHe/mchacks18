import React, { Component } from 'react';
import "./Input.css";
import axios from 'axios';

class Input extends Component{
	constructor(props){
		super(props);
		this.state = {
			exampleData: [],
			value: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	handleChange(event){
		this.setState({value : event.target.value});
	}

	handleSubmit(event){
		axios.get("https://api.ciscospark.com/v1/rooms", {headers: {Authorization: 'Bearer '.concat}}).then(response => {
			const example = response.data.items;
			this.setState({exampleData : example});
			console.log(example);
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
						<input type="text" value={this.state.value} onChange={this.handleChange} />
					</label>
					<input type="submit" value="Submit"/>
				</form>

				<ul>
				{this.state.exampleData.map(item =>
					<li key={item.id}> {item.title}</li>)}
				</ul>
			</div>
		);
	}
}

export default Input;