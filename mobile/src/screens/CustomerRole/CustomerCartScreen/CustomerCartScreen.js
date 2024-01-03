// import * as React from 'react';
// import { View, Text, FlatList } from 'react-native';
// import cartRepository from '../CustomerHomeScreen/repository/CartRepository';
// import { Image } from 'react-native-svg';

// const defaultImage = require('../../../assets/Images/Default_item.png');

// export default function CustomerCartScreen({ navigation }) {
//     const cartItems = cartRepository.getCartItems();

//     const renderItem = ({ item }) => (
//         <View style={{ flexDirection: 'row', alignSelf: 'flex-start', padding: 15, marginVertical: 20, borderBottomWidth: 3, borderBottomColor: '#00000' }}>
//             <Image source={defaultImage} />
//             <View style={{ flexDirection: 'row', flex: 5 }}>
//                 <Text style={{ fontSize: 20 }}>{item.name}</Text>
//                 <Text style={{ fontSize: 20 }}>    x{item.quantity}</Text>
//             </View>
//             <Text style={{ fontSize: 20, flex: 1 }}>{item.price}</Text>
//         </View>
//     );

//     return (
//         <View style={{ flex: 1, flexDirection: 'column' }}>
//             <FlatList
//                 style={{ flex: 5 }}
//                 data={cartItems}
//                 renderItem={renderItem}
//                 keyExtractor={(item) => item.id.toString()} // Assuming your items have an 'id' property
//             />
//             <View style={{
//                 flex: 1,
//                 justifyContent: 'flex-end', paddingLeft: 20, paddingRight: 20
//             }}>
//                 <Text style={{ flex: 4, fontSize: 20, fontWeight: 'bold', textDecorationLine: 'underline' }}>Tổng cộng: </Text>
//                 {/* <Text style={{ flex: 2, fontSize: 20, fontWeight: 'bold' }}>VND</Text> */}
//             </View>
//         </View>
//     );
// }
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import cartRepository from '../CustomerHomeScreen/repository/CartRepository';
import { Image } from 'react-native-svg';
import PaymentModal from './PaymentModal';
import { useUser } from '../../../models/userContext';
import { api } from '../../../constants/api';
import axios from 'axios';
import SuccessfulModal from './SuccessfulModal';
const defaultImage = require('../../../assets/Images/Default_item.png');
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function CustomerCartScreen({ navigation }) {
  const { user } = useUser();
  const cartItems = cartRepository.getCartItems();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [hasOrdered, setHasOrdered] = useState(false)
  const [payment, setPayment] = useState('')
  const [uiCartItems, setUICartItems] = useState(cartItems)
  console.log('Payment state', payment)
  const [isSuccessfulModalVisible, setIsSuccessfulModalVisible] = useState(false);


  const onConfirmOrder = () => {
    setHasOrdered(false)
    console.log('payment: ', payment)
    setIsSuccessfulModalVisible(false);
    cartRepository.clearCart()

  }


  const onConfirm = (item) => {
    setPayment(item)
    console.log(payment)
    closeModal()
  }
  const openModal = (item) => {
    console.log(item)
    console.log(cartItems)
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const onOrder = async () => {
    if (payment === '') {
      console.log('vào đây')
      openModal()
    } else {
      try {
        console.log('vào đây 2')
        console.log('payment: ', payment)
        setIsLoading(true)
        // Gọi API để lấy dữ liệu từ database
        console.log(cartItems)
        const response = await axios.post(api.addBill, {
          items: cartItems,
          payment: payment
        }, {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        });
        setIsLoading(false)
        setHasOrdered(true)
        console.log(response)
      } catch (error) {
        // Xử lý và báo lỗi
        if (error.request) {
          console.log(error.request);
        }
      }
    }

  };


  useEffect(() => {
    if (isLoading) {
      console.log('is loading ....')
    } else {
      if (hasOrdered) {
        console.log('done!')
        setIsSuccessfulModalVisible(true)

      }
    }
  }, [isLoading, hasOrdered, uiCartItems])



  navigation.setOptions({
    title: 'Giỏ Hàng',
    headerStyle: {
      backgroundColor: '#4554DC'
    },
    headerTintColor: 'white',
    headerTitleAlign: 'left',
  });
  const renderItem = ({ item }) => (

    // <View style={{ flexDirection: 'row', alignSelf: 'flex-start', padding: 15, marginVertical: 20, borderBottomWidth: 3, borderBottomColor: '#00000' }}>
    //   <Image source={defaultImage}></Image>
    //   <View style={{ flexDirection: 'row', flex: 1}}>
    //     <Text style={{ fontSize: 20, }}>{item.name}</Text>
    //     <Text style={{ fontSize: 20 }}>    x{item.quantity}</Text>
    //   </View>
    //   <Text style={{ fontSize: 15 }}>{item.price} VND</Text>
    // </View>
    <View style={{ flexDirection: 'row', alignItems: 'baseline', paddingRight: 10, borderBottomWidth: 3, borderBottomColor: '#00000' }}>

      <View style={{ flex: 1, flexDirection: 'column', paddingLeft: 15, marginTop: 20, }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 20, flex: 1 }}>{item.name}</Text>
          <Text style={{ fontSize: 20, marginRight: 10, alignItems: 'baseline', }}>x{item.quantity}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
          <Text style={{ flex: 1 }}>{item.price}</Text>
          <Text style={{ marginRight: 15 }}>{item.price * item.quantity}</Text>
        </View>

        {/* Add more views or components to display other properties of the item */}
      </View>
      <View>

        <TouchableOpacity onPress={() => {
          cartRepository.removeFromCart(item.id)
          setUICartItems(cartRepository.getCartItems())
        }}>
          <AntDesign name='delete' color={'black'} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return cartItems.length == 0 ? (
    <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>

      <Text style={{ flex: 1, justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: 25 }}> Chưa đặt món nào! </Text>
    </View>
  ) : (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <FlatList
        style={{ flex: 1 }}
        data={uiCartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Assuming your items have an 'id' property
      ></FlatList>
      <View style={{ flexDirection: 'row', paddingHorizontal: 10, marginBottom: 10, }}>
        <Text style={{ flex: 4, fontSize: 20, fontWeight: 'bold' }}>Tổng cộng: </Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)} VND</Text>
      </View>
      <View style={{ width: '90%', borderBottomWidth: 1, borderBottomColor: '#00000', marginBottom: 8, alignSelf: 'center' }}></View>
      <View style={{ flexDirection: 'row' }}>

        <TouchableOpacity
          style={{ backgroundColor: '#013220', padding: 20, alignItems: 'center', flex: 1 }}
          onPress={openModal}
        >
          <Text style={{ color: 'white', fontSize: 15 }}>Hình thức thanh toán</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: payment != '' ? 'green' : 'grey', padding: 20, alignItems: 'center', flex: 1 }}
          onPress={payment != '' ? onOrder : () => { }}
        >
          <Text style={{ color: 'white', fontSize: 18 }}>Đặt hàng</Text>
        </TouchableOpacity>
      </View>
      <PaymentModal isVisible={isModalVisible} onClose={closeModal} onConfirm={onConfirm}></PaymentModal>
      <SuccessfulModal isVisible={isSuccessfulModalVisible} onClose={onConfirmOrder} text={'Thanh toán thành công!'}></SuccessfulModal>
    </View>
  );

}