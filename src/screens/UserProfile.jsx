import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Userprofile = () => {
    const navigation = useNavigation();
    const profileData = useSelector(store => store.user.items);
    const { uuid, country, bio, name, loginType,image } = profileData;
    const username = (loginType === "GUEST") ? `Guest_${uuid}` : name;
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.headerView}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <View >
                        <Icon2 name="arrow-back-ios" size={25} />
                    </View>
                </TouchableOpacity>
                <View style={styles.headerId}>
                    <Text style={styles.userName}>{username}</Text>
                    <Text style={styles.userid}>ID: {uuid}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Edit profile', { user: profileData })}>
                    <View >
                        <Icon3 name="edit" size={25} />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: image }} style={styles.userImage} />
                    <View style={styles.overlay}>
                        <View style={styles.countryContainer}>
                            <Icon name="enviromento" size={20} color="white" style={styles.locationIcon} />
                            <Text style={styles.country}>{country === "" ? "India" : country}</Text>
                        </View>
                        {/* <Text style={styles.status}>{status === "active" && }</Text> */}
                    </View>
                </View>

                <View style={styles.about}>
                    <View style={styles.userIcon}>
                        <Icon name="user" size={28} />
                        <Text style={styles.heading}>About Me</Text>
                    </View>
                    <Text style={styles.bio}>{bio}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    headerView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        marginBottom: 10,
    },
    headerId: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userName: {
        fontSize: 18,
        fontWeight: "500",
    },
    userid: {
        fontSize: 15,
    },
    imageContainer: {
        position: 'relative',
    },
    userImage: {
        height: 400,
        width: '100%',
        borderRadius: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    overlay: {
        position: 'absolute',
        bottom: 20,
        left: 10,
        right: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    countryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 20,
        width: '35%',
    },
    locationIcon: {
        marginRight: 5,
    },
    country: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    status: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        width: '40%',
        borderRadius: 20,
        textAlign: 'center',
    },
    about: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    userIcon: {
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: 8,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    bio: {
        fontSize: 16,
        color: 'gray',
        lineHeight: 22,
    },
});

export default Userprofile;