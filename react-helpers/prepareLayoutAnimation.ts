import { LayoutAnimation } from 'react-native';

function prepareLayoutAnimation() {
  LayoutAnimation.configureNext({
    duration: 200,
    update: {
      type: LayoutAnimation.Types.easeOut
    },
    delete: {
      type: LayoutAnimation.Types.easeOut,
      property: LayoutAnimation.Properties.opacity
    }
  });
}

export default prepareLayoutAnimation;