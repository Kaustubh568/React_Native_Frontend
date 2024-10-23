import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const AccountDeletion = () => {
    // const 
    
    // const handleGuestLogoutButton = async () => {
    //     logout();
    //     console.log("logout Successfully");
    //     await AsyncStorage.setItem("googleToken", "");
    //     navigation.navigate('Login');
    // }
    return (
        <View style={styles.mainView}>

            <View>
                <View style={styles.info}>
                    <Text style={styles.infoText}>Account Information</Text>
                </View>

                <View style={styles.idinfo}>
                    <Text style={styles.idText}>ID: 387384973298</Text>
                    <Text style={styles.idText}>Coins Left:  0</Text>
                </View>

                <View style={styles.info}>
                    <Text style={styles.infoText}>After Deleting the Account</Text>
                </View>

                <View style={styles.idinfo}>
                    <Text style={styles.idText}>{'\u2022'} All Remaining coins will be deleted Permanently from Your Account</Text>
                    <Text style={styles.idText}>{'\u2022'} Account will be Permanently deleted</Text>
                    <Text style={styles.idText}>{'\u2022'} The remaning time of your VIP membership will become invalid</Text>
                    <Text style={styles.idText}>{'\u2022'} Please Cancel your autorenewable Subscription manully</Text>
                </View>
            </View>
            <TouchableOpacity activeOpacity={0.8} style={styles.deletebtn}>
                <Text style={styles.deleteTxt}>Confirm & Delete Account</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: "white",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
    },

    info: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    infoText: {
        fontSize: 18,
        fontWeight: "bold",
    },

    idinfo: {
        margin: 12,
        borderRadius: 12,
        backgroundColor: "#F5F7F8",

    },

    idText: {
        fontSize: 16,
        fontWeight: "500",
        paddingLeft: 12,
        paddingBottom: 12,
        paddingTop: 8,
    },

    deletebtn: {
        borderRadius: 16,
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

export default AccountDeletion