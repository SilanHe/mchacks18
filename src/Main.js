import React, { Component } from 'react';
import "./Main.css";
import axios from 'axios';
import RoomItem from './RoomItem'
import Header from './Header'
import StatsCard from './StatsCard'
import Footer from './Footer'
import Graph from './Graph'
import { Nav, NavItem,  Container, Row, Col, Form, Input, Fade, Jumbotron, InputGroup, Button, InputGroupAddon } from 'reactstrap';


class Main extends Component{
	constructor(props){
		super(props);
		this.state = {
			exampleData: [],
			value: '',
			dataToDisplay: false,
			curRoomId: 0,
			roomMessages: {}
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleRoomClick = this.handleRoomClick.bind(this);
	}


	handleChange(event){
		this.setState({value : event.target.value});
	}

	handleSubmit(event){
		var example;
		var all_messages = []
		var roomMessages = {}
		axios.get("https://api.ciscospark.com/v1/rooms", {headers: {Authorization: 'Bearer '.concat(this.state.value)}}).then(response => {
			example = response.data.items;
			this.setState({exampleData : example});
			var count = 0
	    	for (var i = 0; i < example.length; i++){
		    	var roomId = example[i].id
		    	axios.get("https://api.ciscospark.com/v1/messages?roomId=".concat(roomId), {headers: {Authorization: 'Bearer '.concat(this.state.value)}}).then(response => {
					const messages = response.data.items;
					roomId = example[count].id
					count ++;
					all_messages = all_messages.concat(messages);
					roomMessages[roomId] = messages;
					if(count == (example.length)){
						console.log(i)
						this.setState({ listOfMessages: all_messages, roomMessages: roomMessages})	
					}
				})
				.catch(error =>{
					console.log('error 3 ' + error);
				});
			}	
		})
		.catch((error =>{
			console.log('error 3 ' + error);
		}));

		event.preventDefault();
	}

	handleRoomClick(e){
		this.setState({curRoomId: e, dataToDisplay: true});
	}


	render(){
		var statsCard = <StatsCard messages={this.state.roomMessages[(this.state.curRoomId)]} />
		return(
			<div className='gray'>
				<Fade>
					<Header />
				</Fade>
				<Jumbotron className='lightgray'>
					<Fade>
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
					</Fade>
					<hr/>
					<Fade>
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
					</Fade>
				</Jumbotron>
				<div className='gray'>
					<Container>
						<Row>
							<Col xs="3">
								<Nav vertical>
                                    {this.state.exampleData.map(item =>
										<NavItem key={item.id}> <RoomItem handleClick={this.handleRoomClick.bind(this, item.id)} roomName={item.title} roomId={item.id} authToken={this.state.value} /></NavItem>)}
								</Nav>
							</Col>
							<Col xs="9">

							</Col>
						</Row>
					</Container>
				</div>
				{this.state.dataToDisplay? statsCard : null}
				<Fade>
					<Footer />
				</Fade>
			</div>
		);
	}
}

export default Main;