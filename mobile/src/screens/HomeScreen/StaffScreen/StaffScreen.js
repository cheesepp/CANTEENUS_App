import * as React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, FlatList } from 'react-native';


const StaffButton = ({ navigation, staff, isNavigate = false }) => {
    const handleButtonPress = () => {
        // Handle button press
        if (isNavigate) {
            navigation.navigate('Detail', { bill: bill });
        }
    }

    return (
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
            <Text style={styles.textButton}>ID: {staff.id}</Text>
            <Text style={styles.textButton}>Tên: {staff.name}</Text>
        </TouchableOpacity>
    );
}

export default function StaffScreen({ navigation }) {
    const staff = [
        {id: '101123A', name: 'Việt', price: 7000, payment: "Tiền mặt"},
        {id: '101125A', name: 'Nam', price: 7000, payment: "Tiền mặt"},
        {id: '101126A', name: 'Chủ', price: 7000, payment: "Tiền mặt"},
        {id: '101127A', name: 'Nghĩa', price: 7000, payment: "Tiền mặt"},
       // Add more items as needed
     ];
   
     const renderItem = ({ item }) => {
       return <StaffButton navigation={navigation} staff={item} />;
     };
   
     return (
       <View style={styles.container}  >
         <FlatList
           data={staff}
           keyExtractor={(item) => item.id}
           renderItem={renderItem}
         />
       </View>
     );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 15,
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#4554DC',
        marginVertical: 5,
        padding: 15,
        borderRadius: 15,
        justifyContent: 'top',
        alignItems: 'left',
        height: 80,
        width: 330,
    },
    textButton: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'left',
        marginVertical: 3, // Add spacing between text components
    },
});