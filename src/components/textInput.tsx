import React from 'react';
import {TextInput as PaperTextInput} from 'react-native-paper';
import {
  FLAMING_RED,
  STANDARD_BORDER,
  STANDARD_HIGHLIGHT,
  STANDARD_TEXT,
} from '../util/colors';

const TextInput: React.FC<
  React.ComponentProps<typeof PaperTextInput>
> = props => {
  return (
    <PaperTextInput
      cursorColor={FLAMING_RED} // Android only
      outlineColor={'transparent'}
      textColor={STANDARD_TEXT}
      autoCapitalize={'none'}
      underlineColor={STANDARD_BORDER}
      activeOutlineColor={'transparent'}
      activeUnderlineColor={STANDARD_HIGHLIGHT}
      {...props}
    />
  );
};

export default TextInput;
