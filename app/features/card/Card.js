import React from 'react';
import { View, Image, StyleSheet, Button} from 'react-native';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const Card = () => {
  return (
    <View style={styles.container}>
      <Image source={require('./cards/card1.jpg')} style={styles.image} 
      onError={(error) => console.log(error)}/>
      <View style={styles.buttonContainer}>
        <Button
          title="Yes"
          onPress={() => {
            console.log('Button Yes clicked!');
          }}
        />
        <Button
          title="No"
          onPress={() => {
            console.log('Button No clicked!');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    width: '20%',
  },
  image: {
    width: screenWidth*0.9,
    height: screenHeight*0.7,
    resizeMode: 'contain',
    top: 0,
  },
});

export default Card;
