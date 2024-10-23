// import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
// import React from 'react'


// const BlackList = () => {

//     return (
//         <View style={styles.container}>
//             <View style={styles.imgView}>
//                 <Image source={{ uri: "https://res.cloudinary.com/dcb6tgaps/image/upload/v1722683181/test_Api/hy3l3kunde89sdnyzrk3.png" }} style={styles.image} />
//                 <Text style={styles.text}> You Have not blocked Anyone Yet</Text>
//             </View>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "white"
//     },
//     imgView: {
//         justifyContent: "center",
//         alignItems: "center",
//         display: "flex",
//         marginTop: 180,
//     },

//     image: {
//         width: 150,
//         height: 150,
//     },
//     text: {
//         fontSize: 18,
//         fontWeight: "600",
//         margin: 16,
//     },

//     btn: {

//         borderRadius: 50,
//         width: "40%",
//         height: 45,
//         justifyContent: "center",
//         alignContent: "center",
//         display: "flex",
//         alignItems: "center",
//         marginLeft: "auto",
//         marginRight: "auto",
//         marginTop: 30,
//         backgroundColor: "blue"

//     },
//     btnText: {
//         fontSize: 16,
//         fontWeight: "900",
//         color: "white"
//     }

// })

// export default BlackList

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import { mediaDevices, RTCView } from 'react-native-webrtc';

export function BlackList() {
    const [messages, setMessages] = useState([])
    const [myStream, setMyStream] = useState();

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://res.cloudinary.com/dcb6tgaps/image/upload/v1722683181/test_Api/hy3l3kunde89sdnyzrk3.png',
                },
            },
            {
                _id: 9,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://res.cloudinary.com/dcb6tgaps/image/upload/v1722683181/test_Api/hy3l3kunde89sdnyzrk3.png',
                },
            },
            {
                _id: 2,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://res.cloudinary.com/dcb6tgaps/image/upload/v1722683181/test_Api/hy3l3kunde89sdnyzrk3.png',
                },
            },
            {
                _id: 3,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://res.cloudinary.com/dcb6tgaps/image/upload/v1722683181/test_Api/hy3l3kunde89sdnyzrk3.png',
                },
            },
            {
                _id: 4,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://res.cloudinary.com/dcb6tgaps/image/upload/v1722683181/test_Api/hy3l3kunde89sdnyzrk3.png',
                },
            },
            {
                _id: 5,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://res.cloudinary.com/dcb6tgaps/image/upload/v1722683181/test_Api/hy3l3kunde89sdnyzrk3.png',
                },
            },
            {
                _id: 6,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://res.cloudinary.com/dcb6tgaps/image/upload/v1722683181/test_Api/hy3l3kunde89sdnyzrk3.png',
                },
            },
            {
                _id: 7,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://res.cloudinary.com/dcb6tgaps/image/upload/v1722683181/test_Api/hy3l3kunde89sdnyzrk3.png',
                },
            },
            {
                _id: 8,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://res.cloudinary.com/dcb6tgaps/image/upload/v1722683181/test_Api/hy3l3kunde89sdnyzrk3.png',
                },
            },
            {
                _id: 10,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://res.cloudinary.com/dcb6tgaps/image/upload/v1722683181/test_Api/hy3l3kunde89sdnyzrk3.png',
                },
            },
            {
                _id: 11,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://res.cloudinary.com/dcb6tgaps/image/upload/v1722683181/test_Api/hy3l3kunde89sdnyzrk3.png',
                },
            },
            {
                _id: 12,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://res.cloudinary.com/dcb6tgaps/image/upload/v1722683181/test_Api/hy3l3kunde89sdnyzrk3.png',
                },
            },
            {
                _id: 13,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://res.cloudinary.com/dcb6tgaps/image/upload/v1722683181/test_Api/hy3l3kunde89sdnyzrk3.png',
                },
            },
            {
                _id: 14,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://res.cloudinary.com/dcb6tgaps/image/upload/v1722683181/test_Api/hy3l3kunde89sdnyzrk3.png',
                },
            },
            {
                _id: 15,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://res.cloudinary.com/dcb6tgaps/image/upload/v1722683181/test_Api/hy3l3kunde89sdnyzrk3.png',
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
    }, [])
    
    const renderInputToolbar = (props) => {
        return (
            <>
                <InputToolbar
                    {...props}
                    containerStyle={styles.inputToolbarContainerStyle}
                    textInputProps={{
                        style: {
                            color: '#000000',
                            flex: 1,
                            alignItems: 'center',
                            paddingHorizontal: 20,
                        },
                        multiline: true,
                        returnKeyType: 'go',
                        onSubmitEditing: () => {
                            if (props.text && props.onSend) {
                                let text = props.text;
                                props.onSend({ text: text.trim() }, true);
                            }
                        },
                    }}
                />
                {/* <TouchableOpacity style={styles.inputToolbarTouchableOpacity}>
          <Ionicons
            name="add-circle-outline"
            style={styles.inputToolbarIcon}
            size={32}
          />
        </TouchableOpacity> */}
            </>
        );
    };
    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                textStyle={{
                    right: {
                        color: 'white',
                    },
                }}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#f274b3',
                        borderColor: '#000000',
                    },
                    left: {
                        backgroundColor: '#e8e8e8',
                    },
                }}
            />
        );
    };
    const renderSend = (props) => {
        return (
            <>
                <Send {...props}>
                    <Ionicons name="send" size={28} style={styles.sendIcon} />
                </Send>
            </>
        );
    };
    const scrollToBottomComponent = () => {
        return (
            <Icon name="angle-double-down" size={28} color='#333' />
        );
    };

    return (
        <>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                renderSend={renderSend}
                renderUsernameOnMessage={true}
                onSend={messages => onSend(messages)}
                scrollToBottom
                scrollToBottomComponent={scrollToBottomComponent}
                user={{
                    _id: 10,
                    name: "Akhilesh",
                    avatar: 'https://res.cloudinary.com/dcb6tgaps/image/upload/v1722683181/test_Api/hy3l3kunde89sdnyzrk3.png',
                }}
            />
        </>
    )
}

export default BlackList

const styles = StyleSheet.create({
    inputToolbarContainerStyle: {
        backgroundColor: '#ffffff',
    },
    inputToolbarTouchableOpacity: {
        position: 'absolute',
        marginLeft: '4%',
        marginBottom: '1%',
        bottom: 0,
    },
    inputToolbarIcon: {
        color: '#0F0326',
    },
    sendIcon: {
        color: '#0F0326',
        marginBottom: 10,
    },
    leftGroupButton: {
        color: 'white',
    },
    attachments: {
        flexDirection: "row",
        height: 40,
    },
});
