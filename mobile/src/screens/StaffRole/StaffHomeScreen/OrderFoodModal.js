import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';

const defaultImage = require('../../../assets/Images/Default_item.png')

const FoodOrderModal = ({ isVisible, onClose }) => {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemSelect = (item) => {
        setSelectedItem(item);
    };

    const handleOrder = () => {
        // Implement your logic for placing the order
        // You might want to send the selected item to a server or perform other actions here
        console.log('Order placed:', selectedItem);

        // Close the modal
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Image source={defaultImage} style={styles.imageStyle} />

                    {/* Display food items for selection */}
                    <TouchableOpacity onPress={() => handleItemSelect('Item 1')}>
                        <Text>Item 1</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleItemSelect('Item 2')}>
                        <Text>Item 2</Text>
                    </TouchableOpacity>

                    {/* Add more items as needed */}

                    {/* Display the selected item */}
                    {selectedItem && (
                        <Text style={styles.selectedItem}>Selected Item: {selectedItem}</Text>
                    )}

                    {/* Button to place the order */}
                    <TouchableOpacity
                        style={styles.orderButton}
                        onPress={handleOrder}
                    >
                        <Text style={styles.orderButtonText}>Place Order</Text>
                    </TouchableOpacity>

                    {/* Button to close the modal */}
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.closeButton}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    imageStyle: {
        width: 60,
        height: 60,
        borderRadius: 10,
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
    orderButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    orderButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    closeButton: {
        marginTop: 10,
        color: 'blue',
    },
});

export default FoodOrderModal;
