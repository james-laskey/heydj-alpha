import 'react-native-gesture-handler';
import React, {Component} from 'react';
import MapboxGL from "@react-native-mapbox-gl/maps";
MapboxGL.setAccessToken('pk.eyJ1Ijoiamxhc2trIiwiYSI6ImNrMzk3eHQxODAwMnEzbm54MWpwejlja2QifQ.cvAwurFClMg1HLpIXGoHgA');
import Geolocation from '@react-native-community/geolocation';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import AnnotationContent from "./AnnotationContent"
import {AppRegistry, Animated, Dimensions, StyleSheet, Text, TextInput, Button, View, ScrollView, TouchableHighlight, Picker, Image} from 'react-native';	
import Dropdown from '../Dropdown/Dropdown'
class HostEvent extends React.Component {
	constructor(props){
		super(props)
		this.styles = StyleSheet.create({
          page: {
		    flex: 1,
		    backgroundColor: "black",
		    paddingTop:80,
		   
		  },
		  selected: {
		  	backgroundColor: '#296a5d',
		  	borderRadius: 5,
		  	padding: 5
		  },
		  nonSelected: {
		  	backgroundColor: "#2e2e2e",
		  	borderRadius: 5,
		  	padding: 5
		  },
		  container: {
		    height: 300,
		    width: Dimensions.get('window').width,
		    borderTopColor: "#296a5d",
		    borderTopWidth:3,
		    borderBottomWidth: 3,
		    marginTop:10,
		    borderBottomColor: "#296a5d",
		  },
		  date: {
		  	flexDirection: "row",
		  	marginTop: 10,
		  	marginBottom: 10
		  },
		  tod: {
		  	flexDirection: 'row',
		  	marginLeft:5
		  },
		  map: {
		    flex: 1
		  },
		  label: {
		  	color: "#fff",
		  	fontSize:20,
		  	fontWeight: "500"
		  },
		  dateInput: {
		  	backgroundColor:"#2e2e2e",
		  	width: 50,
		  	borderRadius:5,
		  	fontSize:17,
		  	padding: 5,
		  	color:"#fff"
		  },
		  labelInput: {
		  	fontSize: 17,
		  	color:'#fff',
		  	backgroundColor: "#2e2e2e",
		  	borderRadius: 10,
		  	padding: 5,
		  	width: 300,
		  	textAlign: 'center',
		  	marginBottom: 20
		  },
		  marker: {

		  },
		  button: {
        	color: "#fff"
          },
          buttonWrapper: {
        	backgroundColor:"#296a5d",
        	marginBottom:100
        },
        drawerbutton: {
	        	position: 'absolute',
	        	top: -40,
	        	left: 10
	    },
        drawerimg: {
        	width: 40,
        	height: 35
        },
        selectedFilter: {
        	backgroundColor: "#296a5d",
	        padding: 5,
	        borderRadius: 5,
	        margin: 5,
	        fontWeight: '600'
        },
        nilFilter: {
        	padding: 5,
	        borderRadius: 5,
	        margin: 5,
	        fontWeight: '600'	
        },
        privacy: {
        	backgroundColor: "#296a5d",
	        padding: 5,
	        borderRadius: 5,
	        margin: 5,
	        fontWeight: '600'
        },
        nilPrivacy: {
        	padding: 5,
	        borderRadius: 5,
	        margin: 5,
	        fontWeight: '600'
        }
    	});
		this.state = {
			center: [0,0],
			backgroundColor: 'blue',
      		coordinates:'',
      		activeAnnotationIndex: -1,
      		previousActiveAnnotationIndex: -1,
      		tod: 'PM',
      		endTod: 'PM',
      		amStyle:this.styles.nonSelected,
      		pmStyle: this.styles.selected,
      		endAmStyle: this.styles.nonSelected,
      		endPmStyle: this.styles.selected,
      		visible: true,
      		complete:false,
      		selectedFilter: 'party',
      		privacy:'public',
      		eventStartTime: new Date(1598051730000)
	    }
    	this._scaleIn = null;
    	this._scaleOut = null;
    	this.visited = false
    	this.user = props.user
    	this.onAnnotationSelected = this.onAnnotationSelected.bind(this)
    	this.locatePress = this.locatePress.bind(this)
    	this.renderAnnotations = this.renderAnnotations.bind(this)
    	this.removeAnnotation = this.removeAnnotation.bind(this)
    	this.checkDetails = this.checkDetails.bind(this)
    	this.findStyle = this.findStyle.bind(this)
    	this.selectAM = this.selectAM.bind(this)
    	this.selectPM = this.selectPM.bind(this)
    	this.selectEndAM = this.selectEndAM.bind(this)
    	this.selectEndPM = this.selectEndPM.bind(this)
    	this.open = this.open.bind(this)
    	this.findSelected = this.findSelected.bind(this)
    	this.selectFilter = this.selectFilter.bind(this)
    	this.updateRepetition = this.updateRepetition.bind(this)

	}
	updateRepetition(select){
		this.setState({repetition:select})
	}
	validate(){
		var body = {skip:false}
		try{
			if (this.state.eventname.length>=5){
				body['eventname'] = this.state.eventname
			}
			
		}
		catch(err){
			alert("Name must be at least 5 letters long.")
			body['skip'] == true
		}
		try{
			if (this.state.jukecode.length>=8){
				body['jukecode'] = this.state.jukecode
			}
			
		}
		catch(err){
			alert("Jukecode must be at least 8 letters long and contain numbers/special characters.")
			body['skip'] == true
		}
		try {
			if (this.state.host.length>=3){
				body['host'] = this.state.host
			}
		}
		catch(err){
			alert("Enter a valid host name.")
			body['skip'] == true
		}
		try{
			if(this.state.month==undefined){
				throw Error
			}
			if(Number(this.state.month)<13 && Number(this.state.month)>0){
					body['month'] = Number(this.state.month)
				}
				else {
					throw Error
				}
			
		}
		catch(err){
			alert('Enter a valid month.')
			body['skip'] == true
		}
		try{
			console.log(this.state.day)
			if (this.state.day==undefined){
				throw Error
			}
			if(Number(this.state.day)<32 && Number(this.state.day)>0){
				body['day'] = Number(this.state.day)	
			}
			 else {
				throw Error
			}
			
		}
		catch(err){
			alert('Enter valid day.')
			body['skip'] == true
		}
		try{
			if(this.state.year==undefined){
				throw Error
			}
			if (Number(this.state.year)>2019){
				body['year'] = Number(this.state.year)
			} else {
				throw Error
			}

		}
		catch(err){
			alert('Enter valid year.')
			body['skip'] == true
		}
		try{
			if(this.state.description == undefined){
				throw Error
			}
			if(this.state.description.length >= 25){
				body['description'] = this.state.description
			}
		}
		catch(err){
			alert("Enter an event description that is at least 25 letters long.")
			body['skip'] = true
		}
		try{
			if(this.state.hour==undefined){
				throw Error
			}
			if(Number(this.state.hour)>=0 && Number(this.state.hour)<25){
				body['hour'] = Number(this.state.hour)
			}
		}
		catch(err){
			alert("Enter valid  hour start time between 0 and 24 or 1-12.")
			body['skip'] = true
		}
		try{
			if(this.state.minutes==undefined){
				throw Error
			}
			if(Number(this.state.minutes)>=0 && Number(this.state.minutes)<60){
				body['minutes']=this.state.minutes
			}
		}
		catch(err){
			alert('Enter valid starting minute.')
			body['skip']=true
		}
		try{
			if(this.state.endhour==undefined){
				throw Error
			}
			if(Number(this.state.endhour)>=0 && Number(this.state.endhour)<25){
				body['endhour'] = Number(this.state.endhour)
			}
		}
		catch(err){
			alert("Enter valid  hour end time between 0 and 24 or 1-12.")
			body['skip'] = true
		}
		try{
			if(this.state.endminutes==undefined){
				throw Error
			}
			if(Number(this.state.endminutes)>=0 && Number(this.state.endminutes)<60){
				body['endminutes']=this.state.endminutes
			}
		}
		catch(err){
			alert('Enter valid ending minute.')
			body['skip']=true
		}
		body['tod'] = this.state.tod
		body['endTod'] = this.state.endTod
		body['coordinates'] = this.state.coordinates
		body['filter'] = this.state.selectedFilter
		body['privacy'] = this.state.privacy
		body['creatorid'] = this.user.userid
		body['repetition'] = this.state.repetition
		return body
	}
	checkDetails(){
		var body = this.validate()
		if (!body.skip){
			console.log(body)
			fetch('http://localhost:3000/newevent',{
				method: "POST",
				headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(body)
			})
			.then(response=>{return response.json()})
			.then(json=>{
				if(!json.data){
					alert('Internal Server Error Try Again Later')
				} else {
					alert("Event Successfuly Hosted on JUKE!")
					this.setState({complete:true})
				}
			})
		}

	}
	findStyle(tod){
		if (tod=='AM'){
			if (this.state.tod=='PM'){
				return this.styles.nonSelected
			} else {
				return this.styles.selected
			}
		} else {
			if (this.state.tod == 'AM'){
				return this.styles.nonSelected
			} else {
				return this.styles.selected
			}
		}
	}
	findPrivacy(privacy){
		if(this.state.privacy=='public' && privacy=='public'){
			return this.styles.privacy
		}
		if(this.state.privacy=='private' && privacy=='private'){
			return this.styles.privacy
		} else {
			return this.styles.nilPrivacy
		}
	}
	findSelected(type){
		if(type=='party' && this.state.selectedFilter=='party'){
			return this.styles.selectedFilter
		}
		if(type=='barclub' && this.state.selectedFilter=='barclub'){
			return this.styles.selectedFilter
		}
		if(type=='event' && this.state.selectedFilter=='event'){
			return this.styles.selectedFilter
		} else {
			return this.styles.nilFilter
		}
	}
	locatePress(e){
		this.setState({
			coordinates:e['geometry']['coordinates'],
			visible: true
		})
		console.log(this.state.coordinates)
	}
	onAnnotationSelected(activeIndex, feature) {
	    if (this.state.activeIndex === activeIndex) {
	      return;
	    }

	    this._scaleIn = new Animated.Value(0.6);
	    Animated.timing(this._scaleIn, {toValue: 1.0, duration: 200}).start();
	    this.setState({activeAnnotationIndex: activeIndex});

	    if (this.state.previousActiveAnnotationIndex !== -1) {
	      this._map.moveTo(feature.geometry.coordinates, 500);
	    }
  }

