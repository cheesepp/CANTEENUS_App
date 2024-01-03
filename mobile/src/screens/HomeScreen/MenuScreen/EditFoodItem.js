import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
const defaultImage = require('../../../assets/Images/Default_item.png')
import { Table, Row, Rows } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/FontAwesome';

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

    const handleSave = () => {
        console.log('Save called');
    };
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
    };
    const addIngredient = () => {
        const newIngredient = {
            id: ingredients.length + 1, // Lấy từ db
            item_ingredient: { quantity: 0 }, // Set your default quantity here
            name: "new ingredient",
            quantity: 0 // Set your default quantity here
        };

        setIngredients([...ingredients, newIngredient]);
    };
    const tableHead = ['Tên', 'Số lượng', ''];

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
                    <TextInput style={styles.value} id='menu-detail-name'>
                    </TextInput>
                </View>
                <View style={styles.textRow}>
                    <Text style={styles.label}>Giá</Text>
                    <TextInput style={styles.value} id='menu-detail-price'>

                    </TextInput>
                </View>
                {/* <View style={styles.textRow}>
                    <Text style={styles.label}>Nguyên liệu</Text>

                    <View style={styles.value}>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                            <Row data={tableHead} style={styles.header_text}/>
                            {ingredients.map(ingredient => (
                                <Row
                                    key={ingredient.id}
                                    data={[
                                        ingredient.name,
                                        ingredient.quantity,
                                        <TouchableOpacity onPress={() => removeIngredient(ingredient.id)}>
                                            <Icon name="trash" size={20} color="red" />
                                        </TouchableOpacity>
                                    ]}
                                    style={styles.data_text}
                                />
                            ))}
                        </Table>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={addIngredient}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Add Ingredient</Text>
                    </TouchableOpacity>
                </View> */}


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
    }
});
