import React, {Component} from 'react';
import { AppRegistry, Dimensions, StyleSheet, Text, TextInput, Button, View, Image} from 'react-native';
class Playground extends React.Component {
	constructor(props){
		super(props)
		this.state = {

	    }
	    this.styles = StyleSheet.create({
	        container: {
	          
	        },
	        text:{
	          color:'#fff'
	        }
    	});
	}
	componentDidMount(){
		
	}
	render(){
		return(
			<View >
        		<Text style={this.styles.text}> Youre on Android </Text>
      		</View>
			)
	}
}
AppRegistry.registerComponent('Playground', () => Playground);
export default Playground