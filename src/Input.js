import React, { Component } from 'react';
import "./Input.css";
import axios from 'axios';

class Input extends Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		axios.get("https://api.ciscospark.com/v1/rooms", {headers: {Authorization: 'Bearer ZmRhZWZlYzYtYTVlZC00YWZiLWJlOTgtOTA0MGY3ODExODBmMDRhMDlmOGYtMmI2'}}).then(response => {
			console.log(response.data);
		})
		.catch((error =>{
			console.log('error 3 ' + error);
		}));
	}

	render(){
		return(
			<div>
			hello
			</div>
		);
	}
}

export default Input;