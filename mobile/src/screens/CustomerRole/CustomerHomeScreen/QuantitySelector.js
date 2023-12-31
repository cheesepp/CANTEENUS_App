import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const QuantitySelector = ({quantity, setQuantity}) => {

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.decrementButton} onPress={decreaseQuantity}>
            <AntDesign name='minus' color={'white'} />
        </TouchableOpacity>

        <Text style={styles.quantityText}>{quantity}</Text>

        <TouchableOpacity style={styles.incrementButton} onPress={increaseQuantity}>
            <AntDesign name='plus' color={'white'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantityText: {
    // fontSize: 16,
    marginRight: 10,
    marginLeft: 10,
    alignSelf: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  decrementButton: {
    backgroundColor: '#FF5B5B',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',   
    borderRadius: 5,
    marginLeft: 5,
    height: 30,
    width: 30,
  },
  incrementButton: {
    backgroundColor: '#28D62F',
    padding: 10,
    height: 30,
    width: 30,
    borderRadius: 5,
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default QuantitySelector;
