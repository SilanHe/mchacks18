import React, { Component } from 'react';
import "./Main.css";
import axios from 'axios';
import RoomItem from './RoomItem'
import Header from './Header'
import { Nav, NavItem, NavLink,  Container, Row, Col, Form, Label, Input, Fade, Jumbotron, InputGroup, Button, InputGroupAddon } from 'reactstrap';


class Main extends Component{
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
		axios.get("https://api.ciscospark.com/v1/rooms", {headers: {Authorization: 'Bearer '.concat(this.state.value)}}).then(response => {
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
			<div >
				<Header />
				<Jumbotron className='lightgray'>
					<a href="/">
						<h1 className='center'>Sparks Stats</h1>
					</a>
					<a href="/">
						<Container>
							<Row>
								<Col xs="5"/>
								<Col xs="2">
									<img src={require('./spark-logo.png')} width='150' height='150' />
								</Col>
								<Col xs="5"/>
							</Row>
						</Container>
					</a>
					<h3 className='center'>Analyze a Cisco Sparks User</h3>
					<hr/>
					<Container >
						<Row>
							<Col xs="2"/>
							<Col xs="8">
								<Form onSubmit={this.handleSubmit}>
									<InputGroup >
										<InputGroupAddon addonType="prepend" color="info">User Token</InputGroupAddon>
										<Input type="text" placeholder='Enter your user token please' value={this.state.value} onChange={this.handleChange} />
										<Button color="info" type="submit" value="Submit">Submit</Button>
									</InputGroup>
								</Form>
							</Col>
							<Col xs="2"/>
						</Row>
					</Container>
				</Jumbotron>
				<div className='lightblue'>
					<Container>
						<Row>
							<Col xs="3">
								<Nav vertical>
                                    {this.state.exampleData.map(item =>
										<NavItem key={item.id}> <RoomItem roomName={item.title} roomId={item.id} authToken={this.state.value} /></NavItem>)}
								</Nav>
							</Col>
							<Col xs="9">

							</Col>
						</Row>
					</Container>
				</div>
			</div>
		);
	}
}

export default Main;