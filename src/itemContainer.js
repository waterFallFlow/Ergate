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
import { calculateProfit } from './util';

const ORDER_BOOK_PREFIX = 'https://poloniex.com/public?command=returnOrderBook&currencyPair=';
const DEPTH = '&depth=1';

const CurrencyItem = ({ currencyPair, res }) => (
  <View style={[{marginTop: 20}, styles.textContainer]}>
    <Text>
      {currencyPair}
    </Text>
    <Text>
      {res !== '-' ? res.asks[0][0] : '-'}
    </Text>
    <Text>
      {res !== '-' ? res.bids[0][0] : '-'}
    </Text>
  </View>
)

export default class ItemContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currencyPairArr: props.currencyPairs,
      minProfit: 0,
      maxProfit: 0,
      seq1: 0,
      seq2: 0,
      seq3: 0
    }
    this.currencyArr = ['-', '-', '-'];
  }

  componentWillUnmount() {
    this.timer1 && clearInterval(this.timer1);
    this.timer2 && clearInterval(this.timer2);
    this.timer3 && clearInterval(this.timer3);
  }

  componentWillMount() {
    this.timer1 = setInterval(() => {
      this.fetchOrderbookData(1);
    }, 2000);
    this.timer2 = setInterval(() => {
      this.fetchOrderbookData(2);
    }, 2000)
    this.timer3 = setInterval(() => {
      this.fetchOrderbookData(3);
    }, 2000)
  }

  fetchOrderbookData(index) {
    fetchApi(ORDER_BOOK_PREFIX + this.processCurrencyPair(index-1) + DEPTH, (res) => {
      this.currencyArr[index-1] = res;
      if (index === 1) {
        if (res.seq !== this.state.seq1) {
          this.updateProfits();
          this.setState({ seq1: res.seq });
        }
      } else if (index === 2) {
        if (res.seq !== this.state.seq2) {
          this.updateProfits();
          this.setState({ seq2: res.seq });
        }
      } else if (index === 3) {
        if (res.seq !== this.state.seq3) {
          this.updateProfits();
          this.setState({ seq3: res.seq });
        }
      }
    });
  }

  updateProfits() {
    if (this.currencyArr[0] !== '-' && this.currencyArr[1] !== '-' && this.currencyArr[2] !== '-') {
      const res = calculateProfit(this.currencyArr);
      this.setState({ minProfit: res.minProfit, maxProfit: res.maxProfit });
    }
  }

  processCurrencyPair(index) {
    const { currencyPairArr } = this.state;
    let currencyPair = currencyPairArr[0] + '_' + currencyPairArr[1];
    let desIndex = index+1 >= currencyPairArr.length ? 0 : index+1;
    if (index+1 >= currencyPairArr.length) {
      currencyPair = currencyPairArr[desIndex] + '_' + currencyPairArr[index];
    } else {
      currencyPair = currencyPairArr[index] + '_' + currencyPairArr[desIndex];
    }
    return currencyPair;
  }

  render() {
    const { currencyPairArr } = this.state;
    const bgColor = this.state.minProfit > global.cash ? '#00440099' : '#99000099';
    return (
      <View style={styles.itemContainer}>
        <CurrencyItem currencyPair={this.processCurrencyPair(0)} res={this.currencyArr[0]} />
        <CurrencyItem currencyPair={this.processCurrencyPair(1)} res={this.currencyArr[1]} />
        <CurrencyItem currencyPair={this.processCurrencyPair(2)} res={this.currencyArr[2]} />
        <View style={[{marginTop: 10, width: SCREEN.WIDTH, height: 40, backgroundColor: bgColor}, styles.textContainer]}>
          <Text style={{color: 'white'}}>
            最小收益 {this.state.minProfit.toFixed(2)}
          </Text>
          <Text style={{color: 'white'}}>
            最大收益 {this.state.maxProfit.toFixed(2)}
          </Text>
        </View>
      </View>
    );
  }

}

const fetchApi = (url, callback) => {
  fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((responseData) => {
    callback && callback(responseData);
  })
  .catch((error) => {
    console.log('---- fetch error: ----', error);
  });
}

const styles = StyleSheet.create({
  itemContainer: {
    width: SCREEN.WIDTH,
    height: 160,
    backgroundColor: '#00000011',
    borderBottomColor: '#00000029',
    borderBottomWidth: SCREEN.PIXEL
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});
