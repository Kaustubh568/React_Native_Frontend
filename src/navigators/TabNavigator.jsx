import { StyleSheet, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feed from '../screens/Feed';
import NearBy from '../screens/NearBy';
import Chat from '../screens/Chat';
import Profile from '../screens/Profile';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

// import SocketApp from '../components/SocketApp';


const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen name="Feed" component={Feed}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon1
              name='cards'
              size={28}
              color={focused ? "black" : "gray"}
            />
          )
        }}></Tab.Screen>
      <Tab.Screen name="NearBy" component={NearBy}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon2
              name='location-pin'
              size={30}
              color={focused ? "black" : "gray"}
            />
          )
        }}></Tab.Screen>
      <Tab.Screen name="Chat" component={Chat}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon2
              name='message'
              size={30}
              color={focused ? "black" : "gray"}
            />
          )
        }}></Tab.Screen>
      <Tab.Screen name="Profile" component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon3
              name='user'
              size={25}
              color={focused ? "black" : "gray"}
            />
          )
        }}></Tab.Screen>
    </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({
})