/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#FACC15'; // Yellow for better visibility
const tintColorDark = '#FACC15';

export const Colors = {
  light: {
    text: '#11181C', // Dark Gray
    background: '#F5F5F5', // Light Gray for low eye strain
    tint: tintColorLight,
    icon: '#525252', // Mid Gray
    tabIconDefault: '#A3A3A3', // Light Gray for inactive icons
    tabIconSelected: tintColorLight, // Yellow for selected icons
    buttonBackground: '#1F2937', // Dark Gray for buttons
    buttonText: '#FFFFFF', // White text on buttons
  },
  dark: {
    text: '#F5F5F5', // Light Gray
    background: '#1F2937', // Dark Gray
    tint: tintColorDark,
    icon: '#9BA1A6', // Light Blue Gray
    tabIconDefault: '#4B5563', // Dark Gray for inactive icons
    tabIconSelected: tintColorDark, // Yellow for selected icons
    buttonBackground: '#11181C', // Almost Black for buttons
    buttonText: '#FACC15', // Yellow text on buttons
  },
};
