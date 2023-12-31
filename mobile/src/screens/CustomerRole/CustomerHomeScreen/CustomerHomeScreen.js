import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button, Image } from 'react-native';
import FoodItem from './FoodItem';
import axios from 'axios';
import { useUser } from '../../../models/userContext';
import { api } from '../../../constants/api';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FoodOrderModal from './OrderFoodModal';
import cartRepository from './repository/CartRepository';

const defaultImage = require('../../../assets/Images/Default_item.png')

export default function CustomerHomeScreen({ navigation }) {
    
    const [isModalVisible, setModalVisible] = useState(false);
    const [numOfItems, setNumOfItems] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);

    const openModal = (item) => {
        setSelectedItem(item);
        console.log(item)
        setModalVisible(true);
    };
    useEffect(() => {
        // cartRepository.clearCart()
        console.log('num of items', numOfItems)
        
    }, [numOfItems])
    const closeModal = () => {
        setModalVisible(false);
        
        let getLength = cartRepository.getLength()
        setNumOfItems((numOfItems) => numOfItems = getLength)
        setSelectedItem(null);
    };

    const { user } = useUser();

    //Tạo state để lưu trữ dữ liệu lấy về từ database
    const [foodItems, setFoodItems] = useState(null);

    //Tạo state để lưu trữ trạng thái của header
    const [isHeaderClicked, setHeaderClicked] = useState(false);

    //Hàm xử lý khi header được click
    const handleHeaderClick = () => {
        //Thay đổi trạng thái của header khi được click
        const fetchData = async () => {
            try {
                // Gọi API để lấy dữ liệu từ database
                const response = await axios.get(api.getItems, {
                    headers: {
                        Authorization: `Bearer ${user.jwt}`,
                    },
                });
                //Lưu dữ liệu lấy được vào state
                setFoodItems(response.data.items);

                //In ra màn hình console từng item lấy được để kiểm tra
                console.log('-------- Refresh Food Items ----------')
                response.data.items.map((item) => {
                    console.log(item);
                });
                console.log('---------------------------');

            } catch (error) {
                // Xử lý và báo lỗi
                if (error.request) {
                    console.log(error.request);
                }
            }
        };
        // Gọi hàm fetchData khi header được click
        fetchData();
        setHeaderClicked(!isHeaderClicked);
    };

    //Sử dụng useLayoutEffect để tạo header
    React.useLayoutEffect(() => {
        //Tạo header
        navigation.setOptions({
            title: 'Canteen US',
            headerStyle: {
                backgroundColor: '#4554DC'
            },
            headerTintColor: 'white',
            headerTitleAlign: 'left',
            //Tạo nút để reload dữ liệu từ database khi được click
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 15 }} onPress={() => {
                    navigation.navigate('customerCartName')
                }}>
                    <AntDesign size={30} name='shoppingcart' color={'white'} />
                    { numOfItems > 0 ? <View style={styles.badgeContainer}>
                        <Text style={styles.text}>{numOfItems}</Text>
                    </View> : null }
                </TouchableOpacity>
            ),
        });
    }, [navigation, isHeaderClicked]);

    //sử dụng useEffect để lấy dữ liệu từ database
    useEffect(() => {
        //Khởi tạo hàm fetchData để lấy dữ liệu từ database
        const fetchData = async () => {
            try {
                //dùng axios để lấy dữ liệu từ database
                const response = await axios.get(api.getItems, {
                    //headers để xác thực người dùng
                    headers: {
                        Authorization: `Bearer ${user.jwt}`,
                    },
                });

                //Lưu dữ liệu lấy được vào state
                setFoodItems(response.data.items);

                //In ra màn hình console từng item lấy được để kiểm tra
                console.log('-------- Food Items ----------')
                response.data.items.map((item) => {
                    console.log(item);
                });
                console.log('---------------------------')

            } catch (error) {
                // Xử lý và báo lỗi
                if (error.response) {
                    // Request được gửi đi và server trả về response với status code không phải 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // Request được gửi đi nhưng không nhận được response nào
                    console.log(error.request);
                } else {
                    // Có lỗi xảy ra khi setup request
                    console.log('Error', error.message);
                }
            }
        };

        //Gọi hàm fetchData để lấy dữ liệu từ database
        fetchData();
    }, []);

    //Hàm render item trong Flatlist để hiển thị dữ liệu lên màn hình
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => openModal(item)}>
                <View style={{
                    width: 110,
                    height: 110,
                    borderRadius: 10,
                    backgroundColor: '#ffffff',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 5,
                }}>
                    <Text style={[styles.text, { fontSize: 15 }]}>{item.name}</Text>
                    <Image source={(item.image == '') ? item.image : defaultImage} style={{
                        width: 60,
                        height: 60,
                        borderRadius: 10,
                    }} />
                    <Text style={[{
                        color: '#747474',
                        alignItems: 'center',
                        fontFamily: 'Monsterrat',
                        fontWeight: 'bold',
                    }, { fontSize: 13 }]}>đ {item.price}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    //Trả về giao diện của màn hình
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
            <FlatList
                data={foodItems}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={3}
            />
            <FoodOrderModal isVisible={isModalVisible} onClose={closeModal} item={selectedItem} />
        </View>
    );
}


const styles = StyleSheet.create({
    badgeContainer: {
        position: 'absolute',
        top: -6,
        right: -6,
        minWidth: 15,
        height: 15,
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    text: {
        color: 'black',
        fontSize: 10,
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#289CD2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingButtonIcon: {
        fontSize: 35,
        color: 'white',
    },
})