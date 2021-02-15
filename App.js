import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Animated} from 'react-native';
import Axios from 'axios'
import { NavigationBar } from '@shoutem/ui'
import { NavigationContainer } from '@react-navigation/native';
import Favorite from './Components/Favorite.js'
import { MaterialCommunityIcons } from '@expo/vector-icons';


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
      postiveCase: 0,
      weekCovid: [0,0,0,0,0,0,0],
      fadeOut: new Animated.Value(0)
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
      console.log(values, 'at')
      this.setState({
           weekCovid: values
      })

    })
  }


  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  
  render () {
  
  return (
    <View style={styles.container}>
      <View style = {styles.nav}></View>
      <View style = {styles.nav}>
     <Text style = {styles.covtext}>Covid-Tracker</Text>
      </View>
      <View style = {styles.graph}>
      <Text style = {styles.sevenDayGrowth}>Seven day growth</Text>
      <LineGraph props = {this.state.weekCovid}></LineGraph>
      </View>
      <View style = {styles.cases}>
      <Text style = {styles.currentState}>{this.state.currentState}</Text>
      <Text style = {styles.posColor}>{this.numberWithCommas(this.state.cases)}</Text>
      </View>
      <StatusBar style="auto" />
      <Text>Covid Cases: {this.state.cases}</Text>
      <Text>Cases Today: {this.state.postiveCase}</Text>

    </View>
  );
}
}

const LineGraph = function (props) {
   
  console.log(props)
  return  (
    <LineChart
    data={{
      labels: ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat","Sun"],
      datasets: [
        {
          data: [
            props.props[0],
            props.props[1],
            props.props[2],
            props.props[3],
            props.props[4],
            props.props[5],
            props.props[6]
          ]
        }
      ]
    }}
    width= {340} // from react-native
    height={220}
    yAxisLabel=""
    yAxisSuffix=""
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#563d7c",
      backgroundGradientTo: "#563d7c",
      strokeWidth: 5,
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 10
       
      },
      propsForDots: {
        r: 8,
        strokeWidth: '1',
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 18
    }}
  />
    
  )
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
    width:100,
    height:"100%",
    backgroundColor: 'purple'
  },
  sevenDayGrowth: {
    fontWeight: "bold",
    left: "30%"
  }
});




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

function Apps () {
  return (
    <NavigationContainer>
     <Tabber/>
    </NavigationContainer>


  )
}

export default Apps;