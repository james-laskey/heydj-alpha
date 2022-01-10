import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer, useNavigationBuilder, types} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AppRegistry, Dimensions, StyleSheet, Text, TextInput, Button, Platform, View, Image} from 'react-native';
import Home from './src/comps/Home/Home'
import Playground from "./src/comps/Playground/Playground"
import HostEvent from "./src/comps/HostEvent/HostEvent"
import Inbox from './src/comps/Inbox/Inbox'
import MyEvents from './src/comps/MyEvents/MyEvents'

const Drawer = createDrawerNavigator();
const drawerStyle = StyleSheet.create({
  drawer: {
    backgroundColor: "black",
    color: "#1DB954"
  },
  overlay: {
    color: "#1DB954"
  }
})
function Navigator(props){
    return (
            <NavigationContainer >
              <Drawer.Navigator drawerContentOptions={{
    activeTintColor: '#fff',
    activeBackgroundColor:"#296a5d",
    inactiveTintColor: '#b0b0b0',
    itemStyle: { marginVertical: 10 },}} drawerStyle={drawerStyle.drawer}  activeTintColor="red"   initialRouteName="Home">
                <Drawer.Screen  name="Home" component={Home} initialParams={{ user:props.user, access_token:props.access_token }} />
                <Drawer.Screen name="Direct Messages" component={Inbox} initialParams={{ user:props.user}} />
                <Drawer.Screen name="Playground" component={Playground} initialParams={{ user:props.user}} />
                <Drawer.Screen name="My Events" component={MyEvents} initialParams={{ user:props.user}} />
                <Drawer.Screen name="Hosting" component={HostEvent} initialParams={{ user:props.user}} />
              </Drawer.Navigator>
            </NavigationContainer>
        )
}
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user:'default',
      account_type: 'juker'
      }
      this.styles = StyleSheet.create({
        container: {
            height: Dimensions.get('window').height,
            backgroundColor: 'black',
            color: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
      },
      login: {
        marginTop: 50,
        width: 200,
        backgroundColor: "#1DB954",
        textAlign: 'center',
        borderRadius: 5
      },
      new: {
        marginTop: 25,
        backgroundColor: "#296a68",
        textAlign: 'center'
      },
      center: {
        textAlign: 'center',

      },
      heading: {
        fontWeight: 'bold',
        fontSize: 20,
        color: "#fff"
      },
      logo: {
        width: 200, 
        height: 125, 
      },
      newaccount: {
        margin: 5,
        padding:10,
        width: 300,
        alignItems: 'center'
      },
      text: {
        color:'#fff',
        textAlign: 'center',
        marginTop: 10
      },
      input: {
        backgroundColor:"#2e2e2e",
        marginTop: 20,
        width: 200,
        textAlign:'center',
        borderRadius: 5,
        padding: 5,
        fontSize: 17
      },
      selected: {
        backgroundColor: "#1DB954",
        padding: 5,
        borderRadius: 5,
        margin: 5
      },
      nonSelected: {
        padding: 5,
        borderRadius: 5,
        margin: 5
      }
    });
      this._authenticateUser = this._authenticateUser.bind(this)
      this.selectType = this.selectType.bind(this)
      this._createUser = this._createUser.bind(this)
      this._verifyData = this._verifyData.bind(this)
      this._shallowCompare = this._shallowCompare.bind(this)
      this.findSelected = this.findSelected.bind(this)
  }
  _authenticateUser(){
    this.setState({user:{userid:'LfC0qdoWYe',jukername:'TheJuker',account_type:"juker", fullname:'James Laskey'}})
    // try{
    //     if(this.state.password.length>8){
    //         fetch('https://juuke.herokuapp.com/authenticate',{
    //             method:"POST",
    //             headers: {
    //                 'Accept': 'application/json, text/plain',
    //                 'Content-Type': 'application/json',
    //             },
    //             body:JSON.stringify({juker:this.state.jukername,password:this.state.password})
    //         })
    //         .then(response=>{return response.json()})
    //         .then(json=>{
    //             if(!json.user){
    //                 alert("No User by Those Credentials")
    //             } else {
    //                 this.setState({user:json.user})
    //             }
    //         })
    //     }
    // }
    // catch(err){
    //     alert("password not long enough")
    // }
        
  }
  _createUser(){
        this.setState({user:'new'})
  }
  findSelected(type){
    if (this.state.account_type=='juker' && type=='juker'){
      return this.styles.selected
    } 
    if (this.state.account_type=='host' && type=='host'){
      return this.styles.selected
    } 
    if(this.state.account_type=='business' && type=='business'){
      return this.styles.selected
    } else {
      return this.styles.nonSelected
    }
  }
  selectType(type){
    this.setState({account_type:type})
  }
  _shallowCompare(first,second){
    for ( var fChar in first){
        if ( first[fChar]> second[fChar]){
            return false
        }

    }
    return true
}
  _verifyData(){
        var body =  {fullname:'', email:'', jukername:'', password:''};
        if(this._shallowCompare(this.state.firstpass, this.state.secondpass)==true){
            body['password'] =  this.state.secondpass
            try{
                body['fullname'] = this.state.fullname
            }
            catch(err){
                alert("Enter Full Name")
            }
            try{
                if (this.state.email.split('@')[1].split('.')){
                    body['email'] = this.state.email
                }
                
            }
            catch(err1){
                alert("Enter Email")
            }
            try{
                body['jukername'] = this.state.jukername
            }
            catch(err2){
                alert('Enter a Jukername')
            }
            body['account_type']= this.state.account_type
            fetch('https://juuke.herokuapp.com/newJuker', {
                method:"POST",
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(body)
            })
            .then(response=>{return response.json()})
            .then(json=>{
                if (json.user==false){
                    alert("Invalid Code")
                } else {
                    this.setState({user:json.user})
                }
        })
            
        }

  }
  componentDidMount(){
    
  }
  render(){
    if (this.state.user=='default'){
      return(
          <View style={this.styles.container}>
                <Image source={require('./assets/logo-med.png')} style={this.styles.logo} />
                <TextInput style={this.styles.input} textContentType='username' color="#fff" onChangeText={(jukername) => this.setState({ jukername })}/>
                <TextInput style={this.styles.input} textContentType='password' secureTextEntry={true} color="#fff" onChangeText={(password) => this.setState({ password })}/>
                <View style={this.styles.login}>
                    <Button color={"#fff"}  onPress={this._authenticateUser} title="Login"/> 
                </View>
                 <View >
                    <Button color={"#fff"}  onPress={this._createUser} title="Create New Account →"/> 
                </View>     
        </View>
        )
    }
    if (this.state.user=='new'){
        return(
            <View style={this.styles.container}>
                <Text style={this.styles.heading}>Enter Details</Text>
                <View style={{flexDirection:'row'}}>
                  <View style={this.findSelected('juker')}>
                    <Button title='Juker' onPress={this.selectType.bind(this, 'juker')} color="white"/>
                  </View>
                  <View style={this.findSelected('host')}>
                    <Button title='Host' onPress={this.selectType.bind(this, 'host')} color="white"/>
                  </View>
                  <View style={this.findSelected('business')}>
                    <Button title='Business' onPress={this.selectType.bind(this, 'business')} color="white"/>
                  </View>
                </View>
                <View style={this.styles.newaccount}>
                    <Text style={this.styles.text} >Full Name</Text>
                    <TextInput style={this.styles.input} onChangeText={(fullname) => this.setState({ fullname })}  autoCapitalize='words' color="#fff" />
                    <Text style={this.styles.text}>Email</Text>
                    <TextInput style={this.styles.input} onChangeText={(email) => this.setState({ email })} color="#fff"/>
                    <Text style={this.styles.text}>Create A Jukername</Text>
                    <TextInput style={this.styles.input} onChangeText={(jukername) => this.setState({ jukername })} color="#fff" />
                    <Text style={this.styles.text}>Create a Password</Text>
                    <TextInput style={this.styles.input} onChangeText={( firstpass ) => this.setState({ firstpass })} color="#fff" secureTextEntry={true} />
                    <Text style={this.styles.text}>Re-enter Password</Text>
                    <TextInput style={this.styles.input} onChangeText={( secondpass ) => this.setState({ secondpass })} color="#fff" secureTextEntry={true} />
                    <View style={this.styles.new}>
                        <Button color={"#fff"}  onPress={this._verifyData} title="Create Account"/> 
                    </View>
                </View>
            </View>
            )
    }
     else {
      return(
        <Navigator user={this.state.user}/>
        )
    }
    
  }
}
AppRegistry.registerComponent('App', () => App);
export default App