  onAnnotationDeselected(deselectedIndex) {
    const nextState = {};

    if (this.state.activeAnnotationIndex === deselectedIndex) {
      nextState.activeAnnotationIndex = -1;
    }

    this._scaleOut = new Animated.Value(1);
    Animated.timing(this._scaleOut, {toValue: 0.6, duration: 200}).start();
    nextState.previousActiveAnnotationIndex = deselectedIndex;
    this.setState(nextState);
  }

  open(){
		this.props.navigation.dispatch(DrawerActions.openDrawer())
	}

	selectFilter(filter){
		this.setState({selectedFilter:filter})
	}

	selectPrivacy(privacy){
		this.setState({privacy:privacy})
	}

  selectEndAM(){
  	this.setState({
  			endAmStyle:this.styles.selected,
  			endPmStyle:this.styles.nonSelected,
  			endTod:'AM'
  		})
  }

  selectEndPM(){
  	this.setState({
  			endPmStyle:this.styles.selected,
  			endAmStyle:this.styles.nonSelected,
  			endTod:'PM'
  		})
  }

  selectAM(){
  	this.setState({
  			amStyle:this.styles.selected,
  			pmStyle:this.styles.nonSelected,
  			tod:'AM'
  		})
  }

  selectPM(){
  	this.setState({
  			pmStyle:this.styles.selected,
  			amStyle:this.styles.nonSelected,
  			tod:'PM'
  		})
  }

