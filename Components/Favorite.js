import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, AsyncStorage} from 'react-native';
import Axios from 'axios'
import { NavigationBar } from '@shoutem/ui'
import { NavigationContainer } from '@react-navigation/native';



 class Favorite extends React.Component {

  constructor() {
    super()
    this.state = {
      favorites: []
    }
  }

  componentDidMount () {
  AsyncStorage.getAllKeys().then(data => {
    console.log(data)
    this.setState({
      favorites: data
    })
  })
}
   render () {
   return (
    <View style = {styles.container}>
     <View style = {styles.nav}>
      <Text style = {styles.covtext}>Covid-Tracker</Text>
     </View>
     {this.state.favorites.length !== 0 ? this.state.favorites.map(item => {
       return <Text>{item}</Text>
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
      top: '-15%'
    }
  });

  export default Favorite;