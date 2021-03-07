import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import api from './services/api'
import Home from './pages/Home';
import Auth from './pages/Auth';

export default function App() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Auth} />
        <Stack.Screen name="Login" component={Home} />
      </Stack.Navigator>
  );
}