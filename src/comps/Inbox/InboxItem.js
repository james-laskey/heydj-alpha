import React, {Component} from 'react';
import { AppRegistry, Dimensions, StyleSheet, Text, TextInput, Button, View, Image} from 'react-native';

class InboxItem extends React.Component {
	constructor(props){
		super(props)
		this.sender = props.sender
		this.date = props.date
		this.lastMessage = props.lastMessage
		this.state = {

	    }
	    this.styles = StyleSheet.create({
        container: {

        },
        sender:{
        	color: "#fff"
        },
        subtext: {
        	color: "#ccc"
        },
    	});
	}
	componentDidMount(){
		
	}
	render(){
		return(
			<View>
				<Text style={this.styles.sender}>{this.sender}</Text>
				<View>
					<Text style={this.styles.subtext}>{this.lastMessage}</Text>
					<Text style={this.styles.subtext}>{this.date}</Text>
				</View>
			</View>
			)
	}
}
AppRegistry.registerComponent('InboxItem', () => InboxItem);
export default InboxItem
