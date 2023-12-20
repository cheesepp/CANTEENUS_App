import * as React from 'react';
import { StyleSheet, TouchableOpacity, View, Text , FlatList} from 'react-native';
import styles from './styles'

export default BillButton = ({ navigation, bill, isNavigate=false }) => {
    const handleButtonPress = () => {
        // Handle button press
        if (isNavigate) {
            navigation.navigate('Detail', { bill: bill });
        }
    }

    return (
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
            <Text style={styles.textIdPrintDate}>ID: {bill.id}</Text>
            <Text style={styles.textIdPrintDate}>Ngày in: {bill.createdAt}</Text>
            {isNavigate === true ?
                <Text style={styles.textPrice}>{bill.totalPrice}</Text>
            :
                <Text style={{fontSize: 15, color: 'white', marginTop: 10, fontWeight: 'bold'}}>Phương thức thanh toán: {bill.paymentMethod}</Text>}
        
        </TouchableOpacity>
    );
}