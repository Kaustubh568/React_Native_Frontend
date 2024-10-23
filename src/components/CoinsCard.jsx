import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CoinsCard = ({ item }) => {
  return (
    <TouchableOpacity style={styles.cards} activeOpacity={0.8}>
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.coins}>{item.coins} </Text>
        <LinearGradient
          colors={['#ED0ABB', '#E453EF', '#E169FF']}
          style={styles.vipGradient}
        >
          <Text style={styles.vip}>{item.VIP}</Text>
        </LinearGradient>
        <View style={styles.pricebox}>
          <Text style={styles.price}>{item.Price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cards: {
    flex: 1,
    margin: 10,
  },
  card: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 12,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  coins: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 6,
  },
  vipGradient: {
    width: '100%',
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
    borderRadius: 12,
  },
  vip: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  pricebox: {
    width: 90,
    borderColor: "blue",
    borderWidth: 2,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    margin: 6,
  },
  price: {
    color: "blue",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CoinsCard;
