import React from 'react';
import { View, Image, StyleSheet, Button, ImageSourcePropType } from 'react-native';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

interface SwipingCardProps {
  card: ImageSourcePropType;
  responseCallback: (response: boolean) => void;
}

const SwipingCard: React.FC<SwipingCardProps> = ({ card, responseCallback }) => {
  return (
    <View style={styles.container}>
      <Image
        source={card}
        style={styles.image}
        onError={(error) => console.error('Image loading error:', error.nativeEvent.error)}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="No"
          onPress={() => responseCallback(false)}
        />
        <Button
          title="Yes"
          onPress={() => responseCallback(true)}
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
    width: screenWidth * 0.9,
    height: screenHeight * 0.7,
    resizeMode: 'contain',
    top: 0,
  },
});

export default SwipingCard;
