import React, { Component } from 'react';
import "./StatsCard.css";
import {AreaChart} from 'react-easy-chart';
import {Legend} from 'react-easy-chart';

class StatsCard extends Component{
	constructor(props){
		super(props);
	}

	render(){
		console.log(this.props.usersOverTime);
		return(
			<div>
			<AreaChart xType={'text'} axes width={1000} height={500} data={this.props.usersOverTime}/>
			<Legend data={this.props.usersOverTime} dataId={'type'} horizontal />
			</div>
		)
	}

}
export default StatsCard;