import { View, StyleSheet, ImageBackground, TouchableOpacity, Image, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Icon from "react-native-vector-icons/AntDesign";
import { useSelector } from 'react-redux';

const ProviderProfile = ({ route, navigation }) => {
    const { user } = route.params;

    const [isFilled, setIsFilled] = useState(false);

    const toggleHeart = () => {
        setIsFilled(!isFilled);
    };
    const profileData = useSelector(store => store.user.items);
    console.log(profileData);
    

    return (
        <ScrollView style={styles.container}>
            <ImageBackground source={{ uri: user.image }} style={styles.userImage}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name='arrowleft' size={30} color="#fff" />
                </TouchableOpacity>
            </ImageBackground>

            <View style={styles.info}>
                <Image source={{ uri: user.image }} style={styles.img} />
                <Text style={styles.userName}>{user.name}</Text>
                <TouchableOpacity onPress={toggleHeart}>
                    <Icon
                        name={isFilled ? 'heart' : 'hearto'}
                        size={30}
                        color="purple"
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.bio}>
                <Text style={styles.bioTitle}>Self Introduction</Text>
                <Text style={styles.userBio}>{user.bio}</Text>
            </View>

            <View style={styles.albumContainer}>
                <Text style={styles.sectionTitle}>Album</Text>
                <View style={styles.albumImages}>
                    <Image source={{ uri: user.image }} style={styles.albumImage} />
                    <Image source={{ uri: user.image }} style={styles.albumImage} />
                    <Image source={{ uri: user.image }} style={styles.albumImage} />
                    <Image source={{ uri: user.image }} style={styles.albumImage} />
                    <Image source={{ uri: user.image }} style={styles.albumImage} />
                </View>
            </View>

            <View style={styles.languagesContainer}>
                <Text style={styles.sectionTitle}>Languages </Text>
                {user.languages && user.languages.length > 0 ? (
                    user.languages.map((language, index) => (
                        <Text key={index} style={styles.languageText}>
                            English
                        </Text>
                    ))
                ) : (
                    <Text style={styles.noLanguages}>No languages known</Text>
                )}
            </View>

            <View style={styles.contactContainer}>
                <TouchableOpacity style={styles.iconView} activeOpacity={0.8}>
                    <Text style={styles.sectionTitle}>Say Hi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconView} activeOpacity={0.8}>
                    <Icon name="videocamera" size={30} color="#FF4E88" />
                    <Text style={styles.videoCallText}>Video Call</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default ProviderProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8F8",
    },
    userImage: {
        width: "100%",
        height: 400,
        justifyContent: 'flex-start',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
        padding: 5,
    },
    info: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        marginTop: -40,
        marginHorizontal: 20,
        backgroundColor: "#fff",
        borderRadius: 20,
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
        elevation: 15,
    },
    img: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderColor: "#FF4E88",
        borderWidth: 2,
    },
    userName: {
        flex: 1,
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
        marginLeft: 15,
    },
    bio: {
        padding: 20,
    },
    bioTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    userBio: {
        fontSize: 16,
        color: "#666",
        lineHeight: 22,
    },
    albumContainer: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    albumImages: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    albumImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    contactContainer: {
        padding: 20,
        flexDirection:"row",
        justifyContent:"space-between",
        gap:10,
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 15,
        shadowColor: "rgba(255, 78, 136, 0.8)",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
    },
    iconView: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 15,
        shadowColor: "rgba(255, 78, 136, 0.8)",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
        justifyContent:"center",
        alignItems:"center",
        alignContent:"center",
        width:"50%",
    },
    videoCallText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: "#FF4E88",
    },
    languagesContainer: {
        padding: 20,
        marginBottom:10,
        backgroundColor: "#fff",
        marginHorizontal: 20,
        borderRadius: 15,
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
    },
    languageText: {
        fontSize: 16,
        color: "#333",
        marginBottom: 5,
    },
    noLanguages: {
        fontSize: 16,
        color: "#666",
        fontStyle: 'italic',
    },
});
