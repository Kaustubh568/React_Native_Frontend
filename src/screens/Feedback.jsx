import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { stickyWorkers } from '../../metro.config'

const Feedback = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contactBox}>
        <Text style={styles.EmailText}>Email: </Text>
        <Text style={styles.RandomEmail}>abc123@gmail.com</Text>
      </View>
    </View>
  )
}

export default Feedback

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contactBox: {
    borderRadius: 20,
    padding: 10,
    margin: 12,
    backgroundColor: "white",
    gap:8,
  },
  EmailText: {
    fontSize: 24,
    fontWeight: "400",
  },

  RandomEmail:{
    fontSize:18,
    color:"#45474B",
  
  }

})