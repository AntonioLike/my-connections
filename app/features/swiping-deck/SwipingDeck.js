import React, { useState } from 'react';
import { StyleSheet, View, Animated, PanResponder } from 'react-native';
import SwipingCard from '../swiping-card/SwipingCard';

const cards = [
  require('../../assets/images/cards/card1.jpg'),
  require('../../assets/images/cards/card2.jpg'),
  require('../../assets/images/cards/card3.jpg'),
  require('../../assets/images/cards/card4.jpg'),
  require('../../assets/images/cards/card5.jpg'),
  require('../../assets/images/cards/card6.jpg'),
  require('../../assets/images/cards/card7.jpg'),
  require('../../assets/images/cards/card8.jpg'),
  require('../../assets/images/cards/card9.jpg'),
  require('../../assets/images/cards/card10.jpg'),
  require('../../assets/images/cards/card11.jpg'),
  require('../../assets/images/cards/card12.jpg'),
  require('../../assets/images/cards/card13.jpg'),
  require('../../assets/images/cards/card14.jpg'),
  require('../../assets/images/cards/card15.jpg')
];

const SwipeDeck = () => {
  const [currentCardId, setCurrentCardId] = useState(0);

  const handleSwipe = (isSwipeRight) => {
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
    )
  };

  return <View>{renderCards()}</View>;

}
export default SwipeDeck;
