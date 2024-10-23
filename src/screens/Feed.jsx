import { StyleSheet, Text, View, ImageBackground, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Icon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../redux/userSlice';
import { useNavigation } from '@react-navigation/native';
import { useSocket } from '../context/SocketContext';
import PreferenceModal from '../navigators/preferenceModal';

const Feed = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const profileData = useSelector(store => store.user.items);
  const { socket, setSocket, getSocket } = useSocket();
  const [isFilled, setIsFilled] = useState(false);


  const toggleHeart = () => {
    setIsFilled(!isFilled);
  };

  const socketFun = socket?._j;
  const navigation = useNavigation();

  const [isModalVisible, setModalVisible] = useState(false);


  const fetchData = async () => {
    try {
      const guestToken = await AsyncStorage.getItem("guestToken");
      const googleToken = await AsyncStorage.getItem("googleToken");

      const token = guestToken !== null ? guestToken : googleToken;
      await Axios.get("https://kaama-backend.onrender.com/user/", {
        headers: {
          Authorization: token
        }
      })
        .then(async res => {
          if (res.data.status == "true") {
            const data = { ...res.data.message, token: token };
            dispatch(addUser(data));
          }
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log('Guest error:', error);
    }
  };

  const getAPIData = async () => {
    try {
      const guestToken = await AsyncStorage.getItem("guestToken");
      const googleToken = await AsyncStorage.getItem("googleToken");

      const token = guestToken !== null ? guestToken : googleToken;
      await Axios.get("https://kaama-backend.onrender.com/user/fetch", {
        headers: {
          Authorization: token
        }
      })
        .then(res => {
          if (res.data.status === "true") {
            // console.log("api data fetch---->",res.data);
            setUsers(res.data.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log('Guest error:', error);
    }
  };


  // const handleVideoCall = (item) => {
  //   // console.log("itemmmmmmmmmm", item);

  //   let liveDataUser = { ...item };
  //   socketFun.emit("join", {
  //     receiver: item._id,
  //     sender: profileData._id
  //   })
  //   socketFun.on("liveChat", (data) => {
  //     // console.log("data", data);
  //     liveDataUser['roomIDD'] = data.roomId;
  //     navigation.navigate('MessageBox', { item: liveDataUser, socket: socketFun });
  //   });
  // }


  const renderItem = ({ item }) => (
    <View style={styles.container1}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Provider Profile', { user: item })}>
        <Image source={{ uri: "https://res.cloudinary.com/dcb6tgaps/image/upload/v1723454309/test_Api/x4mu942lr7uduimwkcwv.jpg" }} style={styles.img} />
      </TouchableOpacity>
      <View style={styles.iconView}>
        <Icon name="videocamera" size={30} color="#FF4E88" />
      </View>
      <TouchableOpacity onPress={toggleHeart} style={styles.likeView}>
        <Icon
          name={item.liked ? 'heart' : 'hearto'}
          size={25}
          color="#f274b3"
        />
        {/* backgroundColor: "#f274b3", */}
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    fetchData();
    getAPIData();
    setSocket(getSocket());
  }, []);




  return (
    <View style={styles.container}>
      <View style={styles.headerMain}>
        <Text style={styles.headerText}>HOT</Text>
        <TouchableOpacity style={styles.preference} onPress={() => setModalVisible(true)}>
          <LinearGradient
            colors={['#ED0ABB', '#E453EF', '#E169FF']}
            style={styles.buttonContainer}
          >
            <Icon name="earth" size={15} color={"white"} />
            <Icon name='down' size={15} color={"white"} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
      <PreferenceModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />

    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container1: {
    marginRight: 8,
    marginTop: 12,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  headerMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    padding: 10,
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  preference: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 30,
  },
  img: {
    height: 200,
    width: 180,
    borderRadius: 12,
    borderColor: "black"
  },
  textName: {
    position: "absolute",
    bottom: 12,
    left: 12,
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  iconView: {
    position: "absolute",
    bottom: 1,
    right: 1,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  likeView: {
    position: "absolute",
    top: 3,
    right: 0,
    width: 44,
    height: 44,
  },
  list: {
    paddingHorizontal: 10,
  },
});
