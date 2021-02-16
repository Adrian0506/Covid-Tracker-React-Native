import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Animated, Image} from 'react-native';
import Axios from 'axios'
import { NavigationBar } from '@shoutem/ui'
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LineGraph from './LineGraph.js'

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const screenWidth = Dimensions.get("window").width;





 class App extends React.Component {
  constructor(props) {
   super(props)
    this.state = {
      currentState: 'Global USA cases',
      count: 0,
      cases: 0,
      positiveCase: 0,
      weekCovid: [0,0,0,0,0,0,0],
      fadeOut: new Animated.Value(0),
      loader: true,
      allPlaces: [],
      status: false
    }
  }

  fadeOut = () => {
     Animated.timing(this.state.fadeOut, {
       toValue: 0,
       duration: 1000
     })
  }

  componentDidMount() {
    Axios('https://api.covidtracking.com/v1/us/current.json').then(datas => {
      this.setState({
        cases: datas.data[0].positive ,
        postiveCase: datas.data[0].positiveIncrease
      })
    })

    Axios('https://api.covidtracking.com/v1/us/daily.json').then(covid => {
      let weekCovids = covid.data.slice(0,7)
      let values = []
      for (let i = 0; i <= covid.data.length; i++) {
          values.push(covid.data[i].positiveIncrease)
          if (i === 7) {
            break;
          }
      }
      this.setState({
           weekCovid: values
      })

    })
  }


  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

changeStatus () {
  if (this.state.status === false) {
    this.setState({
      status: true
    })
  } else {
    this.setState({
      status: false
    })
  }
}
  
  render () {
  return (
    <View style={styles.container}>
      <View style = {styles.nav}></View>
      <View style = {styles.nav}>
     <Text style = {styles.covtext}>Covid-Tracker</Text>
     <Text style = {styles.menu} onPress = {this.changeStatus.bind(this)}>Menu</Text>
      </View>
      {this.state.status ? <ScrollView style = {styles.scroller}><Text>Toggled</Text></ScrollView> : null}
      <View style = {styles.graph}>
      <Text style = {styles.sevenDayGrowth}>Seven day growth</Text>
      <LineGraph props = {this.state.weekCovid}></LineGraph>
      </View>
      <View style = {styles.cases}>
      <Text style = {styles.currentState}>{this.state.currentState}</Text>
      <Text style = {styles.posColor}>{this.numberWithCommas(this.state.cases)}</Text>
      </View>
      <StatusBar style="auto" />
      <View style = {styles.casesToday}>
      <Text>Cases Today</Text>
      <Text style = {styles.posText}>{this.state.postiveCase}</Text>
      </View>
      <View style = {styles.deaths}>
      <Text>Deaths Today</Text>
      <Text style = {styles.deathText}>{this.state.postiveCase}</Text>
      </View>
    </View>
  );
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
      left:'38%',
      fontWeight: 'bold',
      top: '59%',
      color: 'white'
    },
    graph: {
      top: '0%'
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
      left: "30%",
      top:"-5%"
    },
    menu: {
        position: "absolute",
        top:"50%",
        left: "10%",
        color: "white"
    },
    casesToday: {
        backgroundColor: "rgba(230,230, 230,1)",
        borderWidth: 0,
        borderColor: "#000000",
        borderRadius: 71,
        width: 130,
        left:"-20%",
        height: 85
    },
    deaths: {
        backgroundColor: "rgba(230,230, 230,1)",
        borderWidth: 0,
        borderColor: "#000000",
        borderRadius: 71,
        width: 130,
        left:"20%",
        top: "-11%",
        height: 85
    },
    deathText: {
        color: "red",
        fontWeight: "bold"
    },
    posText: {
        fontWeight: "bold",
        color: '#8080FF'
    },
    scroller: {
      backgroundColor: '#563d7c',
      marginHorizontal: 20
    }
  });
  

export default App