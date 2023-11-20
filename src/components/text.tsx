import React from 'react';
import {Text as PaperText} from 'react-native-paper';

const Text: React.FC<React.ComponentProps<typeof PaperText>> = props => {
  return (
    <PaperText variant={'bodyMedium'} {...props}>
      {props.children}
    </PaperText>
  );
};

export default Text;
