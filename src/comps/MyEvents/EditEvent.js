import React, {Component} from 'react';
import * as ReactNative from 'react-native';
import MapboxGL from "@react-native-mapbox-gl/maps";
MapboxGL.setAccessToken('pk.eyJ1Ijoiamxhc2trIiwiYSI6ImNrMzk3eHQxODAwMnEzbm54MWpwejlja2QifQ.cvAwurFClMg1HLpIXGoHgA');
import Geolocation from '@react-native-community/geolocation';
import AnnotationContent from "../HostEvent/AnnotationContent"
import Dropdown from '../Dropdown/Dropdown'
class EditEvent extends React.Component {
	constructor(props){
		super(props)
		this.event = props.event
		 this.styles = ReactNative.StyleSheet.create({
	        container: {
	        	flex: 1
	        },
	        contentContainer: {
	        	width: ReactNative.Dimensions.get('window').width-20,
	        	padding: 5,
	        	flexDirection:'column',
	        },
	        header:{
	        	width: ReactNative.Dimensions.get('window').width,
	        	flexDirection: 'row',
	        	justifyContent: 'space-around',
	        	alignItems: 'center',
	        	marginBottom: 10
	        },
	        headerLabel: {
	        	color:'white',
	        	fontSize: 20,
	        }, 
	        input: {
	        	fontSize: 17,
			  	color:'#fff',
			  	backgroundColor: "#2e2e2e",
			  	borderRadius: 10,
			  	padding: 5,
			  	width:ReactNative.Dimensions.get('window').width-40,
			  	textAlign: 'center',
			  	marginBottom: 20,

	        },
	        label: {
	        	color: 'white'
	        },
	        datelabel:{
	        	fontSize: 17,
	        	color: 'white'
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
	        saveButton: {
	        	backgroundColor: "#296a5d",
		        padding: 1,
		        borderRadius: 5,
		        margin: 5,
		        fontWeight: '600'
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
	        map: {
			    flex: 1
			  },
			mapContainer: {
				height: 300,
				width: ReactNative.Dimensions.get('window').width,
				borderTopColor: "#296a5d",
				borderTopWidth:3,
				borderBottomWidth: 3,
				marginTop:10,
				borderBottomColor: "#296a5d",
			},
			dateInput: {
			  	backgroundColor:"#2e2e2e",
			  	width: 50,
			  	borderRadius:5,
			  	fontSize:17,
			  	padding: 5,
			  	color:"#fff"
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
	    	});
		 this.changePage = this.changePage.bind(this)
		 this.getPage = this.getPage.bind(this)
		 this.findSelected = this.findSelected.bind(this)
		 this.findPrivacy = this.findPrivacy.bind(this)
		 this.selectPrivacy = this.selectPrivacy.bind(this)
		 this.updateEvent = this.updateEvent.bind(this)
		 this._scaleIn = null;
		 this._scaleOut = null;
		 this.visited = false
		 this.onAnnotationSelected = this.onAnnotationSelected.bind(this)
		 this.locatePress = this.locatePress.bind(this)
		 this.renderAnnotations = this.renderAnnotations.bind(this)
		 this.removeAnnotation = this.removeAnnotation.bind(this)
		 this.selectAM = this.selectAM.bind(this)
    	 this.selectPM = this.selectPM.bind(this)
    	 this.selectEndAM = this.selectEndAM.bind(this)
    	 this.selectEndPM = this.selectEndPM.bind(this)
		 this.state = {
		 	edit: true,
			selection: 'details',
			privacy: this.event.privacy,
			selectedFilter: this.event.filter,
			activeAnnotationIndex: -1,
      		previousActiveAnnotationIndex: -1,
      		visible: true,
      		coordinates:this.event.coordinates,
      		tod: this.event.times[0].split(':')[1].split(' ')[1],
      		endtod: this.event.times[1].split(':')[1].split(' ')[1],
      		amStyle:this.styles.nonSelected,
      		pmStyle: this.styles.selected,
      		endAmStyle: this.styles.nonSelected,
      		endPmStyle: this.styles.selected,
      		hour:this.event.times[0].split(':')[0],
      		minutes:this.event.times[0].split(':')[1].split(' ')[0],
      		endhour:this.event.times[1].split(':')[0],
      		endminutes:this.event.times[1].split(':')[1].split(' ')[0],
      		host:this.event.host,
      		eventname:this.event.eventname,
      		description:this.event.description,
      		day:String(new Date(this.event.startdate).getDate()+1),
      		month:String(new Date(this.event.startdate).getMonth()+1),
      		year: String(new Date(this.event.startdate).getFullYear()),
	    }
	   }
	changePage(page){


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
	getPage(page){
		
		if(page=='details'){
			return this.details()
		}
		if(page=='special'){
			return this.special()
		}
	}
	selectFilter(filter){
		this.setState({selectedFilter:filter})
	}
	selectPrivacy(privacy){
		this.setState({privacy:privacy})
	}
	updateEvent(section){
		if ( section == 'basic' ) {
			var body = {
				eventid:  this.event.eventid,
				privacy: this.state.privacy,
				filter: this.state.filter,
				eventname: this.state.eventname,
				host: this.state.host,
				description: this.state.description,
				section: 'basic'
			}
			fetch('https://juuke.herokuapp.com/editevent',{
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
					alert("Internal Server Error Try Again Later")
				}
				else {
					alert('Successfully Updated')
				}
			})
		} else {
			var body = {
				eventid:  this.event.eventid,
				repetition: this.state.repetition,
				month: this.state.month,
				day: this.state.day,
				year: this.state.year,
				hour: this.state.hour,
				minutes: this.state.minutes,
				endhour: this.state.endhour,
				endminutes:this.state.endminutes,
				tod:this.state.tod,
				endtod:this.state.endtod,
				coordinates:this.state.coordinates,
				section: 'datelocation'
			}
			fetch('https://juuke.herokuapp.com/editevent',{
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
					alert("Internal Server Error Try Again Later")
				}
				else {
					alert('Successfully Updated')
				}
			})
		}
	}
	updateSelection(selection){
		this.setState({selection:selection})
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

	this._scaleOut = new ReactNative.Animated.Value(1);
	ReactNative.Animated.timing(this._scaleOut, {toValue: 0.6, duration: 200}).start();
	nextState.previousActiveAnnotationIndex = deselectedIndex;
	this.setState(nextState);
	}
	removeAnnotation(){
  	this.setState({visible:false,
  		edit: false
  	})
  }

	renderAnnotations(visibility) {
		if (!visibility){
			return <ReactNative.View></ReactNative.View>
		}
		if (this.state.edit){
			const items = [];
		    for (let i = 0; i < this.event.coordinates.length; i++) {
		      const coordinate = [Number(this.event.coordinates[0]), Number(this.event.coordinates[1])];

		      const title = `Lon: ${coordinate[0]} Lat: ${coordinate[1]}`;
		      const id = `pointAnnotation${i}`;

		      items.push(
		          <AnnotationContent
		            id={id}
		            coordinate={coordinate}
		            title={title} />
		        );
		     
		    }
		    return items;
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
	updateRepetition(select){
		this.setState({repetition:select})
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
	componentDidMount(){
		this.renderAnnotations(this.state.visible)
	}
	render(){
		if (this.state.selection=='details'){
			return(
				<ReactNative.View style={this.styles.container}>
					<ReactNative.View style={this.styles.header}>
						<ReactNative.TouchableHighlight onPress={this.updateSelection.bind(this, 'details')}>
							<ReactNative.Text style={this.styles.headerLabel}>Details</ReactNative.Text>
						</ReactNative.TouchableHighlight>
						<ReactNative.TouchableHighlight onPress={this.updateSelection.bind(this, 'special')}>
							<ReactNative.Text style={this.styles.headerLabel}>Special</ReactNative.Text>
						</ReactNative.TouchableHighlight>
					</ReactNative.View>
					<ReactNative.View style={{alignItems:'center'}}>
						<ReactNative.Text style={this.styles.label}> Event Privacy </ReactNative.Text>
							<ReactNative.View style={{flexDirection:'row'}}>
			                  <ReactNative.View style={this.findPrivacy('private')}>
			                    <ReactNative.Button title='Private' onPress={this.selectPrivacy.bind(this, 'private')} color="white"/>
			                  </ReactNative.View>
			                  <ReactNative.View style={this.findPrivacy('public')}>
			                    <ReactNative.Button title='Public' onPress={this.selectPrivacy.bind(this, 'public')} color="white"/>
			                  </ReactNative.View>
			                </ReactNative.View>
			            <ReactNative.Text style={this.styles.label}> Event Type </ReactNative.Text>
						<ReactNative.View style={{flexDirection:'row'}}>
		                  <ReactNative.View style={this.findSelected('party')}>
		                    <ReactNative.Button title='Party' onPress={this.selectFilter.bind(this, 'party')} color="white"/>
		                  </ReactNative.View>
		                  <ReactNative.View style={this.findSelected('barclub')}>
		                    <ReactNative.Button title='Bar/Club' onPress={this.selectFilter.bind(this, 'barclub')} color="white"/>
		                  </ReactNative.View>
		                  <ReactNative.View style={this.findSelected('event')}>
		                    <ReactNative.Button title='Event' onPress={this.selectFilter.bind(this, 'event')} color="white"/>
		                  </ReactNative.View>
	                	</ReactNative.View>
						<ReactNative.Text style={this.styles.label}> Name of Event  </ReactNative.Text>
						<ReactNative.TextInput style={this.styles.input} onTextChange={eventname=>this.setState({eventname})} defaultValue={this.event.eventname}/> 
						<ReactNative.Text style={this.styles.label}>Host of Event</ReactNative.Text>
						<ReactNative.TextInput style={this.styles.input} defaultValue={this.event.host} autoCapitalize='words' onChangeText={(host) => this.setState({ host })}/>
						<ReactNative.Text style={this.styles.label}>Change Jukecode</ReactNative.Text>
						<ReactNative.TextInput style={this.styles.input} defaultValue={this.event.jukecode} autoCapitalize='characters' onChangeText={(jukecode) => this.setState({ jukecode })}/>
						<ReactNative.Text style={this.styles.label}> Event Description </ReactNative.Text>
						<ReactNative.TextInput style={this.styles.input}  defaultValue={this.event.description} multiline={true} numberOfLines={5} onChangeText={(description) => this.setState({ description })}/>
							<ReactNative.View style={this.styles.saveButton}>
							<ReactNative.Button style={this.styles.label} title='Save' color="white" onPress={this.updateEvent.bind(this, 'basic')}/>
							</ReactNative.View>
						<ReactNative.Text style={this.styles.headerLabel}>Update Date and Location</ReactNative.Text>
						<ReactNative.Text style={this.styles.label}> Date </ReactNative.Text>
						<ReactNative.View style={this.styles.date}>
							<ReactNative.TextInput keyboardType='numeric' style={this.styles.dateInput} defaultValue={this.state.month} maxLength={2} onChangeText={(month) => this.setState({ month })}/>
							<ReactNative.Text style={this.styles.datelabel}>/</ReactNative.Text>
							<ReactNative.TextInput keyboardType='numeric' style={this.styles.dateInput} defaultValue={this.state.day} maxLength={2} onChangeText={(day) => this.setState({ day })}/>
							<ReactNative.Text style={this.styles.datelabel}>/</ReactNative.Text>
							<ReactNative.TextInput keyboardType='numeric' style={this.styles.dateInput} defaultValue={this.state.year} maxLength={4} onChangeText={(year) => this.setState({ year })}/>
						</ReactNative.View>
						<ReactNative.Text  styles={this.styles.label}> Reoccurrence</ReactNative.Text>
						<Dropdown options={['On Time Event','Every Week','Once a Month']} onSelect={this.updateRepetition}/>
						<ReactNative.Text style={this.styles.label}>Start Time </ReactNative.Text>
						<ReactNative.View style={this.styles.date}>
							<ReactNative.TextInput keyboardType="numeric" defaultValue={this.event.times[0].split(':')[0]} style={this.styles.dateInput} maxLength={2} onChangeText={(hour) => this.setState({ hour })}/>
							<ReactNative.Text style={this.styles.label}> : </ReactNative.Text>
							<ReactNative.TextInput keyboardType="numeric" defaultValue={this.event.times[0].split(':')[1].split(' ')[0]} style={this.styles.dateInput} maxLength={2} onChangeText={(minutes) => this.setState({ minutes })}/>
							<ReactNative.View style={this.styles.tod}>
								<ReactNative.TouchableHighlight onPress={this.selectAM}>
									<ReactNative.View style={this.state.amStyle}>
										<ReactNative.Text style={this.styles.label}> AM </ReactNative.Text>
									</ReactNative.View>
								</ReactNative.TouchableHighlight>
								<ReactNative.TouchableHighlight style={{marginLeft:5}} onPress={this.selectPM}>
									<ReactNative.View style={this.state.pmStyle}>
										<ReactNative.Text style={this.styles.label}> PM </ReactNative.Text>
									</ReactNative.View>
								</ReactNative.TouchableHighlight>
							</ReactNative.View>
						</ReactNative.View>
						<ReactNative.Text style={this.styles.label}>End Time </ReactNative.Text>
						<ReactNative.View style={this.styles.date}>
							<ReactNative.TextInput keyboardType="numeric" defaultValue={this.event.times[1].split(':')[0]} style={this.styles.dateInput} maxLength={2} onChangeText={(endhour) => this.setState({ endhour })}/>
							<ReactNative.Text style={this.styles.label}> : </ReactNative.Text>
							<ReactNative.TextInput keyboardType="numeric" defaultValue={this.event.times[1].split(':')[1].split(' ')[0]} style={this.styles.dateInput} maxLength={2} onChangeText={(endminutes) => this.setState({ endminutes })}/>
							<ReactNative.View style={this.styles.tod}>
								<ReactNative.TouchableHighlight onPress={this.selectEndAM}>
									<ReactNative.View style={this.state.endAmStyle}>
										<ReactNative.Text style={this.styles.label}> AM </ReactNative.Text>
									</ReactNative.View>
								</ReactNative.TouchableHighlight>
								<ReactNative.TouchableHighlight style={{marginLeft:5}} onPress={this.selectEndPM}>
									<ReactNative.View style={this.state.endPmStyle}>
										<ReactNative.Text style={this.styles.label}> PM </ReactNative.Text>
									</ReactNative.View>
								</ReactNative.TouchableHighlight>
							</ReactNative.View>
						</ReactNative.View>
						<ReactNative.View style={this.styles.mapContainer}>
							<MapboxGL.MapView ref={(c) => this._map = c}  onPress={this.locatePress.bind(this)} onLongPress={this.removeAnnotation} styleURL={MapboxGL.StyleURL.Dark} zoomEnabled={true} zoomLevel={1}  style={this.styles.map} key={this.renderAnnotations()}>
				          	<MapboxGL.UserLocation visible renderModer='normal'/>
				          	<MapboxGL.Camera ref={(c) => this._camera = c} centerCoordinate={[Number(this.event.coordinates[0]),Number(this.event.coordinates[1])]}   zoomEnabled={true} zoomLevel={13}/>
					         {this.renderAnnotations(this.state.visible)}
				          </MapboxGL.MapView>
						</ReactNative.View>
							<ReactNative.View style={this.styles.saveButton}>
							<ReactNative.Button style={this.styles.label} title='Save' color="white" onPress={this.updateEvent.bind(this, 'datelocation')}/>
							</ReactNative.View>
					</ReactNative.View>
				</ReactNative.View>
			)
		} else {
			return(
				<ReactNative.View style={this.styles.container}>
					<ReactNative.View style={this.styles.header}>
						<ReactNative.TouchableHighlight onPress={this.updateSelection.bind(this, 'details')}>
							<ReactNative.Text style={this.styles.headerLabel}>Details</ReactNative.Text>
						</ReactNative.TouchableHighlight>
						<ReactNative.TouchableHighlight onPress={this.updateSelection.bind(this, 'special')}>
							<ReactNative.Text style={this.styles.headerLabel}>Special</ReactNative.Text>
						</ReactNative.TouchableHighlight>
					</ReactNative.View>
					<ReactNative.ScrollView style={this.styles.contentContainer}>
						
					</ReactNative.ScrollView>
				</ReactNative.View>
			)
		}
		// return(
		// 	<ReactNative.View style={this.styles.container}>
		// 		<ReactNative.View style={this.styles.header}>
		// 			<ReactNative.TouchableHighlght onPress={this.getPage.bind(this, 'details')}>
		// 				<ReactNative.Text style={this.styles.headerLabel}>Details</ReactNative.Text>
		// 			</ReactNative.TouchableHighlght>
		// 			<ReactNative.TouchableHighlght onPress={this.getPage.bind(this, 'special')}>
		// 				<ReactNative.Text style={this.styles.headerLabel}>Special</ReactNative.Text>
		// 			</ReactNative.TouchableHighlght>
		// 		</ReactNative.View>
		// 		<ReactNative.ScrollView>
		// 			{this.state.page}
		// 		</ReactNative.ScrollView>
		// 	</ReactNative.View>
		// 	)
	}
}
ReactNative.AppRegistry.registerComponent('EditEvent', () => EditEvent);
export default EditEvent; 
