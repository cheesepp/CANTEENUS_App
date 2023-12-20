import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

export default function FoodItem({food}) {

    //Hằng số lưu đường dẫn ảnh mặc định cho món ăn
    const defaultImage = require('../../../assets/Images/Default_item.png')
   
    return (
        <View style={styles.container}>
        <Text style={[styles.text,{fontSize:15}]}>{food.name}</Text>
        <Image source={(food.image!='')?food.image:defaultImage} style={styles.imageStyle}/>
        <Text style={[styles.text,{fontSize:13}]}>đ {food.price}</Text>
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