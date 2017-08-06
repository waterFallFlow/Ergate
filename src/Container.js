/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import SCREEN   from './screen';
import ItemContainer from './itemContainer';
import { filterCurrency } from './util';

export default class Container extends Component {

  constructor(props) {
    super(props);
    this.state = { arr: props.USDTArr };
  }

  shouldComponentUpdate() {
    return false;
  }


  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={[styles.container, this.props.style]}>
        <View style={{marginVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
          <Text>
            货币对
          </Text>
          <Text>
            卖出
          </Text>
          <Text>
            买入
          </Text>
        </View>
        {this.state.arr.map((item) => {
          return (
            <ItemContainer key={item+Math.random(10000)} currencyPairs={filterCurrency(item)} />
          )
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN.WIDTH,
    height: SCREEN.HEIGHT - 94,
    backgroundColor: '#F5FCFF',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
