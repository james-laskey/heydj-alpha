import 'react-native-gesture-handler';
import React, {Component} from 'react';
import MapboxGL from "@react-native-mapbox-gl/maps";
MapboxGL.setAccessToken('pk.eyJ1Ijoiamxhc2trIiwiYSI6ImNrMzk3eHQxODAwMnEzbm54MWpwejlja2QifQ.cvAwurFClMg1HLpIXGoHgA');
import Geolocation from '@react-native-community/geolocation';
import PlaygroundAnnotation from './PlaygroundAnnotation'
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { AppRegistry, Dimensions, StyleSheet, Text, TextInput, Button, View, ScrollView, TouchableHighlight, Image} from 'react-native';
class Playground extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			center: [-122.27,37.87],
			annotations: null,
			filter:'default'
			}
	    this.styles = StyleSheet.create({
          page: {
		    flex: 1,
		    backgroundColor: "#F5FCFF"
		  },
		  container: {
		    height: Dimensions.get('window').height,
		    width: Dimensions.get('window').width,
		    backgroundColor: "black"
		  },
		  map: {
		    flex: 1,
		    zIndex: 0
		  },
		  header: {
		 	position:"absolute",
		  	flexDirection: 'row',
		  	justifyContent: 'center',
		  	top: 40,
		  	zIndex: 1,
		  	width: Dimensions.get('window').width
		  },
		  nilFilter: {
		  	borderRadius: 500,
		  	borderWidth: 2,
		  	borderColor: "#2e2e2e",
		  	width:40,
		  	height: 40,
		  	backgroundColor: 'black',
		  	paddingTop: 10,
		  	margin:20,
		  },
		  filter: {
		  	borderRadius: 500,
		  	backgroundColor: 'black',
		  	borderWidth: 2,
		  	borderColor: "#296a5d",
		  	paddingTop: 10,
		  	width:40,
		  	height: 40,
		  	margin: 20,
		  },
		  drawerbutton: {
	        	position: 'absolute',
	        	top: 20,
	        	left: 10
	        },
	        drawerimg: {
	        	width: 40,
	        	height: 35
	        },
	        label: {
	        	fontSize: 10,
	        	color: 'white',
	        	alignItems: 'center',
	        	textAlign: 'center'
	        }
    	});
    	this.findFilterStyle = this.findFilterStyle.bind(this)
    	this.user = props.route.params.user
    	this.open = this.open.bind(this)
    	this.updateFilter = this.updateFilter.bind(this)
    	this.updateAnnotations = this.updateAnnotations.bind(this)
	}
	findFilterStyle(filter){
		if(this.state.filter=='default'){
			return this.styles.nilFilter
		}
		if(this.state.filter=='party' && filter=='party'){
			return this.styles.filter
		}
		if(this.state.filter=='barclub' && filter=='barclub'){
			return this.styles.filter
		}
		if(this.state.filter=='other' && filter=='other'){
			return this.styles.filter
		} else {
			return this.styles.nilFilter
		}
	}
	open(){
		this.props.navigation.dispatch(DrawerActions.openDrawer())
	}
	updateFilter(filter){
		this.setState({filter:filter,annotations:null})
		this.updateAnnotations(filter)


	}
	updateAnnotations(filter){
		fetch('http://localhost:3000/playground?filter='+filter, {
			method: "GET",
			headers:{
				'Accept': 'application/json, text/plain',
	    		'Content-Type': 'application/json',
			}
		})
		.then(response=>{return response.json()})
		.then(json=>{
			var list = []
			var annotations = json.playground
			for (var annotation in annotations){
				var id = annotation
				var title = annotations[annotation].eventname
				var coordinates = [Number(annotations[annotation].coordinates[0]),Number(annotations[annotation].coordinates[1])]
				var newAnnotation = <PlaygroundAnnotation user={this.user} id={id} title={title} coordinate={coordinates} details={annotations[annotation]}/>
				list.push(newAnnotation)
			}
			console.log(list)
			this.setState({annotations:list})
			return list
			
		})
	}
	componentDidMount(){
		Geolocation.getCurrentPosition(info => {
			console.log(info)
		});
		this.updateAnnotations('default')
		
	}
	render(){
		return(
			<ScrollView style={this.styles.page}>
				<View style={this.styles.header}>
					<TouchableHighlight onPress={this.open} style={this.styles.drawerbutton}>
						<Image source={require('../../../assets/drawerbutton.png')} style={this.styles.drawerimg}/>
					</TouchableHighlight>
					<TouchableHighlight style={this.findFilterStyle('party')} onPress={this.updateFilter.bind(this, 'party')}>
						<Text style={this.styles.label}>Parties</Text>
					</TouchableHighlight>
					<TouchableHighlight style={this.findFilterStyle('barclub')} onPress={this.updateFilter.bind(this, 'barclub')}>
						<Text style={this.styles.label}>Bars</Text>
					</TouchableHighlight>
					<TouchableHighlight style={this.findFilterStyle('other')} onPress={this.updateFilter.bind(this, 'other')}>
						<Text style={this.styles.label}>Events</Text>
					</TouchableHighlight>
				</View>
		        <View style={this.styles.container}>
		          <MapboxGL.MapView ref={(c) => this._map = c} centerCoordinate={[-122.27,37.87]} styleURL={MapboxGL.StyleURL.Dark} zoomEnabled={true} zoomLevel={1}  style={this.styles.map}>
		          	<MapboxGL.UserLocation visible renderModer='normal'/>
		          	<MapboxGL.Camera ref={(c) => this._camera = c}  followUserLocation/>
		          		{this.state.annotations}
		          </MapboxGL.MapView>
		        </View>
		      </ScrollView>
			)
	}
}
AppRegistry.registerComponent('Playground', () => Playground);
export default Playground