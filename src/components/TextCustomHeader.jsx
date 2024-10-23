import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const TextCustomHeader = ({ userImg, userName }) => {

    const navigation = useNavigation();

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Messages')}>
                <Icon name="left" size={24} color="#333" />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} style={styles.userContainer}>
                <Image source={{ uri: userImg }} style={styles.userImg} />
                <View style={styles.textContainer}>
                    <Text style={styles.userName}>{userName}</Text>
                    <Text style={styles.activeStatus}>Online</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8}>
                <Icon name='flag' size={24} color="red" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#f8f8f8',
    },
    userContainer: {
        flexDirection: "row",
        alignItems: 'center',
    },
    userImg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    textContainer: {
        justifyContent: 'center',
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    activeStatus: {
        marginTop: 2,
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 255, 0, 0.1)',
        color: 'green',
        fontSize: 12,
        width:50,
    }
});

export default TextCustomHeader;