  removeAnnotation(){
  	this.setState({visible:false})
  }

  renderAnnotations(visibility) {
  	if (!visibility){
  		return <View></View>
  	}
  	else {
  		const items = [];
	    for (let i = 0; i < this.state.coordinates.length; i++) {
	      const coordinate = this.state.coordinates;

	      const title = `Lon: ${coordinate[0]} Lat: ${coordinate[1]}`;
	      const id = `pointAnnotation${i}`;

	      const animationStyle = {};
	      if (i === this.state.activeAnnotationIndex) {
	        animationStyle.transform = [{scale: this._scaleIn}];
	      } else if (i === this.state.previousActiveAnnotationIndex) {
	        animationStyle.transform = [{scale: this._scaleOut}];
	      }
	      items.push(
	          <AnnotationContent
	            id={id}
	            coordinate={coordinate}
	            title={title} />
	        );
	     
	    }
	    return items;
  	}
      
  }

	componentDidMount(){
		if (!this.visited){
			this.visited = true
			Geolocation.getCurrentPosition(info => {
			this.setState({center: [info['coords']['longitude'],info['coords']['latitude']]})
		});
		}
		
		// Camera.setCamera({
		//   centerCoordinate: [-122.27,37.87],
		//   zoom: 15,
		//   duration: 2000,
		// })
	}
	render(){
		if (!this.state.complete){
			return(
			<ScrollView style={this.styles.page} >
			<TouchableHighlight onPress={this.open} style={this.styles.drawerbutton}>
						<Image source={require('../../../assets/drawerbutton.png')} style={this.styles.drawerimg}/>
					</TouchableHighlight>
				<View style={{alignItems:'center'}}>
					<Text style={this.styles.label}> Event Privacy </Text>
					<View style={{flexDirection:'row'}}>
	                  <View style={this.findPrivacy('private')}>
	                    <Button title='Private' onPress={this.selectPrivacy.bind(this, 'private')} color="white"/>
	                  </View>
	                  <View style={this.findPrivacy('public')}>
	                    <Button title='Public' onPress={this.selectPrivacy.bind(this, 'public')} color="white"/>
	                  </View>
	                </View>
					<Text style={this.styles.label}> Event Type </Text>
					<View style={{flexDirection:'row'}}>
	                  <View style={this.findSelected('party')}>
	                    <Button title='Party' onPress={this.selectFilter.bind(this, 'party')} color="white"/>
	                  </View>
	                  <View style={this.findSelected('barclub')}>
	                    <Button title='Bar/Club' onPress={this.selectFilter.bind(this, 'barclub')} color="white"/>
	                  </View>
	                  <View style={this.findSelected('event')}>
	                    <Button title='Event' onPress={this.selectFilter.bind(this, 'event')} color="white"/>
	                  </View>
	                </View>
					<Text style={this.styles.label}>Event Name</Text>
					<TextInput style={this.styles.labelInput} autoCapitalize='words' onChangeText={(eventname) => this.setState({ eventname })}/>
					<Text style={this.styles.label}>Host of Event</Text>
					<TextInput style={this.styles.labelInput} autoCapitalize='words' onChangeText={(host) => this.setState({ host })}/>
					<Text style={this.styles.label}>Create a Jukecode</Text>
					<TextInput style={this.styles.labelInput} autoCapitalize='characters' onChangeText={(jukecode) => this.setState({ jukecode })}/>
					<Text style={this.styles.label}>Date</Text>
					<View style={this.styles.date}>
						<TextInput keyboardType='numeric' style={this.styles.dateInput} maxLength={2} onChangeText={(month) => this.setState({ month })}/>
						<Text style={this.styles.label}>/</Text>
						<TextInput keyboardType='numeric' style={this.styles.dateInput} maxLength={2} onChangeText={(day) => this.setState({ day })}/>
						<Text style={this.styles.label}>/</Text>
						<TextInput keyboardType='numeric' style={this.styles.dateInput} maxLength={4} onChangeText={(year) => this.setState({ year })}/>
					</View>
					<Text  styles={this.styles.label}> Reoccurrence</Text>
					<Dropdown options={['On Time Event','Every Week','Once a Month']} onSelect={this.updateRepetition}/>
					<Text style={this.styles.label}>Start Time </Text>
					<View style={this.styles.date}>
						<TextInput keyboardType="numeric" style={this.styles.dateInput} maxLength={2} onChangeText={(hour) => this.setState({ hour })}/>
						<Text style={this.styles.label}> : </Text>
						<TextInput keyboardType="numeric" style={this.styles.dateInput} maxLength={2} onChangeText={(minutes) => this.setState({ minutes })}/>
						<View style={this.styles.tod}>
							<TouchableHighlight onPress={this.selectAM}>
								<View style={this.state.amStyle}>
									<Text style={this.styles.label}> AM </Text>
								</View>
							</TouchableHighlight>
							<TouchableHighlight style={{marginLeft:5}} onPress={this.selectPM}>
								<View style={this.state.pmStyle}>
									<Text style={this.styles.label}> PM </Text>
								</View>
							</TouchableHighlight>
						</View>
					</View>
					<Text style={this.styles.label}>End Time </Text>
					<View style={this.styles.date}>
						<TextInput keyboardType="numeric" style={this.styles.dateInput} maxLength={2} onChangeText={(endhour) => this.setState({ endhour })}/>
						<Text style={this.styles.label}> : </Text>
						<TextInput keyboardType="numeric" style={this.styles.dateInput} maxLength={2} onChangeText={(endminutes) => this.setState({ endminutes })}/>
						<View style={this.styles.tod}>
							<TouchableHighlight onPress={this.selectEndAM}>
								<View style={this.state.endAmStyle}>
									<Text style={this.styles.label}> AM </Text>
								</View>
							</TouchableHighlight>
							<TouchableHighlight style={{marginLeft:5}} onPress={this.selectEndPM}>
								<View style={this.state.endPmStyle}>
									<Text style={this.styles.label}> PM </Text>
								</View>
							</TouchableHighlight>
						</View>
					</View>
					<Text style={this.styles.label}> Event Description </Text>
					<TextInput style={this.styles.labelInput} multiline={true} numberOfLines={5} onChangeText={(description) => this.setState({ description })}/>
					<Text style={this.styles.label}>Press Location of Event</Text>
					<Text style={{color:'white'}}>(Long Press to Remove)</Text>
				</View>
		        <View style={this.styles.container}>
		          <MapboxGL.MapView ref={(c) => this._map = c} centerCoordinate={[-122.27,37.87]} onPress={this.locatePress.bind(this)} onLongPress={this.removeAnnotation} styleURL={MapboxGL.StyleURL.Dark} zoomEnabled={true} zoomLevel={1}  style={this.styles.map} key={this.renderAnnotations()}>
		          	<MapboxGL.UserLocation visible renderModer='normal'/>
		          	<MapboxGL.Camera ref={(c) => this._camera = c}  centerCoordinate={this.state.center} zoomEnabled={true} zoomLevel={5}/>
			         {this.renderAnnotations(this.state.visible)}
		          </MapboxGL.MapView>
		          
		        </View>
		        <View style={this.styles.buttonWrapper}>
						<Button title="Host Event" onPress={this.checkDetails} color="#fff" style={this.styles.button}/>
					</View>
		      </ScrollView>
		      )
		} else {
			return(
				<View>
					<Text style={this.styles.label}>Event has been successfully hosted on JUKE!</Text>
				</View>
				)
		}
		
	}
}
AppRegistry.registerComponent('HostEvent', () => HostEvent);
export default HostEvent