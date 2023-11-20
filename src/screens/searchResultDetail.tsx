import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {useAppSelector, useAppDispatch} from '../redux/hooks';
import {STANDARD_BACKGROUND} from '../util/colors';

// JESSEFIX LATER kill any
const SearchResultDetail = (props: any) => {
  const selection = useAppSelector(state => state.users.selection);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text>Details about {selection}</Text>
    </View>
  );
};

export default SearchResultDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: STANDARD_BACKGROUND,
  },
});
