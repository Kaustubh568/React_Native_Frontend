import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  PermissionsAndroid,
  BackHandler,
} from 'react-native';
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';
import FeedVideo from '../assets/FeedVideo1.mp4';
import GoogleImage from '../assets/google.png';
import UserImage from '../assets/user.png';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

const { width, height } = Dimensions.get('window');

GoogleSignin.configure({
  webClientId: '621487122706-rlo45cfvgt3npel28he3o6e4avojt8et.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
});

const Login = () => {
  const navigation = useNavigation();
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  const menu = [
    { id: 1, name: GoogleImage, icon: 'Google' },
    { id: 2, name: UserImage, icon: 'Visitor' },
  ];

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // const { idToken } = userInfo;
      const { name, email, id, photo } = userInfo.user;
      const data = { googleId: id, name: name, email: email , image: photo, type: "google" };
      console.log(data);
      try {
        const res = await Axios.post('https://kaama-backend.onrender.com/user/', data);
        if (res.data.status === 'true') {
          await AsyncStorage.setItem('googleToken', res.data.data.token);
          navigation.navigate('TabNavigator');
        }
      } catch (err) {
        console.log(err);
      }
    } catch (error) {
      console.log('Google sign in error:', error);
    }
  };

  const guestLogin = async () => {
    try {
      const guestData = { type: 'guest' };
      const res = await Axios.post('https://kaama-backend.onrender.com/user/', guestData);
      if (res.data.status === 'true') {
        await AsyncStorage.setItem('guestToken', res.data.data.token);
        navigation.navigate('TabNavigator');
      }
    } catch (error) {
      console.log('Guest login error:', error);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'We need access to your location to provide better services.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setIsPermissionGranted(true);
      } else {
        Alert.alert('Permission Denied', 'Location permission is required to use this app.', [
          { text: 'OK', onPress: () => BackHandler.exitApp() },
        ]);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleButtonPress = (icon) => {
    if (icon === 'Visitor') {
      guestLogin();
    } else {
      signIn();
    }
  };

  const handleUseEffect = async () => {
    const googleToken = await AsyncStorage.getItem('googleToken');
    const guestToken = await AsyncStorage.getItem('guestToken');
    if (googleToken === null && guestToken === null) {
      navigation.navigate('Login');
    } else {
      navigation.navigate('TabNavigator');
    }
  };

  useEffect(() => {
    requestLocationPermission();
    handleUseEffect();
  }, []);

  const onBuffer = (data) => {
    console.log('Buffering...', data);
  };

  const videoError = (data) => {
    console.log('Video Error:', data);
  };

  const onBuffer1 = (data) => {
    console.log('Buffering...', data);
  };

  const videoError1 = (data) => {
    console.log('Video Error:', data);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Video
          source={FeedVideo}
          onBuffer={onBuffer}
          onError={videoError}
          style={styles.backgroundVideo}
          repeat={true}
          resizeMode="cover"
          muted={true}
        />

        

        <View style={styles.containerText}>
          <View style={styles.upperTextContainer}>
            <View style={styles.line} />
            <Text style={styles.upperText}>Sign in with</Text>
            <View style={styles.line} />
          </View>
          <View style={styles.loginView}>
            {menu.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.iconButton}
                onPress={() => handleButtonPress(item.icon)}
                activeOpacity={0.8}
              >
                <View style={styles.viewImage}>
                  <Image source={item.name} style={styles.Iconimage} />
                </View>
                <Text style={styles.buttonText}>{item.icon}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.agreement}>
            <Text style={styles.agreementText}>
              by using Kaama, you agree to terms of use and privacy policy
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: width,
    height: height,
  },
  containerText: {
    height: height,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    gap: 25,
    paddingBottom: 25,
  },
  upperTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    gap: 10,
  },
  iconButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  viewImage: {
    backgroundColor: 'white',
    width: 60,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  Iconimage: {
    width: 30,
    height: 30,
  },
  line: {
    height: 1,
    backgroundColor: '#f2f0f0',
    width: '28%',
  },
  upperText: {
    fontSize: 16,
    color: '#f2f0f0',
  },
  loginView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 90,
  },
  agreement: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  agreementText: {
    fontSize: 12,
    color: 'white',
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
  },
  logoContainers: {
    position: 'absolute',
    top: 60, 
    left: 110, 
    zIndex: 1, 
    backgroundColor: 'rgba(32, 32, 32, 0.3)',
    height: 180,
    width: 180,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    display: "flex",
    borderRadius: 250,
  },
  logoImage: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
  },
});

export default Login;
