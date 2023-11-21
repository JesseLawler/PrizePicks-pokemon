import React from 'react';
import {ActivityIndicator, StyleSheet, ViewStyle} from 'react-native';
import {Button as PaperButton} from 'react-native-paper';
import {DISABLED_TEXT, FLAMING_RED, STANDARD_TEXT} from '../util/colors';

type ButtonProps = {
  isProcessing?: boolean;
} & React.ComponentProps<typeof PaperButton>;

const Button: React.FC<ButtonProps> = props => {
  const {isProcessing = false} = props;

  let combinedLabelStyle = styles.label;
  if (props.hasOwnProperty('labelStyle')) {
    combinedLabelStyle = {
      ...styles.label,
      ...(props.labelStyle as ViewStyle),
    };
  }
  if (props.disabled) {
    combinedLabelStyle = {
      ...combinedLabelStyle,
      color: DISABLED_TEXT,
    };
  }

  let combinedIcon = props.icon;
  if (isProcessing) {
    combinedIcon = () => (
      <ActivityIndicator size="small" color={STANDARD_TEXT} />
    );
  }

  return (
    <PaperButton
      //icon="camera"
      mode="text"
      onPress={() => console.log('pressed an unconfigured button')}
      style={styles.button}
      {...props}
      icon={combinedIcon}
      labelStyle={combinedLabelStyle}>
      {props.children}
    </PaperButton>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    marginBottom: 5,
  },

  label: {
    fontSize: 16,
    color: FLAMING_RED + 'cc',
  },
});
