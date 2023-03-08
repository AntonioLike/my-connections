import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Card = () => {
  return (
    <View style={styles.container}>
      <Image source={require('./resources/card01.jpg')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  },
});

export default Card;
