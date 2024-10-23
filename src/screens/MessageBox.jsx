import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, InteractionManager, KeyboardAvoidingView } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import TextCustomHeader from '../components/TextCustomHeader';
import Axios from "axios";
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import { mediaDevices, RTCView } from 'react-native-webrtc';
import peer from '../service/peer';


const MessageBox = ({ route }) => {
    const { messageHistory, socketFun } = route.params;
    // console.log("messageHistor---->", messageHistory);

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [connect, setConnect] = useState("");
    const [myStream, setMyStream] = useState();
    const [remoteStream, setRemoteStream] = useState();
    const [socketId, setSocketId] = useState(messageHistory?.uuid);
    const [videoCallOn, setVideoCallOn] = useState(false);
    const profileData = useSelector(store => store.user.items);
    const flatListRef = useRef(null);

    // const handleUserJoined = useCallback((data) => {
    //     console.log("userJoined ---->", data,profileData.name);
    // }, [socketFun]);
    // setSocketId(messageHistory?.uuid);

    console.log("socketId---->", socketId);

    useEffect(() => {
        // socketFun.emit("chatHistory", {
        //     id: profileData._id,
        // })
        Axios.get(`https://kaama-backend.onrender.com/chat/${messageHistory.roomIDD}`, {
            headers: { Authorization: profileData.token }
        })
            .then(res => {
                // console.log(res.data.data);
                setMessages(res.data.data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        console.log("Hello message ----->");
        setTimeout(() => {
            const scrollToBottom = () => {
                if (flatListRef.current) {
                    flatListRef.current.scrollToEnd({ animated: true });
                }
            };
            InteractionManager.runAfterInteractions(scrollToBottom);
        }, 1500);
    }, [messages]);

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            if (flatListRef.current) {
                flatListRef.current.scrollToEnd({ animated: true });
            }
        });
    }, []);

    const handleSendMessage = useCallback((input) => {
        const newMessage = {
            sender: profileData._id,
            receiver: messageHistory._id,
            roomId: messageHistory.roomIDD,
            message: input.trim(),
            type: "text"
        };

        socketFun.emit("message", newMessage);

        setConnect(input.trim());
        setInput('');
    }, [messages]);

    const handleVideoCallUser = useCallback(async () => {
        setVideoCallOn(true);
        const stream = await mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        const offer = await peer.getOffer();
        console.log("offer", offer);

        socketFun.emit("user-call", { to: socketId, offer });
        setMyStream(stream);
        // console.log("Stream----->",stream);
        // console.log("myStream",myStream);
    }, [socketFun, socketId]);

    const handleIncomingCall = useCallback(async ({ from, offer }) => {
        console.log("incomingData------>", from, offer, profileData.name);
        // setSocketId(from);
        const stream = await mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        setMyStream(stream);
        const ans = await peer.getAnswer(offer);
        socketFun.emit("call-accepted", { to: from, ans });
        // console.log("incomingData result------>");
    }, [videoCallOn]);

    const sendStreams = useCallback(() => {
        // console.log("hello");
        for (const track of myStream.getTracks()) {
            peer.peer.addTrack(track, myStream);
        }
    }, [myStream]);

    const handleCallAccepted = useCallback(({ from, ans }) => {
        peer.setLocalDescription(ans);
        console.log("callAccepted", profileData.name);
        sendStreams();
    }, [sendStreams]);

    const handleNegoNeeded = useCallback(async () => {
        const offer = await peer.getOffer();
        socketFun.emit("peer:nego:needed", { offer, to: socketId });
    }, [socketId, socketFun]);

    useEffect(() => {
        peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
        return () => {
            peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
        };
    }, [handleNegoNeeded]);

    const handleNegoNeedIncoming = useCallback(async ({ from, offer }) => {
        const ans = await peer.getAnswer(offer);
        socketFun.emit("peer:nego:done", { to: from, ans });
    }, [socketFun]);

    const handleNegoNeedFinal = useCallback(async ({ ans }) => {
        await peer.setLocalDescription(ans);
    }, []);

    useEffect(() => {
        peer.peer.addEventListener("track", async (ev) => {
            const remoteStreams = ev.streams;
            console.log("Got Tracks!!");
            setRemoteStream(remoteStreams[0]);
        });
    }, []);

    useEffect(() => {
        // console.log(" main data incoming call");
        socketFun.on("incoming-call", handleIncomingCall);
        socketFun.on("call-accepted", handleCallAccepted);
        socketFun.on("peer:nego:needed", handleNegoNeedIncoming);
        socketFun.on("peer:nego:final", handleNegoNeedFinal);


        return () => {
            socketFun.off("incoming-call", handleIncomingCall);
            socketFun.off("call-accepted", handleCallAccepted);
            socketFun.off("peer:nego:needed", handleNegoNeedIncoming);
            socketFun.off("peer:nego:final", handleNegoNeedFinal);
        }
    }, [videoCallOn, handleIncomingCall, handleCallAccepted, handleNegoNeedIncoming, handleNegoNeedFinal])

    useEffect(() => {
        const handleLiveChat = (data) => {
            socketFun.emit("chatHistory", {
                id: messageHistory._id,
            });
            socketFun.emit("chatHistory");
            console.log("socketdata--------->", data);
            setMessages(prevMessages => [...prevMessages, data]);
        }
        socketFun.on('liveChat', handleLiveChat);

        return () => {
            socketFun.off('liveChat', handleLiveChat);
        };
    }, [connect]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            socketFun.emit("seenMessage",
                { roomId: messageHistory.roomIDD },
                (error) => {
                    console.log("intervalId");
                    if (error) console.log(error);
                }
            );
        }, 2000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);


    return (
        // <KeyboardAvoidingView
        //     // style={styles.container}
        //     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // >
        <View style={styles.container}>
            <TextCustomHeader userImg={messageHistory.image} userName={messageHistory.name} />
            {
                myStream && (
                    <>
                        <RTCView
                            streamURL={myStream.toURL()}
                            style={{ width: 200, height: 100 }}
                        />
                    </>
                )
            }
            {
                remoteStream && (
                    <>
                        <Text>Remote Stream</Text>
                        <RTCView
                            streamURL={remoteStream.toURL()}
                            style={{ width: 200, height: 100 }}
                        />
                    </>
                )
            }
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={[styles.messageContainer, item.sender === profileData._id ? styles.sentMessage : styles.receivedMessage]}>
                        <Text style={styles.messageText}>{item.message}</Text>
                    </View>
                )}
                contentContainerStyle={styles.list}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Type a message..."
                    value={input}
                    onChangeText={setInput}
                    multiline
                    scrollEnabled
                    textAlignVertical="top"
                />
                <TouchableOpacity style={styles.sendIcon} onPress={() => handleSendMessage(input)}>
                    <Icon name="send" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleVideoCallUser}>
                <View style={styles.attachments}>
                    <Icon1 name="video" size={24} color="black" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={sendStreams}>
                <View style={styles.attachments}>
                    <Icon1 name="video" size={24} color="black" />
                </View>
            </TouchableOpacity>
        </View>
        // </KeyboardAvoidingView>
    );
};

export default MessageBox;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    list: { padding: 10, flexGrow: 1 },
    messageContainer: { padding: 10, borderRadius: 10, marginVertical: 5, maxWidth: '80%', alignSelf: 'flex-start' },
    sentMessage: { backgroundColor: '#007bff', alignSelf: 'flex-end' },
    receivedMessage: { backgroundColor: '#007bff' },
    messageText: { color: '#fff' },
    inputContainer: { flexDirection: 'row', alignItems: "center", paddingBottom: 4, paddingHorizontal: 4 },
    textInput: { flex: 1, borderRadius: 20, borderWidth: 1, borderColor: '#ddd', paddingHorizontal: 20, marginRight: 10 },
    sendIcon: { padding: 10, borderRadius: 30, backgroundColor: "green" },
    attachments: {
        flexDirection: "row",
        height: 40,
    },
});