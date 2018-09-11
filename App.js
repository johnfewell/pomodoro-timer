import React from 'react';
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native';
import { Constants } from 'expo';

import {vibrate} from './utils'

export default class App extends React.Component {
  constructor(props: Object) {
    super(props);
    this.state = { timer: 1500 };
  }

  componentDidMount() {
    this.setIntervalForTimer();
  }

  resetTimer = () => {
    this.setState({timer: 1500 })
  }

  // test

  setIntervalForTimer() {
    this.interval = setInterval(() => this.setState({ timer: --this.state.timer }), 1000);
  }

  componentDidUpdate() {
    if (this.state.timer === 1) {
      vibrate()
      clearInterval(this.interval);
    }
  }

 fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}> {this.fmtMSS(this.state.timer)} </Text>
        <Button onPress={() => this.resetTimer()} title='Reset Timer' style={styles.paragraph} />
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
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
