import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const AboutUs = () => {

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image source={require('../assets/logo.jpg')} style={styles.logo} />
        <View style={styles.infoView}>
          <Text style={styles.appName}>KaAmA</Text>
          <Text style={styles.version}>1.0.0</Text>
        </View>
      </View>


      <View style={styles.mainView}>
        <TouchableOpacity activeOpacity={0.8}>
          <View style={styles.policy}>
            <Text style={styles.text}>Privacy Policy</Text>
            <Icon name='right' size={20} color={"grey"} />
          </View>
        </TouchableOpacity>
        <View style={styles.divider} />



        <TouchableOpacity activeOpacity={0.8}>
          <View style={styles.policy}>
            <Text style={styles.text}>Terms Of Use</Text>
            <Icon name='right' size={20} color={"grey"} />
          </View>
          <View style={styles.divider} />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8}  onPress={() => navigation.navigate('Feedback')}>
          <View style={styles.policy}>
            <Text style={styles.text}>Contact Us</Text>
            <Icon name='right' size={20} color={"grey"} />
          </View>
        </TouchableOpacity>

      </View>
    </View>
  );
}

export default AboutUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 30,
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    marginTop: 40,
  },
  infoView: {
    alignItems: 'center',
    marginTop: 10,
  },
  appName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  version: {
    fontSize: 16,
    color: '#666',
  },
  mainView: {
    backgroundColor: 'white',
    marginTop: 28,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  policy: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 20,
  },
});
