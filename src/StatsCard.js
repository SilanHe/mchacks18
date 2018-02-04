import React, { Component } from 'react';
import "./StatsCard.css";
import axios from 'axios';

class StatsCard extends Component{
	constructor(props){
		super(props);
	}

	activeUsers(){

	}

	render(){
		console.log(this.props.users);
		console.log(Object.entries(this.props.users));
		return(
			<div>
			hello
				<ul>
				{Object.entries(this.props.users).map(item =>
					<li key={item[0]}> {item[0] + " " + item[1]}</li> )}
				</ul>
			</div>
		)
	}

}
export default StatsCard;