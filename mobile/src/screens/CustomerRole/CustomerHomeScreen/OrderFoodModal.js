import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { Button } from '../../../components/Buttons';
import QuantitySelector from './QuantitySelector';
import cartRepository from './repository/CartRepository';

const defaultImage = require('../../../assets/Images/Default_item.png')

const TextSpanComponent = ({ att, value, isRating = false }) => {

  return isRating ? (
    <View style={{ marginTop: 10, marginBottom: 10 }}>

      <StarComponent starCount={value}></StarComponent>
    </View>
  ) : (
    <Text style={{
      marginBottom: 5
    }}>
      <Text style={styless.boldText}>{att}:</Text>
      {isRating == false ? <Text style={styless.value}> {value}</Text> : <StarComponent starCount={5}></StarComponent>}
    </Text>
  )

};


const StarComponent = ({ starCount = 0 }) => {
  return (
    <StarRatingDisplay
      rating={starCount}
      style={{ justifyContent: 'center' }}
    />
  )
}

const styless = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  value: {
    // fontStyle: 'italic',
  },
});


const FoodOrderModal = ({ isVisible, onClose, item }) => {
  const [uiQuantity, setQuantity] = useState(1);
  console.log(uiQuantity)
  const increaseQuantity = () => {
    setQuantity(uiQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (uiQuantity > 1) {
      setQuantity(uiQuantity - 1);
    }
  };
  const handleOrder = () => {
    // Implement your logic for placing the order
    // You might want to send the selected item to a server or perform other actions here
    orderedItem = {
      id: item.id,
      name: item.name,
      image: item.image ?? null,
      price: item.price,
      quantity: uiQuantity
    }
    console.log(orderedItem)
    cartRepository.addToCart(orderedItem)

    // Close the modal
    onClose();
  };

  return (
    <Modal
      // animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image source={defaultImage} style={styles.imageStyle} />

          {/* Display food items for selection */}
          {/* <TouchableOpacity onPress={() => handleItemSelect('Item 1')}>
            <Text style={{fontWeight:"bold"}}>ID:</Text>
          </TouchableOpacity> */}
          <TextSpanComponent att={'Tên'} value={item != null ? item.name : ''}></TextSpanComponent>
          <TextSpanComponent att={'Giá'} value={item != null ? item.price : ''}></TextSpanComponent>
          <TextSpanComponent att={'Đánh giá'} value={item != null ? item.rating : 0} isRating={true}></TextSpanComponent>
          <View style={{ justifyContent: 'center', marginVertical: 20 }}>
            <View style={styles.container}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.decrementButton} onPress={decreaseQuantity}>
                  <AntDesign name='minus' color={'white'} />
                </TouchableOpacity>

                <Text style={styles.quantityText}>{uiQuantity}</Text>

                <TouchableOpacity style={styles.incrementButton} onPress={increaseQuantity}>
                  <AntDesign name='plus' color={'white'} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Button to place the order */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
              <Text style={styles.orderButtonText}>Thêm vào giỏ hàng</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Hủy</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  imageStyle: {
    width: 60,
    height: 60,
    borderRadius: 10,
    alignSelf: 'center'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedItem: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  orderButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1, // Take up available space
    marginRight: 5, // Add margin for separation
  },
  orderButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: 'blue', // Add background color to make it more noticeable
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1, // Take up available space
    marginLeft: 5, // Add margin for separation
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});


export default FoodOrderModal;
