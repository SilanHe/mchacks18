import React, { Component } from 'react';
import "./Main.css";
import axios from 'axios';
import RoomItem from './RoomItem'
import Header from './Header'
import StatsCard from './StatsCard'
import Footer from './Footer'
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
		this.msgesOverTime = this.msgesOverTime.bind(this);
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
			var count = 0
			var promises = []
	    	for (var i = 0; i < example.length; i++){
		    	var roomId = example[i].id
		    	promises.push(axios.get("https://api.ciscospark.com/v1/messages?max=10000&roomId=".concat(roomId), {headers: {Authorization: 'Bearer '.concat(this.state.value)}}));
			}
			axios.all(promises).then(results => {
				results.forEach(response => {
					const messages = response.data.items;
					var newRoomId = example[count].id
					count ++;
					all_messages = all_messages.concat(messages);
					roomMessages[newRoomId] = messages;
					if(count == (example.length)){	
					}
				})
				console.log(roomMessages);
				this.setState({ listOfMessages: all_messages, roomMessages: roomMessages, exampleData: example});

			})
		})
		.catch((error =>{
			console.log('error 3 ' + error);
		}));

		event.preventDefault();
	}

	handleRoomClick(e){
		this.setState({curRoomId: e, dataToDisplay: true});

		this.msgesOverTime(true, this.state.roomMessages[e]);
	}

	msgesOverTime(isHour, messages){
		console.log(messages);
		if (messages === undefined || messages.length == 0){
		}else{
			console.log(messages);
			var firstTime = new Date(messages[messages.length - 1].created).getTime()
			var interval = isHour? 3600000 : 86400000;
			var intervalNumber = 1;
			var userMessages = {};
			var userTotals = {};
			for (var i = messages.length - 1; i >= 0; i--){
				const email = messages[i].personEmail;
				if ((new Date(messages[i].created).getTime() - firstTime - (intervalNumber*interval)) > 0){

					intervalNumber += 1;
				}
				userMessages[intervalNumber]
				if (email in userMessages){
					userTotals[email] += 1;
					userMessages[email][intervalNumber] = userTotals[email];
					
				}else{
					userTotals[email] = 1;
					userMessages[email] = {}
					userMessages[email][intervalNumber] = 1;
				}
			}

			for (var e in userMessages){
				userMessages[e][intervalNumber] = userTotals[e];
			}

			var formattedData = {};
			for (var user in userMessages){
				formattedData[user] = []
			}

			var options = {  
	    		year: "numeric", month: "short",  
	    		day: "numeric", hour: "2-digit", minute: "2-digit" 
			}; 
			for (var user in userMessages){
				for (var intNum in userMessages[user]){
					const xDate = new Date(new Date((intNum - 1) * interval).getTime() + firstTime)
					const xCoord = xDate.toLocaleTimeString("en-us", options);
					formattedData[user].push({x: xCoord, y: userMessages[user][intNum]});
				}
			}
			var graphData = []
			for ( var user in formattedData){
				graphData.push(formattedData[user]);
			}
			this.setState({graphData : graphData.slice(0,5)})
		}
	}


	render(){
		var statsCard = <StatsCard usersOverTime={this.state.graphData} />
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