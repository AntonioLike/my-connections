import React, { useState } from 'react';
import { StyleSheet, View, Animated, PanResponder } from 'react-native';
import SwipingCard from '../swiping-card/SwipingCard';

const cards = [
  require('../../resources/cards/card1.jpg'),
  require('../../resources/cards/card2.jpg'),
  require('../../resources/cards/card3.jpg'),
  require('../../resources/cards/card4.jpg'),
  require('../../resources/cards/card5.jpg'),
  require('../../resources/cards/card6.jpg'),
  require('../../resources/cards/card7.jpg'),
  require('../../resources/cards/card8.jpg'),
  require('../../resources/cards/card9.jpg'),
  require('../../resources/cards/card10.jpg'),
  require('../../resources/cards/card11.jpg'),
  require('../../resources/cards/card12.jpg'),
  require('../../resources/cards/card13.jpg'),
  require('../../resources/cards/card14.jpg'),
  require('../../resources/cards/card15.jpg')
];

const SwipeDeck = () => {  
  const [currentCardId, setCurrentCardId] = useState(0);

  const handleSwipe = (isSwipeRight) => {
    if(cards.length > currentCardId + 1) {
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
