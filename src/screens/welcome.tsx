import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper'; // JESSEFIX NOW

import * as Components from '../components/index';
import {incrementAge, setAge, setName} from '../redux/actions';
import {useAppSelector, useAppDispatch} from '../redux/hooks';

// JESSEFIX LATER kill any
const Welcome = (props: any) => {
  const age = useAppSelector(state => state.users.user.age);
  const name = useAppSelector(state => state.users.user.nickname);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text>Welcome {name ?? 'Alehanzo Rolfardo'}!</Text>
      <Text>You are {age ?? 'wtf'} years old.</Text>
      <Components.Input
        placeholder="What should we call you?"
        style={{width: 300, marginTop: 10}}
        onChangeText={(text: string) => dispatch(setName(text))}
      />
      <Components.Input
        placeholder="How old are you?"
        keyboardType="numeric"
        style={{width: 300, marginTop: 10}}
        onChangeText={(textAge: string) => dispatch(setAge(Number(textAge)))}
      />
      <Components.Button onPress={() => dispatch(incrementAge())}>
        Increment Age
      </Components.Button>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111111',
  },
});
