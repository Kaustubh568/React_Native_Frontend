import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import loveImage from "../assets/heart.png"
import { useNavigation } from '@react-navigation/native';

const ILiked = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={loveImage}
          style={styles.Iconimage}
        />
      </View>
      <Text style={styles.middleText}>You haven't liked anyone yet. Go find someone you like!</Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        activeOpacity={0.5}
        onPress={() => navigation.navigate('Feed')}
      >
        <Text style={styles.buttonText}>Search Now</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ILiked

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginHorizontal: 10,
    marginTop: 160,
  },
  imageContainer: {
    width: 100,
    height: 100,
  },
  Iconimage: {
    width: 100,
    height: 100,
  },
  middleText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  buttonContainer: {
    backgroundColor: "#7907eb",
    width: "70%",
    paddingVertical: 14,
    borderRadius: 40,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "500",
    fontSize: 20,
  },
})