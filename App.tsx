import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as ReduxProvider} from 'react-redux';
import {PaperProvider} from 'react-native-paper';

import {store} from './src/redux/store';
import * as Screens from './src/screens/index';

const {Screen, Navigator} = createStackNavigator();

// JESSEFIX LATER kill any
const App = (props: any) => (
  <ReduxProvider store={store}>
    <PaperProvider>
      <NavigationContainer>
        <Navigator
          screenOptions={{
            headerShown: true,
          }}>
          <Screen name="Home" component={Screens.HomeScreen} />
          <Screen name="Detail" component={Screens.SearchResultDetail} />
        </Navigator>
      </NavigationContainer>
    </PaperProvider>
  </ReduxProvider>
);

export default App;
