import * as React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

export default function StaffButton({navigation, staff, isNavigate = false}) {
  const handleButtonPress = () => {
    // Handle button press
    if (isNavigate) {
      navigation.navigate('StaffDetail', {staff: staff});
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
      <Text style={styles.textButton}>ID: {staff.id}</Text>
      <Text style={styles.textButton}>Tên: {staff.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4554DC',
    marginVertical: 5,
    padding: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'left',
    height: 90,
    width: 380,
  },
  textButton: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: 3, // Add spacing between text components
  },
});
