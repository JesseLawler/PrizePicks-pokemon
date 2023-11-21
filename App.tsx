import React from 'react';
import {Platform} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {IconButton} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as Components from './src/components/index';
import {store} from './src/redux/store';
import * as Screens from './src/screens/index';
import {
  FLAMING_RED,
  STANDARD_BACKGROUND,
  STANDARD_TEXT,
} from './src/util/colors';

const Stack = createNativeStackNavigator();

const App = () => {
  const backButton = (nav: any) => {
    if (Platform.OS === 'ios') {
      return (
        <Components.Button
          onPress={() => nav.goBack()}
          labelStyle={{fontSize: 18, color: FLAMING_RED}}>
          back
        </Components.Button>
      );
    } else if (Platform.OS === 'android') {
      const iconImage = () => (
        <Ionicons name="arrow-back" size={24} color={FLAMING_RED} />
      );
      return (
        <IconButton
          icon={iconImage}
          //iconColor={MD3Colors.error50}
          size={20}
          onPress={() => nav.goBack()}
        />
      );
    }
  };

  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <SafeAreaProvider style={{backgroundColor: STANDARD_BACKGROUND}}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerTintColor: STANDARD_TEXT,
                headerStyle: {backgroundColor: 'black'},
              }}>
              <Stack.Screen
                name="Home"
                component={Screens.HomeScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Detail"
                component={Screens.SearchResultDetail}
                options={({navigation}) => ({
                  presentation: 'modal',
                  title: 'raw JSON data',
                  headerLeft: () => backButton(navigation),
                })}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </ReduxProvider>
  );
};

export default App;
