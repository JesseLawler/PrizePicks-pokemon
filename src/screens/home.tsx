import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Collapsible from 'react-native-collapsible';

import * as Components from '../components/index';
import {
  displaySearchResults,
  incrementAge,
  searchForString,
  setAge,
  setName,
  toggleShowHistory,
  updateInternetConnection,
} from '../redux/actions';
import {useAppSelector, useAppDispatch} from '../redux/hooks';
import {InternetConnection} from '../types';
import {STANDARD_BACKGROUND} from '../util/colors';

const HISTORY_LIST = [`Item 1`, `Item 2`, `Item 3`, `Item 4`, `Item 5`];

// JESSEFIX LATER kill any
const HomeScreen = (props: any) => {
  const age = useAppSelector(state => state.users.user.age);
  const isLoading = useAppSelector(state => state.users.searchResultsIsLoading);
  const isInternetConnected = useAppSelector(
    state =>
      state.users.internetConnection.connectionType === 'unknown' || // If the connectionType is still 'unknown', we give the benefit of the doubt.
      state.users.internetConnection.isConnected,
  );
  const name = useAppSelector(state => state.users.user.nickname);
  const searchResults = useAppSelector(state => state.users.searchResults);
  const showHistory = useAppSelector(state => state.users.showHistory);
  const dispatch = useAppDispatch();

  useEffect(() => {
    NetInfo.fetch().then(state => {
      const conn: InternetConnection = {
        connectionType: state.type,
        isConnected: state.isConnected ?? false,
      };
      dispatch(updateInternetConnection(conn));
    });

    const unsubscribe = NetInfo.addEventListener(state => {
      const conn: InternetConnection = {
        connectionType: state.type,
        isConnected: state.isConnected ?? false,
      };
      dispatch(updateInternetConnection(conn));
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Collapsible
        collapsed={!showHistory}
        style={styles.historyPanel}
        collapsedHeight={1}>
        <ScrollView contentContainerStyle={{backgroundColor: 'yellow'}}>
          {HISTORY_LIST.map((item, index) => (
            <Components.Button
              key={index}
              onPress={() => {
                dispatch(searchForString(item));
                setTimeout(() => {
                  dispatch(displaySearchResults(item));
                }, 2000);
              }}>
              Search for {item}
            </Components.Button>
          ))}
        </ScrollView>
      </Collapsible>

      <Components.Text>Welcome {name ?? 'Alehanzo Rolfardo'}!</Components.Text>

      <Components.Text>You are {age ?? 'wtf'} years old.</Components.Text>

      <Components.TextInput
        placeholder="What should we call you?"
        style={{width: 300, marginTop: 10}}
        onChangeText={(text: string) => dispatch(setName(text))}
      />

      <Components.TextInput
        placeholder="How old are you?"
        keyboardType="numeric"
        style={{width: 300, marginTop: 10}}
        onChangeText={(textAge: string) => dispatch(setAge(Number(textAge)))}
      />

      <Components.Button onPress={() => dispatch(incrementAge())}>
        Increment Age
      </Components.Button>

      <Components.Button
        onPress={() => dispatch(toggleShowHistory(!showHistory))}>
        Toggle Show History
      </Components.Button>

      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}

      <FlatList
        data={searchResults}
        renderItem={({item}) => (
          <Components.ListItem>{item}</Components.ListItem>
        )}
        keyExtractor={item => item}
      />

      {!isInternetConnected && (Alert.alert(`No internet connection!`), null)}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: STANDARD_BACKGROUND,
    width: '100%',
  },

  historyPanel: {
    width: 300,
    height: 200,
  },
});
