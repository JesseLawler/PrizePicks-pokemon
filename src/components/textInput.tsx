import React from 'react';
import {TextInput as PaperTextInput} from 'react-native-paper';

const TextInput: React.FC<
  React.ComponentProps<typeof PaperTextInput>
> = props => {
  return <PaperTextInput {...props} />;
};

export default TextInput;
