import { ViewStyle, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const scale = width / 375; // 375 is standard iPhone width

const w = (size: number) => Math.round(size * scale);
const h = (size: number) => Math.round(size * scale);

export const UIHelper = {
  // Vertical spacing
  verticalSpaceSmall: { height: h(10) } as ViewStyle,
  verticalSpaceMedium: { height: h(20) } as ViewStyle,
  verticalSpaceMediumLarge: { height: h(25) } as ViewStyle,
  verticalSpaceSemiLarge: { height: h(40) } as ViewStyle,
  verticalSpaceLarge: { height: h(60) } as ViewStyle,
  verticalSpaceExtraLarge: { height: h(100) } as ViewStyle,

  verticalSpace: (height: number): ViewStyle => ({ height: h(height) }),

  // Horizontal spacing
  horizontalSpaceSmall: { width: w(10) } as ViewStyle,
  horizontalSpaceMedium: { width: w(20) } as ViewStyle,
  horizontalSpaceSemiLarge: { width: w(40) } as ViewStyle,
  horizontalSpaceLarge: { width: w(60) } as ViewStyle,

  horizontalSpace: (widthArg: number): ViewStyle => ({ width: w(widthArg) }),

  kDefaultPadding: w(20),
};
