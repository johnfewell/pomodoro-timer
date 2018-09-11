import React from 'react';
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native';
import { Constants } from 'expo';

import {vibrate} from './utils'

export default class App extends React.Component {
  constructor(props: Object) {
    super(props);
    this.state = { timer: 10,
                   breakInterval: false };
  }

    resetTimer = () => {
    this.setState({timer: 1500 })
  }

  startTimer = () => {
    this.clockCall = setInterval(() => {
     this.decrementClock();
    }, 1000);
   }

   onButtonStop = () => {
    clearInterval(this.state.timer);
   }

   decrementClock = () => {  
    if(this.state.timer === 0) this.timerOver()
    this.setState((prevstate) => ({ timer: prevstate.timer-1 }));
   };
   
   componentWillUnmount() {
    clearInterval(this.clockCall);
   }

  setBreakOrActiveTimer(){
    if (this.state.breakInterval === false){
      this.setState({ timer: 11 })
    } else {
      this.setState({ timer: 5 })
    }
  }

  timerOver() {
    vibrate()
    clearInterval(this.clockCall)
    this.setState({ breakInterval: !this.state.breakInterval })
    this.setBreakOrActiveTimer()
  }

 fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s}

  render() {
    const bgStyleWorkOrBreak = this.state.breakInterval ? styles.containerBreak : styles.containerWork

    return (
      
      <View style={[styles.container, bgStyleWorkOrBreak]}  >
        <Text style={styles.paragraph}> {this.fmtMSS(this.state.timer)} </Text>
        <Button onPress={() => this.resetTimer()} title='Reset Timer' style={styles.paragraph} />
        <Button onPress={() => this.startTimer()} title='Start'/>
        <Button onPress={() => this.onButtonStop()} title='Stop!!!'/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  containerWork: {
    backgroundColor: '#ec0000',
  },
  containerBreak: {

    backgroundColor: '#008000',
  },
  paragraph: {
    margin: 24,
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
