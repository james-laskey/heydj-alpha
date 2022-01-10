import React, {Component} from 'react';
import { AppRegistry, Dimensions, StyleSheet, Text, TextInput, Button, TouchableHighlight, View, ScrollView, Image} from 'react-native';
class Dropdown extends React.Component {
	constructor(props){
		super(props)
		this.options = props.options
		this.event = props.event
		this.toggle = this.toggle.bind(this)
		this.dropdownToggle = this.dropdownToggle.bind(this)
		this.onSelect = props.onSelect
		this.select = this.select.bind(this)
		this.state = {
			selected: this.options[0],
			toggle: false,
			dropdownToggle: this.dropdownToggle(false)
	    }
	    
	    this.styles = StyleSheet.create({
        container: {},
        dropdown: {
        	borderWidth: 3,
        	borderColor: '#296a5d',
        	padding: 2,
        	borderRadius: 5,
        	width: Dimensions.get('window').width*0.8,
        },
        selected: {
        	color: '#fff',
        	textAlign: 'center',
        	fontSize: 20,
        },
        optionContainer: {
        	borderRadius: 5,
        	borderColor: "#ccc",
        	borderWidth: 3,
        	padding: 1,
        },
        optionText: {
        	color: "#ccc",
        	fontSize: 15,
        }, 
        dropdownContainer: {
 			position: 'relative',
        }
    	});
	}

	dropdownToggle(toggle){
		console.log(toggle)
		if(!toggle){
			return (
				<View></View>
				)
		} else {
			var list = []
			for (var option in this.options){
				var selection = (<TouchableHighlight style={this.styles.optionContainer} onPress={this.select.bind(this,this.options[option] )}><Text style={this.styles.optionText}>{this.options[option]}</Text></TouchableHighlight>)
				list.push(selection)
			}
			return (
				<ScrollView style={this.styles.dropdownContainer}>
					{list}
				</ScrollView>
				)
		}
	}

	select(option){
		this.setState({
			selected: option,
			toggle: !this.state.toggle
		})
		console.log(this.onSelect(option))
	}
	toggle(){
		this.setState({toggle: !this.state.toggle})
	}
	componentDidMount(){
		this.setState({dropdownToggle: this.dropdownToggle(this.state.toggle)})
	}
	render(){
		return(
			<View>
				<TouchableHighlight onPress={this.toggle} style={this.styles.dropdown}>
					<Text style={this.styles.selected}> {this.state.selected} </Text>
				</TouchableHighlight>
				{this.dropdownToggle(this.state.toggle)}
			</View>
			)
	}
}
AppRegistry.registerComponent('Dropdown', () => Dropdown);
export default Dropdown