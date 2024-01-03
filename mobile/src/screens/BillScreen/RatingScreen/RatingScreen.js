import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useUser } from '../../../models/userContext';
import StarRating from 'react-native-star-rating-widget';
import SuccessfulModal from '../../CustomerRole/CustomerCartScreen/SuccessfulModal';
function RatingItem({item}) {
    const [rating, setRating] = useState(0);
    return (
        <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 30 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text
                    onPress={() => { }}
                    style={{ fontSize: 26, fontWeight: 'bold' }}>{item.name}</Text>
            </View>
            <View style={{ marginVertical: 10, width: 300, borderBottomWidth: 3, borderBottomColor: '#00000' }}></View>
            <StarRating
                rating={rating}
                onChange={setRating}
            />
        </View>
    )
}
export default function RatingScreen({ navigation, route }) {
    const [isSuccessfulModalVisible, setIsSuccessfulModalVisible] = useState(false);

    const { bill } = route.params
    console.log(bill.item)  
    navigation.setOptions({
        title: 'Đánh giá đơn hàng',
        headerStyle: {
          backgroundColor: '#4554DC'
        },
        headerTintColor: 'white',
        headerTitleAlign: 'left',
      });
    const renderItem = ({ item }) => (
        <RatingItem item={item}></RatingItem>
    );

    const openModal = () => {

        setIsSuccessfulModalVisible(true);
      };
      const closeModal = () => {
        setIsSuccessfulModalVisible(false);
        navigation.goBack()
      };

    return (
        <View style={{ flex:1, flexDirection: 'column' }}>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <FlatList
                    style={{ flex: 1 }}
                    data={bill.item}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()} // Assuming your items have an 'id' property
                ></FlatList>
            </View>
            <View>
                <TouchableOpacity style={styles.rateButton} onPress={openModal}>
                    <Text style={styles.closeButtonText}>Gửi đánh giá</Text>
                </TouchableOpacity>
            </View> 
            <SuccessfulModal isVisible={isSuccessfulModalVisible} onClose={closeModal} text={'Đánh giá thành công!'}></SuccessfulModal>
        </View>
    );
}

const styles = StyleSheet.create({
    successText: {
        fontSize: 20,
        marginVertical: 20,
        fontWeight: 'bold'
    },
    rateButton: {
        backgroundColor: '#279CD2', // Add background color to make it more noticeable
        padding: 20,
        width: 200,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 30,
        marginBottom: 15,
        alignItems: 'center',
    },
    closeButtonText: {
        fontWeight: 'bold',
        color: 'white'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300, // Adjust the width as needed
        height: 200, // Adjust the height as needed
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
});