import React, {Component} from 'react';
import * as ReactNative from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import EditEvent from './EditEvent'
function noEvents(){
	const styles = ReactNative.StyleSheet.create({
		text: {
			color: 'white'
		}
	})
	return (
		<ReactNative.Text style={styles.text}> You have no Events! </ReactNative.Text>
		)
}
function ListEvent(props){
	const style = ReactNative.StyleSheet.create({
		text: {
			color: "white",
			textAlign: 'left'
		},
		name: {
			color: "#1DB954",
		},
		time: {
			flex:1,
			color: 'white',
			textAlign:'right'
		},
		event: {
			flexDirection:'row',
			borderWidth:2,
			borderBottomColor:'#2e2e2e', 
			paddingBottom:5
		},
		container: {
        	alignItems:'center',

        },
        none: {
        	color:'white'
        },
        events: {
        	width:ReactNative.Dimensions.get('window').width,
        	padding: 10,
        	margin: 5,

        },
        
	})
	var start = String(new Date(props.event.startdate).getMonth()+ 1) +"/"+ String(new Date(props.event.startdate).getDate()+1)
	return(
		<ReactNative.View style={style.event}>
			<ReactNative.View style={{flexDirection:'column', flex:3}}>
				<ReactNative.Text style={style.name}> {props.event.eventname}</ReactNative.Text>
				<ReactNative.Text style={style.text}> {'Hosted by '+props.event.host} </ReactNative.Text>
			</ReactNative.View>
			<ReactNative.Text style={style.time}> {start+" \n @"+props.event.times[0]}</ReactNative.Text>
		</ReactNative.View>
		)
	}
class MyEvents extends React.Component {
	constructor(props){
		super(props)
		this.user = props.route.params.user
		 this.styles = ReactNative.StyleSheet.create({
	        container: {
	        	backgroundColor: 'black',
	        	flex: 1,
	        	paddingTop: 80,
	        	flexDirection : 'column',
	        	alignItems: 'center'
	        },
	        eventsContainer:{
	        	height: ReactNative.Dimensions.get('window').height,
	        	flexDirection: 'column',
	        	flex: 4,
	        	width: ReactNative.Dimensions.get('window').width-20,
	        },
	        image: {
	        	width:125,
	        	height:125
	        },
	        drawerbutton: {
	        	position: 'absolute',
	        	top: 30,
	        	left: 10,
	        	zIndex: 1
	        },
	        drawerimg: {
	        	width: 40,
	        	height: 35
	        }
	    	});
		 this.open = this.open.bind(this)
		 this.getEvent = this.getEvent.bind(this)
		 this.getEvents = this.getEvents.bind(this)
		 this.Item = ListEvent.bind(this)
		 this.openEventPage = this.openEventPage.bind(this)
		this.state = {
			events: this.getEvents()
	    }
	   }
	   open(){
		this.props.navigation.dispatch(DrawerActions.openDrawer())
	}
	openEventPage(event){
				this.setState({events:this.getEvent(event)})
	}
	getEvent(event){
		return (
			<EditEvent event={event}/>)
			
	}
	getEvents(){
		fetch('https://juuke.herokuapp.com/myevents?userid='+this.user.userid,{
			method: "GET",
			headers: {
				'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json',
			}
		})
		.then(response=>{return response.json()})
		.then(json=>{
			if(!json.events){
				return 
			} else {
				var events = []
				var Item = this.Item
				for (var event in json.events){
					var item = <ReactNative.TouchableHighlight onPress={this.openEventPage.bind(this,json.events[event])}><Item event={json.events[event]}/></ReactNative.TouchableHighlight>
					events.push(item)
				}
				this.setState({events:events})
			}
		})
	}
	componentDidMount(){
		
		
		
	}
	render(){
		return(
			<ReactNative.View style={this.styles.container}>
				<ReactNative.TouchableHighlight onPress={this.open} style={this.styles.drawerbutton}>
					<ReactNative.Image source={require('../../../assets/drawerbutton.png')} style={this.styles.drawerimg}/>
				</ReactNative.TouchableHighlight>
				<ReactNative.ScrollView style={this.styles.eventsContainer}  key={this.state.events}>
					{updateEvents(events)}
				</ReactNative.ScrollView>
			</ReactNative.View>
			)
	}
}
ReactNative.AppRegistry.registerComponent('MyEvents', () => MyEvents);
export default MyEvents
