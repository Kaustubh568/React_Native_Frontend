import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CoinsCard from '../components/CoinsCard';

const { width } = Dimensions.get('window');

const CoinsCards = [
  {
    id: 1,
    image: 'https://media.istockphoto.com/id/1357143832/vector/stack-of-coins-with-shiny-golden-indian-rupee-currency-symbol.jpg?s=2048x2048&w=is&k=20&c=1WreBQ_wv_4YqNePAfihLt4poEgF7gpRRmntXz7I_n0=',
    coins: 260,
    VIP: 'Free 3 Days VIP',
    Price: '₹399.00',
  },
  {
    id: 2,
    image: 'https://media.istockphoto.com/id/1357143832/vector/stack-of-coins-with-shiny-golden-indian-rupee-currency-symbol.jpg?s=2048x2048&w=is&k=20&c=1WreBQ_wv_4YqNePAfihLt4poEgF7gpRRmntXz7I_n0=',
    coins: 530,
    VIP: 'Free 7 Days VIP',
    Price: '₹799.00',
  },
  {
    id: 3,
    image: 'https://media.istockphoto.com/id/1357143832/vector/stack-of-coins-with-shiny-golden-indian-rupee-currency-symbol.jpg?s=2048x2048&w=is&k=20&c=1WreBQ_wv_4YqNePAfihLt4poEgF7gpRRmntXz7I_n0=',
    coins: 1080,
    VIP: 'Free 1 Month VIP',
    Price: '₹1,599.00',
  },
  {
    id: 4,
    image: 'https://media.istockphoto.com/id/1357143832/vector/stack-of-coins-with-shiny-golden-indian-rupee-currency-symbol.jpg?s=2048x2048&w=is&k=20&c=1WreBQ_wv_4YqNePAfihLt4poEgF7gpRRmntXz7I_n0=',
    coins: 2700,
    VIP: 'Free 3 Months VIP',
    Price: '₹3999.00',
  },
  {
    id: 5,
    image: 'https://media.istockphoto.com/id/1357143832/vector/stack-of-coins-with-shiny-golden-indian-rupee-currency-symbol.jpg?s=2048x2048&w=is&k=20&c=1WreBQ_wv_4YqNePAfihLt4poEgF7gpRRmntXz7I_n0=',
    coins: 540,
    VIP: 'Free 6 Months VIP',
    Price: '₹7,900.00',
  },
  {
    id: 6,
    image: 'https://media.istockphoto.com/id/1357143832/vector/stack-of-coins-with-shiny-golden-indian-rupee-currency-symbol.jpg?s=2048x2048&w=is&k=20&c=1WreBQ_wv_4YqNePAfihLt4poEgF7gpRRmntXz7I_n0=',
    coins: 18200,
    VIP: 'Free 6 Months VIP',
    Price: '₹24,900.00',
  },
];

const Coins = () => {
  return (
    <LinearGradient
      colors={['#ED0ABB', '#E453EF', '#E169FF']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.headerView}>
        
         <Image source={require('../assets/money-bag.png')} 
          style={styles.image}
        />
        <Text style={styles.headerText}>Purchase Coins</Text>
      </View>
      <FlatList
        data={CoinsCards}
        renderItem={({ item }) => <CoinsCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 80,
    height: 80,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  flatListContent: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});

export default Coins;
