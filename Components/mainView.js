import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Animated, Image, Button, AsyncStorage } from 'react-native';
import Axios from 'axios'
import { NavigationBar } from '@shoutem/ui'
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LineGraph from './LineGraph.js'
import LottieView from 'lottie-react-native';
import MenuDrawer from 'react-native-side-drawer'
import Slider from './Slider.js'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const screenWidth = Dimensions.get("window").height;





class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentState: 'Global USA cases',
      count: 0,
      cases: 0,
      positiveCase: 0,
      weekCovid: [0, 0, 0, 0, 0, 0, 0],
      fadeOut: new Animated.Value(0),
      loader: true,
      allPlaces: [],
      status: false,
      currentlySelected: 'USA',
      approved: false,
      deathCase: 0
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
        cases: datas.data[0].positive,
        postiveCase: datas.data[0].positiveIncrease,
        deathCase: datas.data[0].death
      })
    })

    Axios('https://api.covidtracking.com/v1/us/daily.json').then(covid => {
      let weekCovids = covid.data.slice(0, 7)
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

    Axios('https://api.covidtracking.com/v1/states/current.json').then(covid => {
      this.setState({
        allPlaces: covid.data
      })
    })
  }


  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  changeStatus() {
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

  renderState(arg) {
    console.log(arg)
    Axios(`https://api.covidtracking.com/v1/states/${arg}/current.json`).then(covid => {
      console.log(covid.data)
      this.setState({
        currentState: `Global ${covid.data.state} cases`,
        cases: covid.data.positive,
        currentlySelected: covid.data.state,
        postiveCase: covid.data.positiveIncrease,
        deathCase: covid.data.death,
        status: false
      })
    })

    Axios(`https://api.covidtracking.com/v1/states/${arg}/daily.json`).then(covid => {
      this.setState({
      weekCovid: [covid.data[0].positiveIncrease, covid.data[1].positiveIncrease, covid.data[2].positiveIncrease,covid.data[3].positiveIncrease, covid.data[4].positiveIncrease, covid.data[5].positiveIncrease, covid.data[6].positiveIncrease]
      })
    })
  }

  async performSave(arg) {
    try {
      await AsyncStorage.setItem(this.state.currentlySelected, this.state.currentState)
       this.setState({
         approved: true
       })

       setTimeout(() => {
         this.setState({
        approved: false
      })
       }, 1500)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    if (this.state.currentState === 'Global USA cases') {
      return (
        <View style={styles.container}>
          {this.state.approved ? <LottieView source = {require('../assets/check.json')} autoPlay/> : null }
          <Slider props = {this.state.allPlaces} populateFunc = {this.renderState.bind(this)}></Slider>

          <View style={styles.nav}></View>
          <View style={styles.nav}>
            <Text style={styles.covtext}>Covid-Tracker</Text>
          </View>
        
          <View style={styles.graph}>
            <Text style={styles.sevenDayGrowth}>Seven day growth</Text>
            <LineGraph props={this.state.weekCovid}></LineGraph>
          </View>
          <View style={styles.cases}>
            <Text style={styles.currentState}>{this.state.currentState}</Text>
            <Text style={styles.posColor}>{this.numberWithCommas(this.state.cases)}</Text>
          </View>
          <StatusBar style="auto" />
          <View style={styles.casesToday}>
            <Text style = {styles.posCase}>Cases Today</Text>
            <Text style={styles.posText}>{this.state.postiveCase}</Text>
          </View>
          <View style={styles.deaths}>
            <Text style = {styles.posCase}>Total Death</Text>
            <Text style={styles.deathText}>{this.state.deathCase}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          {this.state.approved ? <LottieView style = {{zIndex: 5}}source = {require('../assets/checks.json')} autoPlay/> : null }
          <Slider props = {this.state.allPlaces} populateFunc = {this.renderState.bind(this)}></Slider>

          <View style={styles.nav}></View>
          <View style={styles.nav}>
            <Text style={styles.covtext}>Covid-Tracker</Text>
          </View>

          <View style={styles.graph}>
            <Text style={styles.sevenDayGrowth}>Seven day growth</Text>
            <LineGraph props={this.state.weekCovid}></LineGraph>
          </View>
          <View style={styles.cases}>
            <Text style={styles.currentState}>{this.state.currentState}</Text>
            <Text style={styles.posColor}>{this.numberWithCommas(this.state.cases)}</Text>
          </View>
          <StatusBar style="auto" />
          <View style={styles.casesToday}>
            <Text style = {styles.posCase}>Cases Today</Text>
            <Text style={styles.posText}>{this.state.postiveCase}</Text>
          </View>
          <View style={styles.deaths}>
            <Text style = {styles.posCase}>Total death</Text>
            <Text style={styles.deathText}>{this.state.deathCase}</Text>
          </View>
          <Button title = 'Save to your favorites.' backgroundColor = '#f194ff' onPress={this.performSave.bind(this, this.state.currentlySelected)}></Button>
        </View>
      );
    }
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
    top: 0,
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
    color: 'white',
    zIndex: 20
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
    width: 100,
    height: "100%",
    backgroundColor: 'purple'
  },
  sevenDayGrowth: {
    position: "absolute",
    fontWeight: "bold",
    left: "30%",
    top: "-5%"
  },
  menu: {
    position: "absolute",
    top: "50%",
    left: "10%",
    color: "white"
  },
  casesToday: {
    backgroundColor: "rgba(230,230, 230,1)",
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 71,
    width: 130,
    left: "-20%",
    top: "1%",
    height: 85
  },
  deaths: {
    backgroundColor: "rgba(230,230, 230,1)",
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 71,
    width: 130,
    left: "20%",
    top: "-10.5%",
    height: 85
  },
  deathText: {
    color: "red",
    fontWeight: "bold",
    left: '30%',
    top: '20%'
  },
  posText: {
    fontWeight: "bold",
    color: '#8080FF',
    left: '30%',
    top: '20%'
  },
  scroller: {
    backgroundColor: '#563d7c',
    marginHorizontal: 20,
    width: 200,
    height: '100%',
    left: -100,
    top: 350,
    zIndex: 5
  },
  posCase: {
    fontWeight: 'bold',
    left: '15%',
    top: '10%'
  }
});


export default App