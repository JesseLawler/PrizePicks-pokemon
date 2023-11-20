import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// JESSEFIX LATER kill any
const AddTask = (props: any) => {
  return (
    <View style={styles.container}>
      <Text>Add Task Screen</Text>
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
