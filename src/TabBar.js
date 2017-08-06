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
  TouchableOpacity
} from 'react-native';
import SCREEN from './screen';

const arr = ['USDT', 'XMR', 'ETH', 'BTC'];

export default class TabBar extends Component {

  render() {
    const { page } = this.props;
    return (
      <View style={styles.itemContainer}>
        {arr.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => this.props.onPress(index)}
              style={[styles.center, styles.itemStyle, {backgroundColor: index == page ? '#853564' : 'rgba(111,111,111,0.9)' }]}
              key={item}
            >
              <Text style={{color: 'white'}}>
                {item}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemStyle: {
    flex: 1,
    backgroundColor:  'rgba(111,111,111,0.9)',
    borderRightColor: 'rgba(111,111,111,0.5)',
    borderRightWidth: SCREEN.PIXEL
  },
  itemContainer: {
    width: SCREEN.WIDTH,
    height: 44,
    flexDirection: 'row'
  }
});
