import React, { forwardRef, memo, useImperativeHandle, useRef } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { palette } from './theme/palette';

const BUBBLE_STYLE: ViewStyle = {
  padding: 2,
  paddingHorizontal: 4,
  borderRadius: 5,
};

export type BubbleProps = {
  /**
   * background color of the bubble
   */
  color?: string;

  /**
   * the style for the container view
   */
  containerStyle?: StyleProp<ViewStyle>;

  bubbleStyle?: StyleProp<ViewStyle>;

  /**
   * the style for the TextInput inside bubble
   */
  textStyle?: StyleProp<TextStyle>;
  textColor?: string;
  bubbleMaxWidth?: number;
};
/**
 * a component to show text inside a bubble
 */
export type BubbleRef = {
  setText: (text: string) => void;
};
export const BubbleComponent = forwardRef<BubbleRef, BubbleProps>(
  (
    {
      containerStyle,
      color = palette.Main,
      textStyle,
      textColor = palette.White,
      bubbleMaxWidth,
      bubbleStyle,
    },
    ref,
  ) => {
    const textRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => ({
      setText: (text: string) => {
        textRef.current?.setNativeProps({ text });
      },
    }));

    return (
      <Animated.View style={[styles.view, containerStyle]}>
        <Animated.View
          style={[
            BUBBLE_STYLE,
            {
              backgroundColor: color,
              maxWidth: bubbleMaxWidth,
            },
            bubbleStyle,
          ]}>
          <TextInput
            ref={textRef}
            textAlign="center"
            style={[styles.textStyle, { color: textColor }, textStyle]}
            defaultValue=""
            caretHidden
          />
        </Animated.View>
      </Animated.View>
    );
  },
);
export const Bubble = memo(BubbleComponent);
const styles = StyleSheet.create({
  textStyle: {
    fontSize: 12,
    paddingVertical: 0,
  },
  view: {
    alignItems: 'center',
  },
});
