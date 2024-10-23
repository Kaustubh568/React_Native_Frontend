import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const Profile = () => {
  const navigation = useNavigation();

  const profileData = useSelector(store => store.user.items);
  // console.log(profileData);
  
  const { uuid, name, loginType,image } = profileData;
  const username = (loginType === "GUEST") ? `Guest_${uuid}` : name;
  return (
    <View>
      <View style={styles.headerView}>
        <Image source={require('../assets/back-gardient.jpg')} style={styles.image} />
      </View>
      <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('UserProfile')}>
        <View style={styles.imageCircle}>
          <View>
            <Image source={{ uri: image }} style={styles.profileImage} />
            <Text style={styles.userText}>{username}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('VipShare')}>
        <LinearGradient
          colors={['#ED0ABB', '#E453EF', '#E169FF']}
          style={styles.vipStore}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.vipImage}>
            <Image source={require('../assets/money-bag.png')} style={styles.moneyImage} />
          </View>
          <View style={styles.vipText}>
            <Text style={styles.visitText}>Visit VIP Store</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.settingView}>
        <TouchableOpacity
          style={styles.aligning}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Coins')}
        >
          <View style={styles.content}>
            <Icon2 name="coins" size={26} color="black" />
            <Text style={styles.textSettings}>Get Coins</Text>
          </View>
          <Icon name="right" size={20} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.aligning} activeOpacity={0.8}
          onPress={() => navigation.navigate('Share')}
        >
          <View style={styles.content}>
            <Icon name="sharealt" size={26} color="black" />
            <Text style={styles.textSettings}>Share</Text>
          </View>
          <Icon name="right" size={20} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.aligning} activeOpacity={0.8}
          onPress={() => navigation.navigate('Settings')}
        >
          <View style={styles.content}>
            <Icon name="setting" size={26} color="black" />
            <Text style={styles.textSettings}>Settings</Text>
          </View>
          <Icon name="right" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerView: {},
  image: {
    width: '100%',
    height: 180,
  },
  imageCircle: {
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  profileImage: {
    width: 100,
    height: 100,
    borderWidth: 4,
    borderColor: "white",
    borderRadius: 50,
    top: -50,
    left: 24,
  },
  userText: {
    fontWeight: "bold",
    fontSize: 20,
    left: 24,
    top: -50,
  },
  moneyImage: {
    height: 40,
    width: 40,
    margin: 28,
  },
  vipStore: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderRadius: 50,
    margin: 20,
    height: 65,
  },
  vipImage: {
    justifyContent: "center",
    alignItems: "center",
  },
  vipText: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  visitText: {
    color: 'white',
    fontSize: 20,
    fontWeight: "bold",
    alignContent: "center",
    justifyContent: "center",
    left: -30,
  },
  settingView: {
    gap: 40,
    margin: 20,
  },
  aligning: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    flexDirection: "row",
    gap: 10,
  },
  textSettings: {
    fontSize: 22,
    fontWeight: "500",
  },
});

export default Profile;
