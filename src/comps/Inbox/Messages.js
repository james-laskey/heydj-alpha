import React, {Component} from 'react';
import * as ReactNative from 'react-native';
import ChatBubble from './ChatBubble'
class Messages extends React.Component {
	constructor(props){
		super(props)
		this.back = props.back

		this.sender = props.data.sender
		this.recipient = props.data.recipient
		this.senderid = props.data.senderid
		this.recipientid = props.data.recipientid
		this.conversationid = props.data.conversationid
		this.getConversation = this.getConversation.bind(this)
		this.post = this.post.bind(this)
		 this.styles = ReactNative.StyleSheet.create({
	        container: {
	        	flexDirection: 'column',
	        	alignItems: 'center',
	        	height: ReactNative.Dimensions.get('window').height*0.8
	        },
	        text: {
	        	color: 'white',
	        	fontSize: 30
	        },
	        back: {
	        	position: 'relative',
	        	width: 20,
	        	marginRight: 'auto'
	        },
	        header: {
	        	textAlign:'center',
	        	fontSize:25,
	        	color: "#fff"
	        },
	        conversation: {
	        	marginTop: 10,
	        	height: ReactNative.Dimensions.get('window').height*0.6
	        },
	        input: {
	        	borderColor: '#ccc',
	        	borderWidth: 1,
	        	width: ReactNative.Dimensions.get('window').width*0.9,
	        	backgroundColor:"#2e2e2e",
	        	borderRadius: 10,
	        	padding: 1,
	        	color: 'white',
	        	padding: 5
	        }
	    	});
		this.state = {
			messages: this.getConversation()
	    }
	   }
	   post(e){
	   	console.log(e.target)
	   	var date = new Date()
	   	var todaysDate = date.toLocaleDateString()
	   	var timeSent = date.toLocaleTimeString().split(' ')[0]
	   	var body = {
	   		conversationid: this.conversationid,
	   		senderid: this.senderid,
	   		sender: this.sender,
	   		recipientid: this.recipientid,
	   		recipient: this.recipient,
	   		request: [this.state.chat, this.sender, this.senderid, this.recipient, this.recipientid, timeSent, todaysDate]
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
				this.getConversation()
			}
		})
		e.target.text = ''
	   }
	getConversation(){
		var body = {
			conversationid: this.conversationid
		}
		fetch('http://localhost:3000/messages',{
			method: 'POST',
			headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json',
             },
             body: JSON.stringify(body)
		})
		.then(response=>{return response.json()})
		.then(json=>{
			var conversation = []
			for (var message in json.messages){
				if (json.messages[message].senderid == this.senderid){
					var chat = <ChatBubble side='right' message={json.messages[message]}/>
					conversation.push(chat)
				} else {
					var chat = <ChatBubble side='left' message={json.messages[message]}/>
					conversation.push(chat)
				}
			}
			console.log(conversation)
			this.setState({messages:conversation})
		})
		
	}
	componentDidMount(){

		
	}
	render(){
		return(
			<ReactNative.View style={this.styles.container}>
				<ReactNative.TouchableHighlight onPress={this.back} style={this.styles.back}>
						<ReactNative.Text style={this.styles.text}>«</ReactNative.Text>
					</ReactNative.TouchableHighlight>
				<ReactNative.ScrollView style={this.styles.conversation}>
					{this.state.messages}
				</ReactNative.ScrollView>
				<ReactNative.TextInput style={this.styles.input} autofocus={true} onSubmitEditing={e=>this.post(e)} onChangeText={chat=>this.setState({chat})}/>
			</ReactNative.View>
			)
	}
}
ReactNative.AppRegistry.registerComponent('Messages', () => Messages);
export default Messages