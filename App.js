import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import AddItem from './components/AddItem';

const RootStack = createStackNavigator(
  {
    Login: Login,
    Register: Register,
    AddItem: AddItem,
    Home: Home,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#0000FF',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const RootContainer = createAppContainer(RootStack);

export default function App() {
  
  return (
    <RootContainer />
  )
}
