import React, {Component} from 'react';
import MapboxGL from "@react-native-mapbox-gl/maps";
MapboxGL.setAccessToken('pk.eyJ1Ijoiamxhc2trIiwiYSI6ImNrMzk3eHQxODAwMnEzbm54MWpwejlja2QifQ.cvAwurFClMg1HLpIXGoHgA');
import { AppRegistry, Animated, Dimensions, StyleSheet, Text, TextInput, Button, TouchableHighlight, View, ScrollView, Image} from 'react-native';
class PlaygroundAnnotation extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			activeAnnotationIndex: -1,
      		previousActiveAnnotationIndex: -1,
      		requestToggle: false
	    }
	    this.title = props.title
	    this.coordinate = props.coordinate
	    this.annotationId = props.id
	    this.user = props.user
	    this._map = props.map 
	    this.details = props.details
	    this.styles = StyleSheet.create({
        container: {},
        callout: {
        	height: 200,
        	backgroundColor: "black",
        	borderWidth: 3,
        	borderColor: "#296a5d",
        	width: 300,
        	padding: 10,
        	marginBottom: 10,
        	borderRadius: 5
        },
        text: {
        	color: 'white',
        	textAlign: 'justify'
        },
        title: {
        	fontWeight:'500',
        	color: "white",
        	textAlign: "center",
        	fontSize: 18
        },
        date: {
        	fontWeight: "300",
        	color: "#13ff0f",
        	textAlign: 'center'
        },
        host: {
        	fontWeight: '400',
        	color: 'white',
        	textAlign: 'center',
        	fontSize: 16
        },
        input: {
        	backgroundColor: 'white',
        	borderColor:  "#296a5d",
        	color: 'black',
        	borderRadius: 5,
        	width: 275,
        	marginBottom: 10,
        	marginTop: 10
        },
        request: {
        	backgroundColor: "#296a5d",
        	borderRadius: 5,
        	padding: 2,
        }
    	});
    	this.startTime = String(new Date(this.details.startdate).getMonth()+ 1) +"/"+ String(new Date(this.details.startdate).getDate())
    	this.onAnnotationSelected = this.onAnnotationSelected.bind(this)
    	this.onAnnotationDeselected = this.onAnnotationDeselected.bind(this)
    	this.toggle = this.toggle.bind(this)
    	this.requestInvite = this.requestInvite.bind(this)
    	this.requestToggle = this.requestToggle.bind(this)
	}
	toggle(){
		this.setState({requestToggle: !this.state.requestToggle})
	}
	requestInvite(){
		//get user data and send a request to the host on their list of invite requests
    var date = new Date()
    var timeSent = date.toLocaleTimeString()
    var todaysDate = date.toLocaleDateString()
		var body = {
			senderid:this.user.userid,
			sender: this.user.fullname,
			request: [String(this.state.request), this.user.fullname,this.user.userid, this.details.host,this.user.userid,timeSent,todaysDate], 
			recipientid: this.details.creatorid,
			recipient: this.details.host,
			eventid: this.details.eventid,
      date: [todaysDate, timeSent]
		}
		fetch('http://localhost:3000/message',{
			method:"POST",
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(body)
		})
		.then(response=>{return response.json()})
		.then(json=>{
			if(!json.success){
				alert('Internal Server Error Try Again Later')
			} else {
				this.setState({requestToggle:false})
			}
		})
	}
	onAnnotationSelected(activeIndex, feature) {
	    if (this.state.activeIndex === activeIndex) {
	      return;
	    }

	    this._scaleIn = new Animated.Value(0.6);
	    Animated.timing(this._scaleIn, {toValue: 1.0, duration: 200}).start();
	    this.setState({activeAnnotationIndex: activeIndex});

	    if (this.state.previousActiveAnnotationIndex !== -1) {
	      this._map.moveTo(feature.geometry.coordinates, 500);
	    }
  }
  onAnnotationDeselected(deselectedIndex) {
    const nextState = {};

    if (this.state.activeAnnotationIndex === deselectedIndex) {
      nextState.activeAnnotationIndex = -1;
    }

    this._scaleOut = new Animated.Value(1);
    Animated.timing(this._scaleOut, {toValue: 0.6, duration: 200}).start();
    nextState.previousActiveAnnotationIndex = deselectedIndex;
    this.setState(nextState);
  }
  	requestToggle(toggle){
  		if(!toggle){
  			return(
  				<View>
  				<Text style={this.styles.title}>{this.title}</Text>
				<Text style={this.styles.host}>{"Host: "+this.details.host}</Text>
				<Text style={this.styles.date}> {this.startTime+" @"+this.details.times[0]+" ~ "+this.details.times[1]}</Text>
				<Text style={this.styles.text}>{this.details.description}</Text>
				<View style={this.styles.request}>
					<Button title="Request Invite" color="#fff" onPress={this.toggle}/>
				</View>
				</View>
  				)
  		} else {
  			return (
  				<View >	
  				<View style={{flexDirection:'row'}}>
  					<Button onPress={this.toggle} title='x' color="#296a5d"/>
  				</View>
  				<Text style={this.styles.title}> Request Note </Text>
				<TextInput style={this.styles.input} multiline={true} numberOfLines={4} onChangeText={request => this.setState({request})}/>
				<View style={this.styles.request}>
					<Button title='Send Request' color="#fff" onPress={this.requestInvite}/>
				</View>
				</View>
  				)
  		}
  	}
	componentDidMount(){

	}
	render(){
			return(
			<View style={{width: 30}}>
			    <MapboxGL.PointAnnotation title={this.title} id={this.annotationId}  onDeselected={this.onAnnotationDeselected} coordinate={this.coordinate}>
			            <View style={{ width: 25}}>
			    			<TouchableHighlight>
			    				<Image style={this.styles.marker} source={require('../../../assets/marker.png')}/>
			    			</TouchableHighlight>
  						</View>
  						<MapboxGL.Callout style={this.styles.callout} title={this.title}>
  							<ScrollView>
  								{this.requestToggle(this.state.requestToggle)}
  								
  							</ScrollView>
  							
  						</MapboxGL.Callout>
			         </MapboxGL.PointAnnotation>
  			</View>
			)
	}
}
AppRegistry.registerComponent('PlaygroundAnnotation', () => PlaygroundAnnotation);
export default PlaygroundAnnotation