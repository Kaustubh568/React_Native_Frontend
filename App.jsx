import { StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/components/Login';
import TabNavigator from './src/navigators/TabNavigator';
import Coins from './src/screens/Coins';
import VipShare from './src/screens/VipShare';
import UserProfile from './src/screens/UserProfile';
import Setting from './src/screens/Setting';
import Feedback from './src/screens/Feedback';
import AboutUs from './src/screens/AboutUs';
import AccountDeletion from './src/screens/AccountDeletion';
import BlackList from './src/screens/BlackList';
import MessageBox from './src/screens/MessageBox';
import { Provider } from 'react-redux';
import appStore from './src/redux/appStore';
import EditProfile from './src/screens/EditProfile';
import { SocketProvider } from './src/context/SocketContext';
import ProviderProfile from './src/screens/ProviderProfile';
import Share from './src/screens/Share';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <Provider store={appStore}>
      <SocketProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ animation: 'slide_from_bottom' }}>
            </Stack.Screen>
            <Stack.Screen
              name="TabNavigator"
              component={TabNavigator}
              options={{ animation: 'slide_from_bottom' }}>
            </Stack.Screen>
            <Stack.Screen
              name="Coins"
              component={Coins}
              options={{ animation: 'slide_from_bottom' }}>
            </Stack.Screen>
            <Stack.Screen
              name="VipShare"
              component={VipShare}
              options={{ animation: 'slide_from_bottom' }}>
            </Stack.Screen>
            <Stack.Screen
              name="UserProfile"
              component={UserProfile}
              options={{ animation: 'slide_from_bottom' }}>
            </Stack.Screen>
            <Stack.Screen
              name="Settings"
              component={Setting}
              options={{ animation: 'slide_from_bottom', headerShown: true }}>
            </Stack.Screen>
            <Stack.Screen
              name="Feedback"
              component={Feedback}
              options={{ animation: 'slide_from_bottom', headerShown: true }}>
            </Stack.Screen>
            <Stack.Screen
              name="AboutUs"
              component={AboutUs}
              options={{ animation: 'slide_from_bottom', headerShown: true }}>
            </Stack.Screen>
            <Stack.Screen
              name="Share"
              component={Share}
              options={{ animation: 'slide_from_bottom', headerShown: true }}>
            </Stack.Screen>
            <Stack.Screen
              name="Account Deletion"
              component={AccountDeletion}
              options={{ animation: 'slide_from_bottom', headerShown: true }}>
            </Stack.Screen>
            <Stack.Screen
              name="BlackList"
              component={BlackList}
              options={{ animation: 'slide_from_bottom', headerShown: true }}>
            </Stack.Screen>
            <Stack.Screen
              name="MessageBox"
              component={MessageBox}
              options={{ animation: 'slide_from_bottom', }}>
            </Stack.Screen>
            <Stack.Screen
              name="Edit profile"
              component={EditProfile}
              options={{ animation: 'slide_from_bottom', headerShown: true }}>
            </Stack.Screen>
            <Stack.Screen
              name="Provider Profile"
              component={ProviderProfile}
              options={{ animation: 'slide_from_bottom', headerShown: false }}>
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </SocketProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({

});

export default App;

