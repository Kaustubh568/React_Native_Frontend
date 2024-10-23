import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const GuestLogin = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const renderInputField = (placeholder, gradientColors, value, setValue, keyboardType = 'default') => (
    <View style={styles.inputContainer}>
      <LinearGradient
        colors={gradientColors}
        style={styles.inputGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#FFFFFF"
          value={value}
          onChangeText={setValue}
          keyboardType={keyboardType}
        />
      </LinearGradient>
    </View>
  );

  const handleSubmit = async () => {
    if (!name || !phone || !email) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    try {
      const response = await Axios.post('https://kaama-backend.onrender.com/user', {
        name: name,
        email: email,
        phone: Number(phone),
      });

      if (response.data.status == "ok") {
        Alert.alert("Login Succesfull.");
        AsyncStorage.setItem("token", response.data.data);
        AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
        navigation.navigate('TabNavigator');
      } else {
        Alert.alert("Error", "Login failed");
      }
    } catch (error) {
      if (error.response) {
        Alert.alert("Error", error.response.data.error);
      } else if (error.request) {
        Alert.alert("Error", error.request);
      } else {
        Alert.alert("Error", error.message);
      }
    }
  }

  return (
    <LinearGradient
      colors={['#CD4DCC', '#400082', '#9F27E4', '#7E0CF5']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome</Text>

        {renderInputField('Please enter your name', ['#C944EA', '#E070EA'], name, setName)}

        {renderInputField('Mobile number', ['#C944EA', '#E070EA'], phone, setPhone, 'numeric')}

        {renderInputField('Enter your email', ['#C944EA', '#E070EA'], email, setEmail)}

        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  welcomeText: {
    color: '#FFFFFF',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: "900",
    padding: 12,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputGradient: {
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  input: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryPicker: {
    height: 50,
    width: 120,
    color: '#FFFFFF',
    fontSize: 16,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    width: 120,
    alignSelf: 'center',
  },
  loginButtonText: {
    color: '#C944EA',
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default GuestLogin;
