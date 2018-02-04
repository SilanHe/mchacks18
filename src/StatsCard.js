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
		return(
			<div>
			hello
				<ul>
				{(this.props.messages).map(item =>
					<li key={item.id}> {item.text}</li> )}
				</ul>
			</div>
		)
	}

}
export default StatsCard;