import * as React from 'react';
import { StyleSheet, TouchableOpacity, View, Text , FlatList} from 'react-native';
import BillButton from './BillButton'
import styles from './styles';
// const BillButton = ({ navigation, onPress, bill }) => {
//     const handleButtonPress = () => {
//         // Handle button press
//         console.log(bill.id)
//         navigation.navigate('Detail', {bill: bill});
//     };

//     return (
//         <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
//             <Text style={styles.textIdPrintDate}>ID: {bill.id}</Text>
//             <Text style={styles.textIdPrintDate}>Ngày in: {bill.date}</Text>
//             <Text style={styles.textPrice}>{bill.price}</Text>
//         </TouchableOpacity>
//     );
// };

export default function BillScreen({ navigation }) {
    const bill = [
         {id: '101123A', date:'10/11/2023', price: 7000, payment: "Tiền mặt"},
         {id: '101124A', date:'10/11/2023', price: 7000, payment: "Tiền mặt"},
         {id: '101125A', date:'10/11/2023', price: 7000, payment: "Tiền mặt"},
         {id: '101126A', date:'10/11/2023', price: 7000, payment: "Tiền mặt"},
        // Add more items as needed
      ];
    
      const renderItem = ({ item }) => {
        return <BillButton navigation={navigation} bill={item} isNavigate={true} />;
      };
    
      return (
        <View style={styles.container}  >
          <FlatList
            data={bill}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </View>
      );
};

