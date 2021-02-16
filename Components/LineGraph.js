
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Animated} from 'react-native';
import Axios from 'axios'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";


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


  export default LineGraph;