import React, {Component} from 'react';
import { AppRegistry, Dimensions, StyleSheet, Text, Button, View, Screen, TouchableHighlight, Image } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import Event from '../Event/Event'
class Home extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			event:false,
			home:'',
			access: false
	    }
	    this.styles = StyleSheet.create({
        	container: {
	        	flexDirection: 'column',
	        	alignItems: 'center',
	        	backgroundColor:'black',
	        	height: Dimensions.get('window').height,
	        	
	        },
	        image: {
	        	width:125,
	        	height:125
	        },
	        drawerbutton: {
	        	width: Dimensions.get('window').width-20,
	        	paddingTop: 40
	        },
	        drawerimg: {
	        	width: 40,
	        	height: 35
	        }
    	});
    	
    	this.user = props.route.params.user
    	this.account_type = this.user.account_type
    	this._access_token = props.route.params.access_token
	    this.voteRateLimiter =this.voteRateLimiter.bind(this)
	    this.open = this.open.bind(this)
	}
	open(){
		this.props.navigation.dispatch(DrawerActions.openDrawer())
	}
	voteRateLimiter(){

	}
	componentDidMount(){
		Geolocation.getCurrentPosition(info => {
			console.log(info)
		});
	}
	render(){
		return (
				<View style={this.styles.container}>
				<TouchableHighlight onPress={this.open} style={this.styles.drawerbutton}>
					<Image source={require('../../../assets/drawerbutton.png')} style={this.styles.drawerimg}/>
				</TouchableHighlight>
				<Event user={this.user}/>
			</View>
			)		
	}
}
AppRegistry.registerComponent('Home', () => Home);
export default Home
/*if (this.state.type=='search') {
			return(
				<Search user={this.user} access_token={this._access_token}/>
			)
		}*/