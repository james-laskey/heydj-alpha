import React, {Component} from 'react';
import * as ReactNative from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import InboxItem from './InboxItem'
import Messages from './Messages'
class Inbox extends React.Component {
	constructor(props){
		super(props)
		this.user = props.route.params.user
		this.open = this.open.bind(this)
		this.openConversation = this.openConversation.bind(this)
		this.getMessages = this.getMessages.bind(this)
		this.state = {
			messages: []
	    }
	    this.styles = ReactNative.StyleSheet.create({
       		 wrapper: {
	        	flex: 1,
	        	backgroundColor:'black',
	        	height: ReactNative.Dimensions.get('window').height,
	        	
	        },
	        container: {
	        	paddingTop: 75,
	        	margin: 10
	        },
	        text: {
	        	color: 'white'
	        },
	        image: {
	        	width:125,
	        	height:125
	        },
	        drawerbutton: {
	        	position: 'absolute',
	        	top: 30,
	        	left: 10,
	        	zIndex:1
	        },
	        drawerimg: {
	        	width: 40,
	        	height: 35
	        },
	        header: {
	        	textAlign:'center',
	        	fontSize:25,
	        	color: "#fff"
	        }
    	});
	}
	getMessages(){
		fetch('https://juuke.herokuapp.com/conversations?user="'+this.user.userid+'"', {
			method: 'GET',
			headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json',
             },
		})
		.then(response=>{return response.json()})
		.then(json=>{
			if (!json.messages){
				var noMessages = <ReactNative.View>
									<ReactNative.Text style={this.styles.text}>You Have no Messages</ReactNative.Text>
								</ReactNative.View>
				this.setState({messages:noMessages})
			} else {
				var messages = json.messages
				var inbox = []
				var that = this
				messages.forEach(function(item, index){
					var message = (
						<ReactNative.TouchableHighlight onPress={that.openConversation.bind(that,item)}>
							<InboxItem sender={item.sender} date={new Date(item.date).toLocaleDateString()} lastMessage={item.lastmessage}/>
						</ReactNative.TouchableHighlight>
						)
					inbox.push(message)
				})
				this.setState({messages:inbox})
			}
			
		})
	}
	openConversation(data){
		var messages = []
		var insert = <Messages data={data} back={this.getMessages}/>
		messages.push(insert)
		this.setState({messages:messages})

	}
	open(){
		this.props.navigation.dispatch(DrawerActions.openDrawer())
	}
	componentDidMount(){
		this.getMessages()
	}
	render(){
		return(
			<ReactNative.View style={this.styles.wrapper}>
				<ReactNative.TouchableHighlight onPress={this.open} style={this.styles.drawerbutton}>
						<ReactNative.Image source={require('../../../assets/drawerbutton.png')} style={this.styles.drawerimg}/>
					</ReactNative.TouchableHighlight>

				<ReactNative.ScrollView style={this.styles.container}>
					<ReactNative.Text style={this.styles.header}>Direct Messages</ReactNative.Text>
						{this.state.messages}
				</ReactNative.ScrollView>
			</ReactNative.View>
			
			)
	}
}
ReactNative.AppRegistry.registerComponent('Inbox', () => Inbox);
export default Inbox
