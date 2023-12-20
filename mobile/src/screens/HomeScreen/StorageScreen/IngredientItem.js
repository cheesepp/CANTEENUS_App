import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

export default function IngredientItem({ingredient}) {

    //Hằng số lưu đường dẫn ảnh mặc định cho nguyên liệu
    const defaultImage = require('../../../assets/Images/Default_item.png')
    
    //Hàm format lại chuỗi ngày tháng năm lấy ra từ database
    const formatDate = (input) => {
        var datePart = input.match(/\d+/g),
        year = datePart[0].substring(0), // get only two digits
        month = datePart[1], day = datePart[2];
      
        return day+'/'+month+'/'+year;
    }

    return (
        <View style={styles.container}>
        <Text style={[styles.text,{fontSize:15}]}>{ingredient.name}</Text>
        <Image source={(ingredient.image!='')?food.image:defaultImage} style={styles.imageStyle}/>
        <Text style={[styles.text,{fontSize:13}]}>{formatDate(ingredient.expirationDate)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:110,
        height:110,
        borderRadius:10,
        backgroundColor:'#ffffff',
        justifyContent:'center',
        alignItems:'center',
        margin:5,
    },
    imageStyle:{
        width:60,
        height:60,
        borderRadius:10,
    },
    text:{
        color: '#747474',
        alignItems: 'center',
        fontFamily: 'Monsterrat',
        fontWeight: 'bold',
    }
})