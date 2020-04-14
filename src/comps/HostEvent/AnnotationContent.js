import React, {Component} from 'react';
import MapboxGL from "@react-native-mapbox-gl/maps";
MapboxGL.setAccessToken('pk.eyJ1Ijoiamxhc2trIiwiYSI6ImNrMzk3eHQxODAwMnEzbm54MWpwejlja2QifQ.cvAwurFClMg1HLpIXGoHgA');
import { AppRegistry, Dimensions, StyleSheet, Text, TextInput, Button, TouchableHighlight, View, Image} from 'react-native';
class AnnotationContent extends React.Component {
	constructor(props){
		super(props)
		this.state = {

	    }
	    this.title = props.title
	    this.coordinate = props.coordinate
	    this.annotationId = props.id
	    this.styles = StyleSheet.create({
        container: {}
    	});
	}
	componentDidMount(){
	}
	render(){
		return(
			<View style={{width: 30}}>
			    <MapboxGL.PointAnnotation title={this.title} id={this.annotationId} coordinate={this.coordinate}>
			            <View style={{ width: 25}}>
			    			<TouchableHighlight>
			    				<Image style={this.styles.marker} source={require('../../../assets/marker.png')}/>
			    			</TouchableHighlight>
  						</View>
  						<MapboxGL.Callout title="Long press to remove." />
			         </MapboxGL.PointAnnotation>
  			</View>
			)
	}
}
AppRegistry.registerComponent('AnnotationContent', () => AnnotationContent);
export default AnnotationContent