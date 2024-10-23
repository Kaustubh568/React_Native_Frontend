import { StyleSheet, Text, View, FlatList, Image, Animated, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';

const { height, width } = Dimensions.get('window');


const Share = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const data = [
    { id: '1', image: 'https://res.cloudinary.com/dcb6tgaps/image/upload/v1723454309/test_Api/x4mu942lr7uduimwkcwv.jpg', text: 'Item 1' },
    { id: '2', image: 'https://res.cloudinary.com/dcb6tgaps/image/upload/v1723454309/test_Api/x4mu942lr7uduimwkcwv.jpg', text: 'Item 2' },
    { id: '3', image: 'https://res.cloudinary.com/dcb6tgaps/image/upload/v1723454309/test_Api/x4mu942lr7uduimwkcwv.jpg', text: 'Item 3' },
  ];

  const Paginator = ({ data }) => {
    return (
      <View style={{ flexDirection: 'row', height: 10 , justifyContent:"center",alignItems:"center"}}>
        {
          data.map((item, index) => {
            return <View style={[styles.dot, { width: 10}]} key={index} />
          })
        }
      </View>
    )
  }

  const RenderItem = ({ item }) => {

    return (
      <LinearGradient
        colors={['green', 'white']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Image source={{ uri: item.image }} style={styles.img} />
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </LinearGradient>
    )
  }

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <>
      <Paginator data={data} />
      <FlatList
        data={data}
        renderItem={({ item }) => <RenderItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={(item) => item.title}
        bounces={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />
    </>
  )
}

export default Share

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    borderRadius: 8,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height / 2,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  img: {
    height: 200,
    width: 180,
    borderRadius: 12,
    borderColor: "black"
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  dot: {
    height:10,
    borderRadius:5,
    backgroundColor:'#493d8a',
    marginHorizontal:8,
  },
});