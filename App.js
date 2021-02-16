import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Animated} from 'react-native';
import Axios from 'axios'
import { NavigationBar } from '@shoutem/ui'
import { NavigationContainer } from '@react-navigation/native';
import Favorite from './Components/Favorite.js'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import App from './Components/mainView.js'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import LottieView from 'lottie-react-native';
const screenWidth = Dimensions.get("window").width;











const Tab = createBottomTabNavigator();

function Tabber () {
  return (
    <Tab.Navigator>
    <Tab.Screen name="Home" component={App} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
 />
    <Tab.Screen name="Favorites" component={Favorite} options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="star" color={color} size={size} />
          ),
        }}/>
  </Tab.Navigator>

  )
}

class Apps extends React.Component {
  constructor() {
    super()
    this.state = {
      loader: true
    }
  }
  
  
  
  render () {
    setTimeout(async () => {
     this.setState({
       loader: false
     })
    }, 2000) 
   if (this.state.loader === true) {
     return (
       <View style = {styles.container}>
         <LottieView ref = {animation => {
           this.animation = animation;
         }} source = {require('./assets/heart.json')} autoPlay></LottieView>
       </View>
     )
   }
  
    return (
    <NavigationContainer>
     <Tabber/>
    </NavigationContainer>


  )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nav: {
    position: 'absolute',
    top:0,
    color: 'white',
    height: '10%',
    backgroundColor: '#563d7c',
    width: '100%'
  },
  covtext: {
    position: 'absolute',
    left: '38%',
    fontWeight: 'bold',
    top: '59%',
    color: 'white'
  },
  graph: {
    top: '-10%'
  },
  cases: {
    backgroundColor: "rgba(230,230, 230,1)",
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 71,
    width: 311,
    height: 85
  },
  posColor: {
    color: '#8ACA2B',
    fontSize: 30,
    left: '22%',
    top: '10%',
    fontWeight: "bold"
  },
  currentState: {
    fontWeight: "bold",
    left: "28%",
    top: "5%"
  },
  ani: {
    position: "absolute",
    width:100,
    height:"100%",
    backgroundColor: 'purple'
  },
  sevenDayGrowth: {
    position: "absolute",
    fontWeight: "bold",
    left: "30%"
  }
});


export default Apps;