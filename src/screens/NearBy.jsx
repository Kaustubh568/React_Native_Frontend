import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import Icon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

const NearBy = () => {
  const [users, setUsers] = useState([]);

  const getAPIData = async () => {
    const url = "https://dummyjson.com/users";
    const result = await fetch(url);
    const data = await result.json();
    setUsers(data.users);
  };

  useEffect(() => {
    getAPIData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.userContainer}>
      <Image source={{ uri: item.image }} style={styles.userImage} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.firstName}</Text>
        <Text style={styles.userCountry}>{item.address.country}</Text>
        </View>
        <View style={styles.icons}>
          <Icon name='videocamera' size={30} color="black" />
          <Icon name='message1' size={30} color="black" />
        
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerMain}>
        <View style={styles.headerText}>
          <Text style={styles.text}>Nearby</Text>
        </View>

      
      </View>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  preference: {
    flexDirection: "row",
    borderRadius: 30,
    width: 70,
    display: "flex",
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    borderRadius: 30,
  },
  list: {
    padding: 10,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 10,
  },

  userData: {
    flexDirection: "row",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userCountry: {
    fontSize: 20,
    color: 'gray',
  },
  icons: {
    flexDirection: "row",
    gap: 14,
    paddingRight:10,
  }
});

export default NearBy;
