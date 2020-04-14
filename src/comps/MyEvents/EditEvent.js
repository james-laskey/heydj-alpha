import React, {Component} from 'react';
import * as ReactNative from 'react-native';
class EditEvent extends React.Component {
	constructor(props){
		super(props)
		this.event = props.event
		 this.styles = ReactNative.StyleSheet.create({
	        container: {}
	    	});
		 this.changePage = this.changePage.bind(this)
		 this.getPage = this.getPage.bind(this)
		this.state = {
			page: this.getPage('details')
	    }
	   }
	changePage(page){


	}
	getPage(page){
		function Details(props){
			return (
				<ReactNative.View>
					<ReactNative.TextInput onTextChange={eventname=>this.setState({eventname})} value={props.eventname}/> 
				</ReactNative.View>
				)
		}
		function Special(props){
			return(
				<ReactNative.View>
				</ReactNative.View>
				)
		}
		if(page=='details'){
			return Details
		}
		if (page=='special'){
			return Special
		}
	}
	componentDidMount(){
		
	}
	render(){
		return(
			<ReactNative.View style={this.styles.conatiner}>
				<ReactNative.View style={this.styles.header}>
					<ReactNative.TouchableHighlght onPress={this.changePage.bind(this, 'details')}>
						<ReactNative.Text style={this.styles.headerLabel}>Details</ReactNative.Text>
					</ReactNative.TouchableHighlght>
					<ReactNative.TouchableHighlght onPress={this.changePage.bind(this, 'special')}>
						<ReactNative.Text style={this.styles.headerLabel}>Special</ReactNative.Text>
					</ReactNative.TouchableHighlght>
				</ReactNative.View>
				<ReactNative.ScrollView>
					{this.state.page}
				</ReactNative.ScrollView>
			</ReactNative.View>
			)
	}
}
ReactNative.AppRegistry.registerComponent('EditEvent', () => EditEvent);
export default EditEvent
