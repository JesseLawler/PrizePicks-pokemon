import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button as PaperButton} from 'react-native-paper';
import Text from './text';
import {setSelection} from '../redux/actions';
import {useAppSelector, useAppDispatch} from '../redux/hooks';
import * as Screens from '../screens/index';

const ListItem: React.FC<React.ComponentProps<typeof PaperButton>> = props => {
  const dispatch = useAppDispatch();

  const navigation = useNavigation();

  const handleSelectRow = () => {
    console.log(`Pressed ${props.children}`);
    dispatch(setSelection(props.children as string));
    navigation.navigate({name: 'Detail'});
  };

  return (
    <Pressable onPress={handleSelectRow} style={styles.row} {...props}>
      <Text>{props.children}</Text>
    </Pressable>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  row: {
    backgroundColor: 'red', // JESSEFIX LATER
    minWidth: 200,
    height: 50,
    borderBottomColor: '#777777',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
});
