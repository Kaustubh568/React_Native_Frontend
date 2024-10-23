import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import React from 'react'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSocket } from '../context/SocketContext';


const Setting = () => {

    const { socket } = useSocket();
    // console.log(socket);

    const navigation = useNavigation();
    const logout = async () => {
        try {
            await GoogleSignin.signOut();
        } catch (error) {
            console.log('Google Sign-Out Error: ', error);
        }
    }
    const handleLogoutButton = async () => {
        logout();
        socket?._j.disconnect();
        console.log("logout Successfully");
        await AsyncStorage.setItem("googleToken", "");
        await AsyncStorage.setItem("guestToken", "");
        navigation.navigate('Login');
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.mainView}>
                    <View style={styles.manageText}>
                        <Text>Manage Subscriptions</Text>
                    </View>
                    <View style={styles.cancelButton}>
                        <Text style={styles.buttonText}>Cancel Your Subscription</Text>
                    </View>
                    <View style={styles.cancel}>
                        <Text style={styles.canceltext}>You can go to Google Play for cancelling your Subscription</Text>
                    </View>
                </View>

                <View style={styles.settingView}>

                    <View style={styles.settingOptions}>
                        <Text style={styles.settingText}>Privacy Policy</Text>
                        <Icon name='right' size={17} color={"grey"} />
                    </View>


                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Feedback')}>
                        <View style={styles.settingOptions}>
                            <Text style={styles.settingText}>FeedBack</Text>
                            <Icon name='right' size={17} color={"grey"} />
                        </View>
                    </TouchableOpacity>


                    <View style={styles.settingOptions}>
                        <Text style={styles.settingText}>Refer & Earn</Text>
                        <Icon name='right' size={17} color={"grey"} />
                    </View>

                    <View style={styles.settingOptions}>
                        <Text style={styles.settingText}>Rate Us</Text>
                        <Icon name='right' size={17} color={"grey"} />
                    </View>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('AboutUs')}>
                        <View style={styles.settingOptions}>
                            <Text style={styles.settingText}>About Us</Text>
                            <Icon name='right' size={17} color={"grey"} />
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('BlackList')}>
                        <View style={styles.settingOptions}>
                            <Text style={styles.settingText}>Blocklist</Text>
                            <Icon name='right' size={17} color={"grey"} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Account Deletion')}>
                        <View style={styles.settingOptions} >
                            <Text style={styles.settingText}>Account Deletion</Text>
                            <Icon name='right' size={20} color={"grey"} />
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity activeOpacity={0.8} style={styles.deletebtn} onPress={handleLogoutButton}>
                        <Text style={styles.deleteTxt}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    mainView: {
        borderWidth: 3,
        borderRadius: 10,
        borderColor: "#F5F7F8",
        padding: 20,
        margin: 14,
        width: "95%",
        height: 180,
        backgroundColor: "#F8EDED",
        justifyContent: 'center',
        alignItems: 'center',
        left: -4,

    },
    cancelButton: {
        borderRadius: 24,
        width: 200,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 16,
        color: '#000',
    },
    cancel: {
        marginTop: 10,
    },
    canceltext: {
        fontSize: 12,
        fontWeight: "bold"
    },

    settingView: {
        backgroundColor: "white",
    },

    settingOptions: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 16,
    },
    settingText: {
        fontSize: 17,
        fontWeight: "400",
        color: "black"
    },
    deletebtn: {
        borderRadius: 16,
        marginTop: 20,
        marginHorizontal: 20,
        backgroundColor: "#3FA2F6",
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteTxt: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
    }
})

export default Setting
