import React, {Component} from 'react';
import { AppRegistry, Dimensions, StyleSheet, Text, TextInput, Button, View, Image} from 'react-native';
import MapboxGL from "@react-native-mapbox-gl/maps";
MapboxGL.setAccessToken('pk.eyJ1Ijoiamxhc2trIiwiYSI6ImNrMzk3eHQxODAwMnEzbm54MWpwejlja2QifQ.cvAwurFClMg1HLpIXGoHgA');
import Geolocation from '@react-native-community/geolocation';
class HostEvent extends React.Component {
	constructor(props){
		super(props)
		this.state = {

	    }
	    this.styles = StyleSheet.create({
        container: {},
        details:{
        	alignItems: "center"
        },
        label:{
        	color: "#fff"
        },
        address: {
        	width: 200,
        	height:200,
        },
        button: {
        	color: "#fff"
        },
        buttonWrapper: {
        	backgroundColor:"#296a5d",
        	borderRadius:5,
        	padding: 5
        }
    	});
	}
	componentDidMount(){
		
	}
	render(){
		return(
			<View>
				<Text>Enter Event Details</Text>
				<View style={this.styles.details}>
					<Text style={this.styles.label}>Event Name</Text>
					<TextInput onChangeText={(eventname) => this.setState({ eventname })}></TextInput>
					<Text style={this.styles.label}>Host Name</Text>
					<TextInput onChangeText={(host) => this.setState({ host })}></TextInput>
					<Text style={this.styles.label}>Press Location</Text>
					<View style={this.styles.address}>
						<MapboxGL.MapView ref={(c) => this._map = c} styleURL={MapboxGL.StyleURL.Dark} zoomEnabled={true} zoomLevel={1}  style={this.styles.map}>
				          	<MapboxGL.UserLocation visible renderModer='normal'/>
				          	<MapboxGL.Camera ref={(c) => this._camera = c}  followUserLocation/>

				         </MapboxGL.MapView>
				    </View>
					<Text style={this.styles.label}>Event Description</Text>
					<TextInput onChangeText={(description) => this.setState({ description })}></TextInput>
					<View style={this.styles.buttonWrapper}>
						<Button title="Host Event" onPress={this.checkDetails} style={this.styles.button}/>
					</View>
				</View>
				
			</View>
			)
	}
}
AppRegistry.registerComponent('HostEvent', () => HostEvent);
export default HostEvent
/*<Picker
				  selectedValue={0}
				  style={{height: 50, width: 100, backgroundColor:'#2e2e2e'}}
				  onValueChange={(itemValue, itemIndex) =>
				    this.setState({month: itemValue})
				  }>
				  <Picker.Item label="January" value={0} />
				  <Picker.Item label="February" value={1} />
				  <Picker.Item label="March" value={2} />
				  <Picker.Item label="April" value={3} />
				  <Picker.Item label="May" value={4} />
				  <Picker.Item label="June" value={5} />
				  <Picker.Item label="July" value={6} />
				  <Picker.Item label="Auguest" value={7} />
				  <Picker.Item label="September" value={8} />
				  <Picker.Item label="October" value={9} />
				  <Picker.Item label="November" value={10} />
				  <Picker.Item label="December" value={11} />
				</Picker>*/