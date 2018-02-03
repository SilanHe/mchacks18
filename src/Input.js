import React, { Component } from 'react';
import "./Input.css";
import axios from 'axios';

class Input extends Component{
    constructor(props) {
        super(props);
        this.state = {
        	value: '',
			response: '',
			exampleData: ''
		}
		;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A token was submitted: ' + this.state.value);
        event.preventDefault();
        this.componentDidMount()
    }

	componentDidMount(){
		axios.get("https://api.ciscospark.com/v1/rooms", {headers: {Authorization: 'Bearer ZmRhZWZlYzYtYTVlZC00YWZiLWJlOTgtOTA0MGY3ODExODBmMDRhMDlmOGYtMmI2'}}).then(response => {
			console.log(response.data);
			this.state.response = response.data

			//miguel
            const example = response.data.items;
            this.setState({exampleData : example});

		})
		.catch((error =>{
			console.log('error 3 ' + error);
		}));
	}

    render() {
        return (
			<form onSubmit={this.handleSubmit}>
				<label>
					User Token:
					<input type="text" value={this.state.value} onChange={this.handleChange} />
				</label>
				<input type="submit" value="Submit" />
			</form>
        );
    }
}

export default Input;