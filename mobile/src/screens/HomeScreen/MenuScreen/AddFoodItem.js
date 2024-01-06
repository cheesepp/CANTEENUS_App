import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList, Modal, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
const defaultImage = require('../../../assets/Images/Default_item.png')
import { Table, Row, Rows } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/FontAwesome';
import { api } from '../../../constants/api';
import { useUser } from '../../../models/userContext';

export default function EditFoodItem({ navigation, route }) {
    navigation.setOptions({
        title: 'Thêm món ăn',
        headerStyle: {
            backgroundColor: '#4554DC'
        },
        headerTintColor: 'white',
        headerTitleAlign: 'left',
    });

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newIngredientQuantity, setNewIngredientQuantity] = useState('');

    const [selectedIngredient, setSelectedIngredient] = useState('');
    const { user } = useUser();

    //Lấy allingredients từ route.params
    const allIngredients = route.params.allIngredients;
    // console.log('All ingredients in AddFoodItem: ', allIngredients);


    const handleSave = () => {
        if (name.trim() === '' || price.trim() === '') {
            console.error('Please fill in all required fields');
            return;
        }
        console.log('Saveing ingredient', ingredients);
        const data = {
            name: name,
            price: price,
            ingredients: ingredients,
        }

        console.log('Sending data', data);
        fetch(api.addItem, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.jwt}`,
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(result => {
                // Handle the response from the server (if needed)
                console.log('Item added successfully:', result);

                // Reset the input fields after successful save
                clearInput();
            })
            .catch(error => {
                console.error('Error adding item:', error);
            });

        navigation.goBack();

    };

    const addIngredient = () => {

        setModalVisible(true);
    };
    const clearInput = () => {
        setName('');
        setPrice('');
        setIngredients([]);
    }


    const saveIngredient = () => {
        const ingredientId = allIngredients.find(ingredient => ingredient.name === selectedIngredient)?.id;
        
        const newIngredient = {
            id: ingredientId,
            name: selectedIngredient,
            quantity: newIngredientQuantity,
        };
        console.log('New ingredient: ', newIngredient);
        const updatedIngredients = [...ingredients, newIngredient];
        setIngredients(updatedIngredients);
        console.log('Added ingredients', ingredients);
        setModalVisible(false);
        setNewIngredientQuantity('');
    }


    return (

        <View style={styles.container}>
            <Image style={styles.img} source={defaultImage} id='profile-pic' />
            <View>
                <View style={styles.textRow}>
                    <Text style={styles.label}>Tên món</Text>

                    <TextInput style={styles.value} id='menu-input-name'
                        placeholder='Tên món'
                        value={name}
                        onChangeText={(text) => setName(text)}
                    ></TextInput>
                </View>
                <View style={styles.textRow}>
                    <Text style={styles.label}>Giá tiền</Text>

                    <TextInput style={styles.value} id='menu-input-price'
                        placeholder='Giá tiền'
                        value={price}
                        onChangeText={(text) => setPrice(text)}
                    ></TextInput>
                </View>
                <View style={styles.textRow}>
                    <Text style={styles.label}>Nguyên liệu</Text>
                    <TouchableOpacity style={styles.button_small} onPress={addIngredient}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>+</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.textRow}>
                    <Text style={styles.label}></Text>

                    <View style={styles.value}>
                        <FlatList
                            data={ingredients ? ingredients : []}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View>
                                    <Text style={[styles.value]} id='menu-detail-ingredients'>
                                        + {item.quantity} {item.name}
                                    </Text>
                                    {/* <TouchableOpacity style={[styles.button_small]} onPress={addIngredient}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>-</Text>
                                    </TouchableOpacity> */}
                                </View>

                            )}
                        />
                    </View>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Nhập nguyên liệu</Text>
                            <Picker
                                selectedValue={selectedIngredient}
                                onValueChange={(itemValue, itemIndex) => setSelectedIngredient(itemValue)}
                            >
                                <Picker.Item label="Chọn nguyên liệu" value="" />
                                {allIngredients.map(ingredient => (
                                    <Picker.Item key={ingredient.id} label={ingredient.name} value={ingredient.name} />
                                ))}
                            </Picker>
                            <TextInput
                                placeholder="Số lượng"
                                value={newIngredientQuantity}
                                onChangeText={(text) => setNewIngredientQuantity(text)}
                                keyboardType="numeric"
                                style={styles.input}
                            />
                            <TouchableOpacity title="Thêm" onPress={saveIngredient} style={[styles.button, { backgroundColor: '#28D62F' }]}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Thêm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity title="Hủy" onPress={() => setModalVisible(false)} style={[styles.button, { backgroundColor: '#FF5B5B' }]}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>


            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 15 }}>
                <TouchableOpacity style={[styles.button]} onPress={handleSave}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Thêm món</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button]} onPress={clearInput}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Xóa hết</Text>
                </TouchableOpacity>

            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {

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
        width: 130,
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
        height: 'auto'
    },
    label: {
        fontFamily: 'Montserrat',
        textAlign: 'left',
        alignSelf: 'center',
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
    header_text: {
        fontFamily: 'Montserrat',
        fontSize: 5,
        textAlign: 'left',
    },
    data_text: {
        fontFamily: 'Montserrat',
        fontSize: 5,
        textAlign: 'left',
    },
    button_small: {
        backgroundColor: '#279CD2',
        fontFamily: 'Montserrat',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 36,
        width: 50,
        alignSelf: 'center',
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
