import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { useSocket } from '../context/SocketContext';


const Messages = () => {
  const navigation = useNavigation();
  const [messageData, setMessageData] = useState([]);
  const { socket } = useSocket();

  const socketFun = socket?._j;
  // console.log("socketlog", socketFun);

  const profileData = useSelector(store => store.user.items);

  // console.log("profile id ----->", profileData._id);
  useEffect(() => {

    // console.log("babu1");
    socketFun.emit("chatHistory");
    socketFun.on('rooms', (data) => {
      console.log("data", data);
      // console.log("data------>", data?.data[0]?.roomId);
      // console.log("data------>", data?.data[0]);
      // console.log("babu2");

      let data1 = [];
      for (let i = 0; i < data?.data?.length; i++) {
        // console.log("Unread message count", data?.data[i]?.msgcount);
        const msgcount = data?.data[i]?.msgcount;
        const unreadby = data?.data[i]?.unreadby;
        const roomID = data?.data[i]?.roomId?._id === profileData?._id ? "user" : "roomId";
        // const videoId = data?.data[i]?.roomId?.uuid === profileData?._id ? "user" : "roomId";
        const senderUserData = { ...data?.data[i]?.[roomID], lastMessage: data?.data[i]?.lastmsg, roomIDD: data?.data[i]?.roomId._id, msgcount, unreadby };
        // console.log("sender Data", senderUserData);
        data1 = [...data1, senderUserData]
      }
      // console.log("whole data---->",data1);
      
      setMessageData(data1);
      // console.log("babu3");
    });
  }, []);
  // console.log("babu4");


  return (
    <View>
      {/* <TouchableOpacity onPress={() => socketFun.disconnect()}><Text>Hello</Text></TouchableOpacity> */}
      <FlatList
        data={messageData}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              console.log("item count", item.msgcount);
              socketFun.emit("join", {
                roomId: item.roomIDD
              });
              navigation.navigate('MessageBox', { messageHistory: item, socketFun })
            }}>
            <View style={styles.messageBox}>
              <Image source={{ uri: item.image }} style={styles.userImg} />
              <View style={styles.messageContent}>
                <View style={styles.messageHeader}>
                  <Text style={styles.userName}>{item.name}</Text>
                </View>
                <Text style={styles.messageText} numberOfLines={1}>{item.lastMessage}</Text>
              </View>
              <View style={styles.countView}>
                {
                  (item.unreadby === profileData._id && item.msgcount > 0) ? (
                    <Text style={styles.count}>{item.msgcount}</Text>
                  ) : <></>
                }
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  messageBox: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
    justifyContent: "space-between",
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageText: {
    fontSize: 14,
    color: '#666',

  },
  count: {
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: "#f274b3",
    color: "white",
    textAlign: "center",
    paddingTop: 2,
  },
});




{/* ((item.unreadby === profileData._id) && (item.msgcount != "undefined") && (item.msgcount != "null") &&  */ }
{/* ) && ( */ }