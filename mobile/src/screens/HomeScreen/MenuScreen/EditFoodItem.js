import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList, Modal, Button } from 'react-native';
const defaultImage = require('../../../assets/Images/Default_item.png')
import { Table, Row, Rows } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/FontAwesome';
import {api} from '../../../constants/api'

export default function EditFoodItem({ navigation, route }) {
    navigation.setOptions({
        title: 'Chỉnh sửa món ăn',
        headerStyle: {
            backgroundColor: '#4554DC'
        },
        headerTintColor: 'white',
        headerTitleAlign: 'left',
    });
    const { food } = route.params;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [ingredients, setIngredients] = useState(food.ingredient);
    const [modalVisible, setModalVisible] = useState(false);
    const [newIngredientName, setNewIngredientName] = useState('');
    const [newIngredientQuantity, setNewIngredientQuantity] = useState('');

    const addIngredient = () => {
        setModalVisible(true);
    };

    const handleSave = () => {
        console.log('Save called TO BE IMPLEMENTED');
    };


    const saveIngredient = () => {
        if (newIngredientName.trim() !== '' && newIngredientQuantity.trim() !== '') {
            const newIngredient = {
                name: newIngredientName,
                quantity: newIngredientQuantity,
            };
            setIngredients([...ingredients, newIngredient]);
            setModalVisible(false);
            setNewIngredientName('');
            setNewIngredientQuantity('');
        }
    }

    const removeIngredient = (id) => {
        const updatedIngredients = ingredients.filter(ingredient => ingredient.id !== id);
        setIngredients(updatedIngredients);
    };
    return (

        <View style={styles.container}>
            <Image style={styles.img} source={food.image ? food.image : defaultImage} id='profile-pic' />
            <View>
                <View style={styles.textRow}>
                    <Text style={styles.label}>Tên món</Text>

                    <TextInput style={styles.value} id='menu-input-name'
                        placeholder='Tên món'
                        value={food.name}
                        onChangeText={(text) => setName(text)}
                    ></TextInput>
                </View>
                <View style={styles.textRow}>
                    <Text style={styles.label}>Giá tiền</Text>

                    <TextInput style={styles.value} id='menu-input-price'
                        placeholder='Giá tiền'
                        value={food.price.toString()}
                        onChangeText={(text) => setPrice(text)}
                    ></TextInput>
                </View>



                <View style={styles.textRow}>
                    <Text style={styles.label}>Nguyên liệu</Text>
                    <TouchableOpacity style={[styles.button_small]} onPress={addIngredient}>
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
                            <TextInput
                                placeholder="Tên nguyên liệu"
                                value={newIngredientName}
                                onChangeText={(text) => setNewIngredientName(text)}
                                style={styles.input}
                            />
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
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Lưu thay đổi</Text>
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
        flex: 2,
        fontSize: 15,
        fontWeight: 'bold',
        flexWrap: 'wrap',
        alignSelf: 'center',
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
});
