import { StyleSheet, Text, View} from 'react-native'
//import * as React from 'react';

export default function ObjectiveItem({objective}) {
    //Hàm format lại chuỗi ngày tháng năm lấy ra từ database
    const formatDate = (input) => {
        var datePart = input.match(/\d+/g),
        year = datePart[0].substring(0), // get only two digits
        month = datePart[1], day = datePart[2];
      
        return day+'-'+month+'-'+year;
    }

    return (
        <View style={[styles.container,styles.button]}>
            <Text style={styles.text}>Ngày thiết lập: {formatDate(objective.date)}</Text>
            <Text style={styles.text}>Chỉ tiêu khẩu phần: {objective.target}</Text>
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
        backgroundColor: '#289CD2',
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