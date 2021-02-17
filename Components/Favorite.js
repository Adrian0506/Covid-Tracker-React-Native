import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, AsyncStorage, Modal} from 'react-native';
import Axios from 'axios'
import { NavigationBar } from '@shoutem/ui'
import { NavigationContainer } from '@react-navigation/native';
import Slider from './Slider.js'


 class Favorite extends React.Component {

  constructor() {
    super()
    this.state = {
      favorites: []
    }
  }
  
  componentDidUpdate () {
    console.log('Component Updated.')
  }
  componentDidMount () {
  AsyncStorage.getAllKeys().then(data => {
    console.log(data)
    this.setState({
      favorites: data
    })
  })
}

async getCases(arg) {
  let data = ''
  await Axios(`https://api.covidtracking.com/v1/states/${arg}/current.json`).then(covid => {
   data = covid.data.positive    
   return data
  }).catch(err => {
    console.log('theres err', err)
  })
  return data

 }
 removeEntry(args) {
   AsyncStorage.removeItem(args, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('Item has been deleted')
         AsyncStorage.getAllKeys().then(data => {
           this.setState({
             favorites: data
           })
         })
      }
   })

  
 }
   render () {
   return (
    <View style = {styles.container}>
     <View style = {styles.nav}>
      <Text style = {styles.covtext}>Covid-Tracker</Text>
     </View>
     {this.state.favorites.length !== 0 ? this.state.favorites.map(item => {
       return <View style = {styles.squareView}><Text style = {styles.eachItem} >State: {item}</Text>
       <Text>Cases: 0</Text>
       <Text>Postive Today: 0</Text>
       <Text style = {{left: "90%", top: "-40%"}} onPress = {this.removeEntry.bind(this, item)}>X</Text>
       <Text>Deaths: 0</Text>
       
       </View>
       
     }) : <Text>Hmm... it looks like you have no favorites</Text>}
     </View>

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
      width: '100%',
      zIndex: 5
    },
    covtext: {
      position: 'absolute',
      left: '38%',
      fontWeight: 'bold',
      top: '59%',
      color: 'white'
    },
    graph: {
      top: '-15%'
    },
    eachItem: {
      fontWeight: 'bold'
    },
    squareView: {
      backgroundColor: "#E6E6E6",
      width: 375,
      height:70
    }
  });

  export default Favorite;