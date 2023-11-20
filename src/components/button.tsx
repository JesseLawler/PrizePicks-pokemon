import React from 'react';
import {Button as PaperButton} from 'react-native-paper';

// JESSEFIX LATER kill any
const Button = (props: any) => {
  return (
    <PaperButton
      //icon="camera"
      mode="contained"
      onPress={() => console.log('Pressed')}
      {...props}>
      {props.children}
    </PaperButton>
  );
};

export default Button;
