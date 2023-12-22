import * as React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';


export default function HomeScreen({ navigation }) {
    const handleButtonPress = (screenName) => {
        // Handle button press based on buttonNumber
        navigation.navigate(screenName)
      };
      navigation.setOptions({
        title: 'Canteen US',
        headerStyle: { 
          backgroundColor: '#4554DC' 
        },
        headerTintColor: 'white',
        headerTitleAlign: 'left', 
      });
    
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