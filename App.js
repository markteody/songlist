/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Provider } from 'react-redux';
import listReducer from './component/Redux/reducer'
import { NativeBaseProvider, Box,Button } from "native-base";
import ReduxThunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';

const rootReducer = combineReducers({ list: listReducer });
const store = createStore(rootReducer, applyMiddleware(ReduxThunk))
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SongList from './component/Main/SongList'
import SongDetails from './component/Main/SongDetails'
import Tab from './component/Main/Tab'
const Stack = createNativeStackNavigator();





const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
   
    <NativeBaseProvider>
      <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SongList" 
       //  options={{ title: '',headerShadowVisible:false }}
         options={{headerShown:false}}
        component={SongList} />
        <Stack.Screen name="SongDetails" 
         options={{ title: 'Song Details' }}
        component={SongDetails} />
      </Stack.Navigator>
      </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
