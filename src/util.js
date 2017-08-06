export const filterCurrency = (cymbol: string) => {
  if (cymbol) {
    const strArr = cymbol.split('_');
    strArr[0] = filterSymbol(strArr[[0]]);
    strArr[1] = filterSymbol(strArr[[1]]);
    return strArr;
  } else {
    return [];
  }
}

export const calculateProfit = (arr) => {
  const obj = { minProfit: 0, maxProfit: 0 };
  const discount = 1*(1-global.maker)*(1-global.maker)*(1-global.taker);
  obj.minProfit = parseFloat(global.cash)/arr[0].asks[0][0]/arr[1].asks[0][0]*arr[2].bids[0][0]*discount;
  obj.maxProfit = parseFloat(global.cash)/arr[0].bids[0][0]/arr[1].bids[0][0]*arr[2].asks[0][0]*discount;
  return obj;
}


const filterSymbol = (str) => {
  switch (str) {
    case 'U':
      return 'USDT';
    case 'X':
      return 'XMR';
    case 'E':
      return 'ETH';
    case 'B':
      return 'BTC';
    default:
      return str;
  }
}
