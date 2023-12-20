import { StyleSheet, Text, View, FlatList } from 'react-native'
import * as React from 'react';

export default function ObjectiveItem({objective}) {
    
  return (
    <View style={[styles.container,styles.button]}>
        <Text style={styles.text}>Ngày thiết lập: {objective.date}</Text>
        <Text style={styles.text}>Chỉ tiêu khẩu phần: {objective.number}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 15,
        justifyContent: 'center',
        gap:5,
    },
    button: {
        backgroundColor: '#4554DC',
        marginVertical: 5,
        padding: 5,
        borderRadius: 15,
        justifyContent: 'flex-start',
        alignItems:'flex-start',
        height: 80,
        width: 330,
    },
    text: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        marginVertical: 3, // Add spacing between text components
    },
})