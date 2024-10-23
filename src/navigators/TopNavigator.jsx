import { StyleSheet } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Messages from '../screens/Messages';
import ILiked from '../screens/ILiked';
import LikedMe from '../screens/LikedMe';


const Top = createMaterialTopTabNavigator();
const TopNavigator = () => {
    return (
        <Top.Navigator
            screenOptions={{
                tabBarInactiveTintColor: "black",
                tabBarActiveTintColor: '#228B22',
                tabBarIndicatorStyle: { backgroundColor: '#228B22' },
                tabBarLabelStyle: { fontSize: 14 },
            }}
        >
            <Top.Screen name="Messages" component={Messages}
                ></Top.Screen>
            <Top.Screen name="I Like" component={ILiked}></Top.Screen>
            <Top.Screen name="Like Me" component={LikedMe}></Top.Screen>
        </Top.Navigator >
    )
}

export default TopNavigator

const styles = StyleSheet.create({})