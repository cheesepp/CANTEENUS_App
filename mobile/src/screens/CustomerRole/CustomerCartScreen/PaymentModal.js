import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const cashImage = require('../../../assets/Images/cash.png')
const bankingImage = require('../../../assets/Images/banking.png')


const PaymentModal = ({ isVisible, onClose, onConfirm }) => {
  const [selectedItem, setSelectedItem] = useState('')
  // useEffect(() => {
  //   console.log(selectedItem)
  //   return () => {
  //     setSelectedItem('ck')
  //   }
  // }, [selectedItem])
  const checkPayment= (item) => {
    setSelectedItem(item)
    // setSelectedItem('ck')
  }
  return (
    <Modal
      // animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>

          <TouchableOpacity onPress={()=> checkPayment('ck')} style={{ marginBottom: 30 }}>
            <View style={ styles.buttonStyle}>
              <Image source={bankingImage} style={styles.imageStyle}></Image>
              <Text>Chuyển khoản</Text>
              { selectedItem === 'ck' && <AntDesign name='check'></AntDesign>}

            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => checkPayment('cash')}>
            <View style={ styles.buttonStyle }>
              <Image source={cashImage} style={styles.imageStyle}></Image>
              <Text>Tiền mặt</Text>
              {selectedItem === 'cash' && <AntDesign name='check'></AntDesign>}
            </View>
          </TouchableOpacity>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={selectedItem != '' ? styles.confirmButton : styles.unconfirmButton} onPress={()=>{onConfirm(selectedItem)}}>
              <Text style={styles.orderButtonText}>Xác nhận</Text>
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
  buttonStyle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' },
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    width: '80%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 300,
  },
  confirmButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1, // Take up available space
    marginRight: 5, // Add margin for separation
  },
  unconfirmButton: {
    backgroundColor: 'grey',
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    height: '60%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  imageStyle: {
    width: 150,
    height: 50,
    borderRadius: 10,
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


export default PaymentModal;
