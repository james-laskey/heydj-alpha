import React, {Component, useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';
import LinearGradient from 'react-native-linear-gradient';
import { AppRegistry, Dimensions, StyleSheet, FlatList, Text, Button, View, ScrollView, TouchableHighlight, Screen, Image } from 'react-native';
class LiveEvent extends React.Component {
	constructor(props){
		super(props)
		this.user = props.user
		this.state = {
			eventData :props.props
	    }
	    
	    
	    this.styles = StyleSheet.create ({
			container: {
				flexDirection: 'column',
				justifyContent: "center",
			},
			vipContainer: {

			},
			eventContainer:{
				flexDirection: 'column',
				justifyContent: "center",
		    	borderWidth: 3,
		    	borderColor: "white",
		    	padding:10,
		    	width: Dimensions.get("window").width-20,
		    	borderRadius: 10,
		    	margin: 20,


			},
			suggestionContainer: {
				borderWidth: 1,
				borderColor: "#21fc1d",
				borderRadius: 10,
				marginTop: 20,
				padding: 8,
				height: 150,
				backgroundColor: 'black'

			},
			eventName: {
				textAlign: "center",
				color: "#fff",
				fontSize:15,
				fontWeight: "bold"
			},
			dj: {
				textAlign: "center",
				color: '#06b503',
			},
			artist: {
				color: "#ff9",
				marginLeft: 10
			},
			attendees: {
				textAlign: "center",
				color: "#fff"
			},
			button: {
				width: 20,
		    	height:20,
		    	borderRadius: 500,
		    	backgroundColor: "#296a5d",
		    	marginLeft: "auto"
			},
			remove: {
				position:'absolute',
				color: 'white',
				fontSize: 15,
				textAlign:'center',
				top:-1,
				left:6
			},
			flatList: {
				flexDirection:'row',
				alignItems: 'stretch',
				marginBottom: 5,
			},
			suggestion: {
				color: '#fff',
				fontWeight: "400",
				fontSize:13
			},
			votes: {
				textAlign: "center",
				color: "#fff"
			},
			voteView: {
				flexDirection: "row",
				justifyContent: "flex-start",
				marginTop:5,
				borderWidth: 2,
				borderColor: "#296a5d",
				borderRadius: 5,
				width: 330
			},
			nilmax: {
				borderRadius: 5,
				borderColor: "#2e2e2e",
				borderWidth:3,
				width: Dimensions.get('window').width/6,
				padding:1
			},
			votemax: {
				borderRadius: 5,
				borderColor: "#296a5d",
				borderWidth:3,
				width: Dimensions.get('window').width/7,
				padding:1
			}
	    });
		    this.populate = this.populate.bind(this)
		    this.checkLocation = this.checkLocation.bind(this)
		    this.findProgress = this.findProgress.bind(this)
		    this.findMaxStyle = this.findMaxStyle.bind(this)
		    this.updateMax = this.updateMax.bind(this)
		}
	checkLocation(){
		return true
	}
	populate(songs){
		var suggestions = []
		for ( var song in songs) {
			var suggestion = [(Number(song)+1)+'. '+songs[song][0],songs[song][1]]
			suggestions[song] = suggestion
		}
		return suggestions
	}
	goLive(){

	}
	findProgress(){
		var progress = this.state.eventData.votes*330
		var width = progress/this.state.eventData.votemax
		console.log(width)
		return width
	}
	findMaxStyle(max){
		if(max==15 && this.state.eventData.votemax==15){
			return this.styles.votemax
		}
		if(max==25 && this.state.eventData.votemax==25){
			return this.styles.votemax
		}
		if(max==50 && this.state.eventData.votemax==50){
			return this.styles.votemax
		}
		if(max==100&& this.state.eventData.votemax==100){
			return this.styles.votemax
		}
		if(max==250 && this.state.eventData.votemax==250){
			return this.styles.votemax
		}
		if(max==500 && this.state.eventData.votemax==500){
			return this.styles.votemax
		}
		else {
			return this.styles.nilmax
		}
	}
	updateMax(newMax){

	}
	componentDidMount(){
		var that = this;
		Geolocation.getCurrentPosition(info => {
			console.log(info)
			if(!this.checkLocation(info)){
				//return Event for currentCoords
			} else {

			}
		});

		alert("Welcome to "+this.state.eventData.eventname)
		//console.log(this.state.eventData)
		setInterval(function(caller){
			var event = caller.state.eventData
			fetch('http://localhost:3000/eventfeed?jukecode='+event.jukecode, {
				method: "GET",
				headers:{
					'Accept': 'application/json, text/plain',
		    		'Content-Type': 'application/json',
				}
			})
			.then(response=>{return response.json()})
			.then(json=>{

				// console.log(that.state.eventData.votes)
				caller.setState({eventData:json.event})
				console.log(caller.state.eventData.votes)
			})
		}, 2000,this)
	}
	render(){
		if (this.user.account_type=='host'){
			return (

		<View>
			<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#2e2e2e', '#000']} style={this.styles.eventContainer}>
				<Text style={this.styles.eventName}>{this.state.eventData.eventname}</Text>
				<Text style={this.styles.dj}>{"DJ: "+this.state.eventData.dj}</Text>
				<View style={this.styles.voteView}>
					<View style={{width:this.findProgress(), backgroundColor:"#fff",height:10, flexDirection:'row', justifyContent:'flex-start',borderRadius:2}}></View>
				</View>
			</LinearGradient>
			<View style={{flexDirection:'row', justifyContent:'center'}}>
				<View style={this.findMaxStyle(15)}>
				<Button onPress={this.updateMax.bind(this,15)} title='15' color="#fff"/>
				</View>
				<View style={this.findMaxStyle(25)}>
					<Button onPress={this.updateMax.bind(this,25)} title='25' color="#fff"/>
				</View>
				<View style={this.findMaxStyle(50)}>
					<Button onPress={this.updateMax.bind(this,50)} title='50' color="#fff"/>
				</View>
				<View style={this.findMaxStyle(100)}>
					<Button onPress={this.updateMax.bind(this,100)} title='100' color="#fff"/>
				</View>
				<View style={this.findMaxStyle(250)}>
					<Button onPress={this.updateMax.bind(this,250)} title='250' color="#fff"/>
				</View>
				<View style={this.findMaxStyle(500)}>
					<Button onPress={this.updateMax.bind(this,500)} title='500' color="#fff"/>
				</View>
				</View>
			
		</View>
		)
		} else {
			return (
				<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#2e2e2e', '#000']} style={this.styles.eventContainer}>
				<Text style={this.styles.eventName}>{this.state.eventData.eventname}</Text>
				<Text style={this.styles.dj}>{"DJ: "+this.state.eventData.dj}</Text>
				<View style={this.styles.voteView}>
					<View style={{width:this.findProgress(), backgroundColor:"#fff",height:10, flexDirection:'row', justifyContent:'flex-start',borderRadius:2}}></View>
				</View>
			</LinearGradient>
				)
		}
		
	}
}
AppRegistry.registerComponent('LiveEvent', () => LiveEvent);
export default LiveEvent
/*<View style={styles.suggestionContainer}>
			<FlatList key={props.props.suggestionlist}  data={populate(props.props.suggestionlist)} renderItem={({item})=>(<View style={styles.flatList}>
					<Text style={styles.suggestion}>{item[0]}</Text>
					<Text style={styles.artist}>{'by '+item[1]}</Text>
					<TouchableHighlight onPress={suggest.bind(props.props, item[0])} style={styles.button}>
						<Text style={styles.remove}>x</Text>
					</TouchableHighlight>
				</View>)} keyExtractor={item => item[0]}/>
		</View>*/
