import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Button, Modal } from 'react-native';
import { useState } from 'react'

import React from 'react'
const defaultImage = require('../../../assets/Images/Default_item.png')
import Icon from 'react-native-vector-icons/FontAwesome';

export default function FoodDetailScreen({ navigation, route }) {
    const [modalVisible, setModalVisible] = useState(false);

    navigation.setOptions({
        title: 'Chi Tiết Món Ăn',
        headerStyle: {
            backgroundColor: '#4554DC'
        },
        headerTintColor: 'white',
        headerTitleAlign: 'left',
    });

    // Chỉnh dấu hiệu tiền
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
    };

    const { food } = route.params;
    console.log('FoodDetailScreen', food.ingredient);

    const editHandle = () => {
        navigation.navigate('EditFood', { food: food });
    };

    const deleteHandle = () => {
        setModalVisible(false);
    }
    return (
        <View style={styles.container}>
            <Image style={styles.img} source={food.image ? food.image : defaultImage} id='profile-pic' />
            <View>
                <View style={styles.textRow}>
                    <Text style={styles.label}>ID</Text>
                    <Text style={styles.value} id='menu-detail-id'>
                        {food ? food.id : ''}
                    </Text>
                </View>
                <View style={styles.textRow}>
                    <Text style={styles.label}>Tên món</Text>
                    <Text style={styles.value} id='menu-detail-name'>
                        {food ? food.name : ''}
                    </Text>
                </View>
                <View style={styles.textRow}>
                    <Text style={styles.label}>Giá</Text>
                    <Text style={styles.value} id='menu-detail-price'>
                        {formatCurrency(food ? food.price : '')}
                    </Text>
                </View>
                <View style={styles.textRow}>
                    <Text style={styles.label}>Nguyên liệu</Text>
                    <View style={styles.value}>
                        <FlatList
                            data={food ? food.ingredient : []}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <Text style={styles.value} id='menu-detail-ingredients'>
                                    + {item.quantity} {item.name}
                                </Text>
                            )}
                        />
                    </View>

                </View>


                <View style={styles.textRow}>
                    <Text style={styles.label}>Đánh giá</Text>
                    <View style={styles.rating_value}>
                        {Array.from({ length: food ? food.rating : 0 }).map((_, index) => (
                            <Icon key={index} name="star" size={18} color="gold" />
                        ))}
                    </View>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 15 }}>
                <TouchableOpacity style={[styles.button]} onPress={editHandle}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Sửa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button]} onPress={() => setModalVisible(true)}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Xóa</Text>
                </TouchableOpacity>
            </View>

            <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center'}}>Xóa món ăn này?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <TouchableOpacity title="Xóa" onPress={deleteHandle} style={[styles.button, {backgroundColor: '#FF5B5B'}]}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Có</Text>
                            </TouchableOpacity>
                            <TouchableOpacity title="Hủy" onPress={() => setModalVisible(false)} style={[styles.button, {backgroundColor: '#28D62F'}]}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Không</Text>

                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0.7,
        height: 'auto',
        width: '90%',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        alignSelf: 'center',
        borderRadius: 15,
    },
    button: {
        backgroundColor: '#279CD2',
        fontFamily: 'Montserrat',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 36,
        width: 80,
        alignSelf: 'center',
    },
    img: {
        height: 150,
        width: 150,
        alignSelf: 'center',
    },
    textRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
        height: 'auto',
    },
    label: {
        fontFamily: 'Montserrat',
        textAlign: 'left',
        flex: 2,
        fontSize: 15,
        fontWeight: 'bold',
        flexWrap: 'wrap',
    },
    value: {
        fontFamily: 'Montserrat',
        flexWrap: 'wrap',
        fontSize: 15,
        textAlign: 'left',
        flex: 3,
    },
    rating_value: {
        fontFamily: 'Montserrat',
        flexWrap: 'wrap',
        fontSize: 15,
        textAlign: 'left',
        flexDirection: 'row',
        flex: 3,
    },
    ingredient: {
        fontFamily: 'Montserrat',
        fontSize: 15,
        textAlign: 'left',
        flex: 3,
    },
    modalContainer: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        elevation: 10,
        // alignItems: 'center',
        width: '80%'
    },
});