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
  TextInput,
  ScrollView
} from 'react-native';
import SCREEN from './screen';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from './TabBar';
import Container from './Container';

global.cash  = '10000';
global.taker = 0.0025;
global.maker = 0.0015;
const USDTArr = ['U_X_NXT', 'U_X_LTC', 'U_X_DASH', 'U_X_ZEC',  'U_E_ZEC', 'U_E_ETC', 'U_E_REP'];
const XMRArr  = ['B_X_LTC', 'B_X_MAID', 'B_X_DASH', 'B_X_ZEC'];
const ETHArr  = ['B_E_ZEC', 'B_E_ETC', 'B_E_GNT',  'B_E_REP',  'B_E_STEEM', 'B_E_LSK'];
const BTCArr  = ['U_B_ETH', 'U_B_XRP', 'U_B_LTC',  'U_B_ETC',  'U_B_STR', 'U_B_DASH', 'U_B_XMR', 'U_B_ZEC', 'U_B_REP'];

export default class Ergate extends Component {

  constructor() {
    super();
    this.state = { cash: '12000' , page: 0};
  }

  onPressTabBar(index) {
    this.tabView.goToPage(index);
    this.setState({ page: index });
  }

  changeTab(e) {
    switch (e) {
      case 0:
        this.setState({ page: 0 });
        break;
      case 1:
        this.setState({ page: 1 });
        break;
      case 2:
        this.setState({ page: 2 });
        break;
      case 3:
        this.setState({ page: 3 });
        break;
      default:
        return;
    }
  }

  render() {
    return (
      <View style={{width: SCREEN.WIDTH, height: SCREEN.HEIGHT, paddingTop: 20, backgroundColor: '#F3F3F3'}}>
        <View style={[styles.center, {width: SCREEN.WIDTH, height: 40, backgroundColor: 'rgba(22,22,22,0.8)', flexDirection: 'row'}]}>
          <Text style={{color: 'white'}}>
            本金：
          </Text>
          <TextInput
            style={[styles.textInputStyle]}
            selectionColor={'#28BC90'}
            placeholderTextColor={'#333333'}
            value={cash}
            keyboardType={'numeric'}
            onChangeText={(text) => { global.cash = text; this.setState({cash: text}); }}
          />
        </View>
        <ScrollableTabView
          onScroll={(e) => {this.changeTab(e)}}
          renderTabBar={() => <TabBar ref="tabbar" page={this.state.page} onPress={this.onPressTabBar.bind(this)} />}
          ref={(e) => { this.tabView = e; }}
        >
          <Container USDTArr={USDTArr} type="U" />
          <Container USDTArr={XMRArr}  type="X" style={{backgroundColor: '#95732522'}} />
          <Container USDTArr={ETHArr}  type="E" style={{backgroundColor: '#51252322'}} />
          <Container USDTArr={BTCArr}  type="B" style={{backgroundColor: '#09285822'}} />
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputStyle: {
    width: 100,
    height: 30,
    marginTop: 5,
    color: 'white',
    borderWidth:1,
    borderColor: 'white',
    paddingLeft: 10
  }
});
