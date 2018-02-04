import React, { Component } from 'react';
import "./Graph.css";
import {BarChart} from 'react-easy-chart';
import {PieChart} from 'react-easy-chart';


class Graph extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div>
			hello
			<PieChart
			    labels
			    styles={{
			      '.chart_lines': {
			        strokeWidth: 0
			      },
			      '.chart_text': {
			        fontFamily: 'serif',
			        fontSize: '1.25em',
			        fill: '#333'
			      }
			    }}
			    data={[
			      {key: 'A', value: 100, color: '#aaac84'},
			      {key: 'B', value: 200, color: '#dce7c5'},
			      {key: 'C', value: 50, color: '#e3a51a'}
			    />
			</div>
		);
	}
}

export default Graph;