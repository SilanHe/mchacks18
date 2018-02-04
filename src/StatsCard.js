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

	render(){
		this.countMessages();
		return(
			<div>
				<ul>
				{(this.props.messages).map(item =>
					<li key={item.id}> {item.personEmail}</li> )}
				</ul>
				<hr/>
				<h4>Most Frequently Used Words</h4>
				<FrequencyGraph sortedWordCount={this.props.sortedWordCount}/>
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