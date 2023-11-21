import React from 'react';
import {SegmentedButtons as PaperSegmentedButtons} from 'react-native-paper';

const DEFAULT_BUTTONS = [
  {value: 'walk', label: 'Walking'},
  {value: 'train', label: 'Transit'},
  {value: 'drive', label: 'Driving'},
];

type SegmentedButtonsProps = {
  value: string;
  onValueChange: (value: string) => void;
  buttons: {
    value: string;
    label: string;
  }[];
};

const SegmentedButtons: React.FC<SegmentedButtonsProps> = props => {
  const {
    onValueChange = () =>
      console.log('pressed an unconfigured segmented button'),
    buttons = DEFAULT_BUTTONS,
  } = props;
  return (
    <PaperSegmentedButtons
      value={props.value}
      onValueChange={onValueChange}
      buttons={buttons}
    />
  );
};

export default SegmentedButtons;
