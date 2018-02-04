import React, { Component } from 'react';
import "./StatsCard.css";
import axios from 'axios';
import {BarChart} from 'react-easy-chart';
import {PieChart} from 'react-easy-chart';
import {ToolTip} from 'react-easy-chart';
import FrequencyGraph from './FrequencyGraph';


class StatsCard extends Component{
	constructor(props){
		super(props);
		this.state= {
            wordCount: {},
            sortedWordCount: []
        };

        this.mouseOverHandler = this.mouseOverHandler.bind(this);
        this.mouseOutHandler = this.mouseOutHandler.bind(this);
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
	}



	mostPosts() {
		var users = [];
		var messages = [];
		console.log(this.props.messages);
		var everything = this.props.messages;
		for (var i=0; i<everything.length; i++) {
			//contains the users
			if (users.indexOf(everything[i].personEmail) != -1) {
				messages[users.indexOf(everything[i].personEmail)]++;
			}
			//doesn't contain the user
			else {
				users.push(everything[i].personEmail);
				messages[users.indexOf(everything[i].personEmail)] = 1;
			}
		}
		console.log(messages);
		console.log(users);
		var maxMessages = Math.max(...messages);
		var userMax = users[indexOfMax(messages)];

		//user with the ost messages + message#
		console.log(userMax + " " + maxMessages);

		
		function indexOfMax(arr) {
		    if (arr.length === 0) {
		        return -1;
		    }

		    var max = arr[0];
		    var maxIndex = 0;

		    for (var i = 1; i < arr.length; i++) {
		        if (arr[i] > max) {
		            maxIndex = i;
		            max = arr[i];
		        }
		    }

		    return maxIndex;
		}

	}

	

	countMessages() {
		var users = [];
		var messages = [];
		console.log(this.props.messages);
		var everything = this.props.messages;
		for (var i=0; i<everything.length; i++) {
			//contains the users
			if (users.indexOf(everything[i].personEmail) != -1) {
				messages[users.indexOf(everything[i].personEmail)]++;
			}
			//doesn't contain the user
			else {
				users.push(everything[i].personEmail);
				messages[users.indexOf(everything[i].personEmail)] = 1;
			}
		}
		console.log(messages);
		console.log(users);

		var obj = [];

		for (var i = 0; i < users.length; i++) {
		    //or check with: if (b.length > i) { assignment }
		    var temp = {};
		    temp["key"] = users[i];
		    temp["value"] = messages[i];
		    obj.push(temp);
		}
		console.log(obj);
		return obj;

		
	}

	mouseOverHandler(d, e) {
	    this.setState({
	      showToolTip: true,
	      top: e.y,
	      left: e.x,
	      value: d.value,
	      key: d.data.key});
	  }

	  mouseMoveHandler(e) {
	    if (this.state.showToolTip) {
	      this.setState({top: e.y, left: e.x});
	    }
	  }

	  mouseOutHandler() {
	    this.setState({showToolTip: false});
	  }

	  createTooltip() {
	    if (this.state.showToolTip) {
	      return (
	        <ToolTip
	          top={this.state.top}
	          left={this.state.left}
	        >
	          The value of {this.state.key} is {this.state.value}
	        </ToolTip>
	      );
	    }
	    return false;
	  }

	render(){
		this.countMessages();
		var tooltip = (<div> {this.state.key} sent {this.state.value} messages</div>);
		return(
			<div>
				<ul>
				{(this.props.messages).map(item =>
					<li key={item.id}> {item.personEmail}</li> )}
				</ul>

				<FrequencyGraph sortedWordCount={this.props.sortedWordCount}/>
			
				

				<PieChart
				    // labels
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
				    data={
				      this.countMessages()}
				    mouseOverHandler={this.mouseOverHandler}
    				mouseOutHandler={this.mouseOutHandler.bind(this)}
    				mouseMoveHandler={this.mouseMoveHandler.bind(this)}
				    margin={{top: 10, bottom: 10, left: 200, right: 100}}
				    ></PieChart>
				    {this.state.showToolTip? tooltip : 'Click on a segment to show the value'}
				    <div>{document.getElementById('location')}</div>
			</div>
		)
	}



	contains(a, obj) {
	    var i = a.length;
	    while (i--) {
	        if (a[i] === obj) {
	            return true;
	        }
	    }
	    return false;
	}
}
export default StatsCard;