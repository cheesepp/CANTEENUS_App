import * as React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';


// import * as React from 'react';
// import { View, Text } from 'react-native';

// export default function ChatScreen({ navigation }) {
//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Text
//                 onPress={() => alert('This is the "Home" screen.')}
//                 style={{ fontSize: 26, fontWeight: 'bold' }}>ChatScreen Screen</Text>
//         </View>
//     );
// }

export default function HomeScreen({ navigation }) {
    const handleButtonPress = (screenName) => {
        // Handle button press based on buttonNumber
        navigation.navigate(screenName)
      };
    
      return (
        <View style={styles.container}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress('Nhân Viên')}
            >
              <Text style={styles.buttonText}>Nhân viên</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress('Menu')}
            >
              <Text style={styles.buttonText}>Menu</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress('Kho')}
            >
              <Text style={styles.buttonText}>Kho</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress('Chỉ tiêu')}
            >
              <Text style={styles.buttonText}>Chỉ tiêu</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
}