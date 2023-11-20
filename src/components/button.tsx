import React from 'react';
import {StyleSheet} from 'react-native';
import {Button as PaperButton} from 'react-native-paper';

const Button: React.FC<React.ComponentProps<typeof PaperButton>> = props => {
  return (
    <PaperButton
      //icon="camera"
      mode="contained"
      onPress={() => console.log('Pressed')}
      style={styles.button}
      {...props}>
      {props.children}
    </PaperButton>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    marginBottom: 5, // JESSEFIX LATER
  },
});
