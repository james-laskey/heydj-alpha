import React, {Component} from 'react';
import * as ReactNative from 'react-native';
class ChatBubble extends React.Component {
	constructor(props){
		super(props)
		this.side = props.side
		this.message = props.message
		 this.styles = ReactNative.StyleSheet.create({
	        container: {},
	        left: {
	        	flexDirection: 'column',
	        	padding: 5,
	        	backgroundColor: '#ccc',
	        	borderRadius: 10,
	        	marginRight:10,
	        	marginBottom:5,
	        	width: ReactNative.Dimensions.get('window').width*0.6,

	        },
	        right: {
	        	flexDirection: 'column',
	        	marginLeft: 0,
	        	padding: 5,
	        	backgroundColor: "#296a5d",
	        	borderRadius: 10,
	        	marginBottom:5,
	        	width: ReactNative.Dimensions.get('window').width*0.6,
	        },
	        bubble:{
	        	width: ReactNative.Dimensions.get('window').width*0.8,
	        	flexDirection: 'row-reverse'
	        },
	        date: {
	        	color: "#ccc",
	        	fontSize: 10,
	        }
	    	});
		this.state = {

	    }
	   }
	calculateDate(){
// 		function findDate(date, time){
// 	var today = new Date()
// 	var currTime = today.toTimeString()
// 	var currDateMonth = today.toLocaleDateString().split('/')[0]
// 	var currDateDay = today.toLocaleDateString().split('/')[1]
// 	var pastDateMonth = date.split('-')[1]
// 	var pastDateDay = date.split('-')[2]
// 	console.log(currDateDay, currDateMonth, date, pastDateDay, pastDateMonth)
// 	return date 
// }
		// var now = Number(new Date().toTimeString().split(':')[0])
		// var timeSent = Number(this.message.timesent.split(':')[0])
		// var timePassed = Math.abs(timeSent-now)
		// var Days
		// if (timePassed>=1) {
		// 	return String(timePassed+' hours ago.')
		// } else {
		// 	now = Number(new Date().toTimeString().split(':')[1])
		// 	timeSent = Number(this.message.timesent.split(':')[1])
		// 	timePassed =  Math.abs(now-timeSent)
		// 	return String(timePassed+' minutes ago.')
		// }
		
	}
	findSide(){
		if (this.side=='right'){
			return this.styles.right
		} else {
			return this.styles.left
		}
	}
	componentDidMount(){
		console.log(this.props.message)
	}
	render(){
		return(
			<ReactNative.View style={this.styles.bubble}>
				<ReactNative.View style={this.findSide()}>
					<ReactNative.Text style={this.styles.text}>{this.message.message}</ReactNative.Text>
					<ReactNative.Text style={this.styles.date}>{this.message.timesent + " " + this.message.date.split('T')[0]}</ReactNative.Text>
				</ReactNative.View>
			</ReactNative.View>
			)
	}
}
ReactNative.AppRegistry.registerComponent('ChatBubble', () => ChatBubble);
export default ChatBubble