import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const VipShare = () => {
  return (
    <View style={styles.container}>
      <View style={styles.VIPbox}>
        <Text>this is VIP share</Text>
      </View>
      
      <View style={styles.cardView}>
        <View style={styles.card}>
          <View style={styles.cardHead}>
            <Text style={styles.headtxt}>1 Wbkjlkjkjlhjeek</Text>
          </View>
          <View style={styles.money}>
            <Text style={styles.moneyText}>₹820.00</Text>
            <Text style={styles.txt}>₹820.00/Week</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHead}>
            <Text style={styles.headtxt}>1 We`ek</Text>
          </View>
          <View style={styles.money}>
            <Text style={styles.moneyText}>₹820.00</Text>
            <Text style={styles.txt}>₹820.00/Week</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHead}>
            <Text style={styles.headtxt}>1 Week</Text>
          </View>
          <View style={styles.money}>
            <Text style={styles.moneyText}>₹820.00</Text>
            <Text style={styles.txt}>₹820.00/Week</Text>
          </View>
        </View>

      </View>
    </View>
  )
}

export default VipShare

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  VIPbox: {
    width: "100%",
    height: 360,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  cardView: {
    flexDirection: "row",
    gap: 1,
    marginTop: 22,
    justifyContent: "space-evenly",
  },

  card: {
    borderWidth: 2,
    width: "30%",
    height: 160,
  },
  cardHead: {
    // width:250,
    borderWidth: 1,
    height: 110,
    justifyContent: "center",
    alignItems: "center"

  },
  headtxt: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black"
  }




})