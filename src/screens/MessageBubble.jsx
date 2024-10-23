// MessageBubble.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MessageBubble = ({ message, isCurrentUser }) => {
    return (
        <View
            style={[
                styles.bubbleContainer,
                isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble
            ]}
        >
            <Text style={styles.messageText}>{message.text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    bubbleContainer: {
        maxWidth: '80%',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
    },
    currentUserBubble: {
        alignSelf: 'flex-end',
        backgroundColor: '#007bff',
    },
    otherUserBubble: {
        alignSelf: 'flex-start',
        backgroundColor: '#f1f0f0',
    },
    messageText: {
        color: 'white',
    },
});

export default MessageBubble;
