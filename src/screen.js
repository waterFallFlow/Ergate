import { PixelRatio } from 'react-native';
import Dimensions from 'Dimensions';

const SCREEN = {
  RATIO: PixelRatio.get(),
  PIXEL: 1 / PixelRatio.get(),
  WIDTH: Dimensions.get('window').width,
  HEIGHT: Dimensions.get('window').height,
  fontScale: (size) => {
    return Math.round(size * SCREEN.WIDTH/375);
  },
  getWidthPercent: (percent) => {
    return SCREEN.WIDTH*percent/100;
  },
  getHeightPercent: (percent) => {
    return SCREEN.HEIGHT*percent/100;
  }
};

export default SCREEN;
