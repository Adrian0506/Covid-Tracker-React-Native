import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import MenuDrawer from 'react-native-side-drawer'
 
class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      style:{ transform: [{ scale: 0 }] }
    };
  }
 
  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };
 
  drawerContent = () => {
    return (
      <TouchableOpacity  onPress={this.toggleOpen} style={styles.animatedBox}>
        <Text>Choose a state</Text>
        {this.props.props.map(data => {
            return <Text onPress = {this.props.populateFunc.bind(this, data.state)}>{data.state}</Text>
        })}
      </TouchableOpacity>
    );
  };
 
  render() {
      console.log(this.props)
    return (
      <View style={styles.container}>
        <MenuDrawer 
          open={this.state.open} 
          drawerContent={this.drawerContent()}
          drawerPercentage={45}
          overlay={true}
          opacity={0}
        >
        </MenuDrawer>
        <Text onPress={this.toggleOpen} style={styles.realText}>States</Text>

      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    left: 220,
    marginTop: 10,
    zIndex: 1
  },
  animatedBox: {
    flex: 1,
    backgroundColor: "#563d7c",
    padding: 10,
    left: 0,
    zIndex: 0
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0
  },
  realText: {
      top: 30,
      left: -360,
      zIndex: 1000,
      color: 'white'
  }
})


export default Slider;