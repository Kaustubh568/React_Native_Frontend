import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
// import { Picker } from '@react-native-picker/picker';
import Axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addUser } from '../redux/userSlice';

const EditProfileScreen = ({route}) => {
    const { user } = route.params; 
    const [name, setName] = useState(user.name);
    const [bio, setBio] = useState(user.bio);
    // const [gender, setGender] = useState(user.gender);
    const [dob, setDob] = useState(user.dob);
    const [country, setCountry] = useState(user.country);
    const [userImage, setUserImage] = useState(user.image);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


    const dispatch = useDispatch();
    const navigation = useNavigation();
    console.log("profile",user);
    console.log("image",userImage);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const dt = new Date(date);
        const x = dt.toISOString().split("T");
        const x1 = x[0].split("-");
        const userDob = `${x1[2]}/${x1[1]}/${x1[0]}`;
        setDob(userDob);
        hideDatePicker();
    };
    const handleImagePick = () => {
        launchImageLibrary({ quality: 1, }, response => {
            if (response.assets && response.assets.length > 0) {
                var bodyFormData = new FormData();
                bodyFormData.append('image', {
                    uri: response.assets[0].uri,
                    name: response.assets[0].fileName,
                    filename: response.assets[0].fileName,
                    type: response.assets[0].type,
                }
                );
                console.log(bodyFormData)
                try {
                    Axios.post("https://kaama-backend.onrender.com/upload/", bodyFormData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    })
                        .then(res => {
                            console.log("image api data",res.data.url);
                            setUserImage(res.data.url);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } catch (error) {
                    console.log(error);
                }
            }
        });
    };

    const handleSubmit = async () => {
        const guestToken = await AsyncStorage.getItem("guestToken");
        const googleToken = await AsyncStorage.getItem("googleToken");

        const token = guestToken !== null ? guestToken : googleToken;
        try {
            Axios.put("https://kaama-backend.onrender.com/user/", { name, dob, image:userImage, bio,country }, {
                headers: {
                    Authorization: token
                }
            })
                .then(res => {
                    console.log("put api", res.data);
                    dispatch(addUser(res.data.message));
                    navigation.navigate('Profile');
                    // setUserImage(res.data.url);
                })
                .catch(err => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ScrollView>
            <View style={{ padding: 20, }}>
                <TouchableOpacity onPress={handleImagePick}>
                    <Image
                        source={{ uri: userImage }}
                        style={{ width: 100, height: 100, borderRadius: 50, alignSelf: 'center' }}
                    />
                    <Text style={{ alignSelf: 'center', color: 'blue' }}>Edit picture </Text>
                </TouchableOpacity>



                <Text style={{ marginTop: 20 }}>Name</Text>
                <TextInput
                    style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your name"
                />

                {/* <Text>Gender</Text>
                <View style={{ borderWidth: 1, marginVertical: 10 }}>

                    <Picker
                        selectedValue={gender}
                        onValueChange={(itemValue, itemIndex) =>
                            setGender(itemValue)
                        }>
                        <Picker.Item label="Male" value="Male" />
                        <Picker.Item label="Female" value="Female" />
                        <Picker.Item label="Others" value="Others" />
                    </Picker>
                </View> */}
                <Text>Date of Birth</Text>
                <View style={{ position: 'relative', marginVertical: 10 }}>
                    <Text style={{ borderWidth: 1, padding: 10, paddingRight: 40 }}>
                        {dob}
                    </Text>
                    {
                        dob === undefined && (<TouchableOpacity
                            onPress={showDatePicker}
                            style={{
                                position: 'absolute',
                                right: 10,
                                top: 5,
                                zIndex: 1,
                            }}
                        >
                            <Icon name="calendar" size={30} />
                        </TouchableOpacity>)
                    }
                </View>

                <Text>Bio</Text>
                <TextInput
                    style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
                    value={bio}
                    onChangeText={setBio}
                    placeholder="Enter your bio"
                    multiline
                />

                <Text>Country</Text>
                <TextInput
                    style={{ borderWidth: 1, padding: 10, marginVertical: 10, marginBottom: 60, }}
                    value={country}
                    onChangeText={setCountry}
                    placeholder="Enter your Country"
                    multiline
                />

                <Button
                    title="Save Changes" onPress={handleSubmit}
                />

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>
        </ScrollView>
    );
};

export default EditProfileScreen;
const styles = StyleSheet.create({
    viewImage: {
        justifyContent: "center",
        alignItems: "center",
    },
    userImage: {
        height: 100,
        width: '25%',
        borderRadius: 20,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    }
})