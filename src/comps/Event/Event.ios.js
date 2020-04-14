import React, {Component} from 'react';
import { AppRegistry, Dimensions, StyleSheet, Text, TextInput,TouchableHighlight, Image, Button, View } from 'react-native';
import LiveEvent from './LiveEvent'
class Event extends React.Component {
	constructor(props){
		super(props)
		

	    this.user = props.user
	    this.styles = StyleSheet.create({
	        container: {},
	        eventContainer: {
	        	backgroundColor: "black",
	        	borderWidth: 3,
	        	borderColor: "#296a5d",
	        	padding:10,
	        	width: Dimensions.get("window").width-40,
	        	borderRadius: 10,
	        	marginTop: 20,
	        	marginBottom:10
	        },
	        eventName:{
	        	color: "#21fc1d",
	        	fontWeight: "bold"
	        },
	        attendees: {},
	        title: {
	        	fontWeight: "bold",
	        	color: "#fff",
	        	marginTop:10,
	        	textAlign: 'center',
	        	fontSize:15
	        },
	        dj: {},
	        join: {
	        	backgroundColor: "#296a5d",
	        	marginTop:10,
	        	borderRadius: 5
	        	
	        },
	        votes:{},
	        input: {
	        	borderWidth: 2,
	        	fontSize:30,
	        	textAlign: 'center',
	        	marginTop:5,
	        	color: "#fff",
	        	backgroundColor: "#000"
	        },
	        live: {
	        	flexDirection: 'column',
	        	justifyContent: 'center',
	        	alignItems: 'center'
	        },
	        buffer: {
	        	width: Dimensions.get("window").width,
	        	flexDirection: 'row',
	        	justifyContent: 'center'
	        },
	        skip: {
	        	width: 250,
	        	height: 250,

	        },
	        touchable: {
	        	width:250,
	        	height:250
	        },
        myEventsContainer: {
        	alignItems:'center',

        },
        myEvents: {
        	width:Dimensions.get('window').width,
        	padding: 10,
        	margin: 5,

        },
        myEventsTitle: {
        	fontWeight: '500',
        	color: '#fff',
        	textAlign: 'center',
        	fontSize:20
        }
    	});
    	this.state = {
			allowed: true,
			event: false,
			eventData: {eventname:"",dj:'',attendees:'',eventname:'',votes:''},
			eventCode: '',
			error:null,
			errorInfo: null,
			update: false,
			events: <View style={this.styles.container}><Text style={this.styles.none}> You are not invited to any events </Text></View>,
			render:true
	    }
	    this.update = this.update.bind(this)
	    this.verifyEventCode = this.verifyEventCode.bind(this)
	    this.handleErrors = this.handleErrors.bind(this)
	    this.updateEventCode = this.updateEventCode.bind(this)
	    this.vote = this.vote.bind(this)
	    this.restrictUser = this.restrictUser.bind(this)
	    this.resetVotes = this.resetVotes.bind(this)
	    this.logout = this.logout.bind(this)
	    
	}
	componentDidMount(){
		
		
	}

	componentDidCatch(error,errorInfo){
		this.setState({error:error,errorInfo:errorInfo})
	}
	handleErrors(response){
		if (!this.reponse.ok){
			throw Error
		}
	}
	update(e){
		var state = e['nativeEvent']['text']
		this.setState({jukecode:state})
	}
	verifyEventCode(){
		var that = this
		fetch("http://localhost:3000/verifyEventCode?jukecode="+this.state.jukecode+"&userid="+this.user.userid, {
			method: "GET",
			headers: {
            	'Accept': 'application/json, text/plain',
            	'Content-Type': 'application/json',
        	}
		})
		.then(this.updateEventCode())
		.then(response => {
			return response.json()} )
		.then(json => {
			if (!json.event){
				alert("Invalid Code")
				return null
			} else {
				that.setState({event:true,eventData:json.event, render:false})
				
			}
			
		})
		
	}
	restrictUser(){
		this.setState({allowed:false})
		setTimeout(function(component){
			console.log("hello im ", component)
			component.setState({allowed:true})
			console.log(component.state.access)
		},5000,this)
	}
	vote(){
		if (!this.state.allowed){
			alert("Wait 5 Minutes for a vote")
			
		} else {
			var query = 'http://localhost:3000/vote?jukecode='+this.state.eventData.jukecode
			console.log(query)
			fetch(query, {
				method: "GET",
				headers:{
					'Accept': 'application/json, text/plain',
			    	'Content-Type': 'application/json',
				}
			})
			this.restrictUser()
			// this.allowed = false
			// setTimeout(function(){
			// 	this.allowed = true
			// }, 5000)
		}
			
	}
	updateEventCode(){

		fetch("http://localhost:3000/updateUserEventCode?jukecode="+this.state.jukecode+"&userid="+this.user.userid,{
				method: "GET",
				headers: {
            		'Accept': 'application/json, text/plain',
            		'Content-Type': 'application/json',
        		},
			}).then(response=>{return response.json()})
			.then(json=>{
				console.log("Succesful Update")
			})
	}
	resetVotes(){
		fetch("http://localhost:3000/reset?jukecode="+this.state.jukecode, {
			method: "GET",
			headers: {
            		'Accept': 'application/json, text/plain',
            		'Content-Type': 'application/json',
        		}
			})
			.then(response=>{return response.json()})
			.then(json=>{
				console.log("Succesful Reset")
			})
		
	}
	logout(){
		this.setState({event:false})
	}
	render(){
		if (!this.state.event){
			return(
				<View>
					<View style={this.styles.eventContainer}>
						<Text style={this.styles.title}>Enter Event Code</Text>
						<TextInput style={this.styles.input} id='eventCode' placeholder="JKBK2020" placeholderTextColor='#2e2e2e' autoCapitalize="characters" onChange={this.update.bind(this)}/>
						<View style={this.styles.join}>
							<Button title="Join Event" color='#fff' onPress={this.verifyEventCode}/>
						</View>
					</View>
				</View>
			)
		}
		if (this.state.event){
			if (this.user.account_type=='host'){
				return (
					<View style={this.styles.live}>
						<LiveEvent props={this.state.eventData} user={this.user}/>
						<View style={this.styles.buffer}>
							<TouchableHighlight style={this.styles.touchable} onPress={this.resetVotes}>
							<Image style={this.styles.skip} source={require('../../../assets/reset.png')}/>
							</TouchableHighlight>
						</View>
						
					</View>
					
				)
			} else {
				return (
				<View style={this.styles.live}>
					<TouchableHighlight onPress={this.logout} style={this.styles.logout}><Image source={require('../../../assets/logout.png')}/></TouchableHighlight>
					<LiveEvent props={this.state.eventData} user={this.user}/>
					<View style={this.styles.buffer}>
						<TouchableHighlight style={this.styles.touchable} onPress={this.vote}>
						<Image style={this.styles.skip} source={require('../../../assets/skip.png')}/>
						</TouchableHighlight>
					</View>
					
				</View>
				
			)
			}
			
		}
	}
}
AppRegistry.registerComponent('Event', () => Event);
export default Event