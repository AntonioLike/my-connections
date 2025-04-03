import React, { useState } from 'react';
import { StyleSheet, View, ImageSourcePropType } from 'react-native';
import SwipingCard from './SwipingCard';

const cards: ImageSourcePropType[] = [
  require('../assets/images/cards/card1.jpg'),
  require('../assets/images/cards/card2.jpg'),
  require('../assets/images/cards/card3.jpg'),
  require('../assets/images/cards/card4.jpg'),
  require('../assets/images/cards/card5.jpg'),
  require('../assets/images/cards/card6.jpg'),
  require('../assets/images/cards/card7.jpg'),
  require('../assets/images/cards/card8.jpg'),
  require('../assets/images/cards/card9.jpg'),
  require('../assets/images/cards/card10.jpg'),
  require('../assets/images/cards/card11.jpg'),
  require('../assets/images/cards/card12.jpg'),
  require('../assets/images/cards/card13.jpg'),
  require('../assets/images/cards/card14.jpg'),
  require('../assets/images/cards/card15.jpg')
];

const SwipeDeck: React.FC = () => {
  const [currentCardId, setCurrentCardId] = useState<number>(0);

  const handleSwipe = (isSwipeRight: boolean) => {
    if (cards.length > currentCardId + 1) {
      setCurrentCardId(currentCardId + 1);
    }
  };

  const renderCards = () => {
    return (
      <SwipingCard
        card={cards[currentCardId]}
        responseCallback={handleSwipe}
      />
    );
  };

  return <View style={styles.container}>{renderCards()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default SwipeDeck;
