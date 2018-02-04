import React, { Component } from 'react';
import "./StatsCard.css";
import axios from 'axios';
import {BarChart} from 'react-easy-chart';
import FrequencyGraph from './FrequencyGraph';

class StatsCard extends Component{
	constructor(props){
		super(props);
		this.state= {
            wordCount: {},
            sortedWordCount: []
        };
	}


	render(){
		return(
			<div>
				<ul>
				{(this.props.messages).map(item =>
					<li key={item.id}> {item.text}</li> )}
				</ul>
				<FrequencyGraph sortedWordCount={this.props.sortedWordCount}/>
			</div>
		)
	}
}
export default StatsCard;