import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();
import api from './services/api'
import Home from './pages/Home';
import Auth from './pages/Auth';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content"/> 
      <Stack.Navigator 
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
        name="Home"
        component={Auth}
        options={{ title: 'My home', headerShown: false, }}
      />
      <Stack.Screen
        name="segunda"
        component={Home}
        options={{ title: 'My dhome'  }}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
