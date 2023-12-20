import { StyleSheet, Text, View,Image } from 'react-native'
import * as React from 'react'

export default function IngredientItem({ingredient}) {
    //Hằng số lưu đường dẫn ảnh mặc định cho nguyên liệu
    const defaultImage = require('../../../assets/Images/Default_item.png')
    
    //viết hàm formar lại chuỗi có dạng 2024-12-11T11:07:13.000Z thành 11/12/2024
    const formatDate = (input) => {
        var date = input.split('T')[0];
        var year = date.split('-')[0];
        var month = date.split('-')[1];
        var day = date.split('-')[2];
        return day+'/'+month+'/'+year;
    }

    return (
        <View style={styles.container}>
        <Text style={[styles.text,{fontSize:15}]}>{ingredient.name}</Text>
        <Image source={(ingredient.image=='')?ingredient.image:defaultImage} style={styles.imageStyle}/>
        <Text style={[styles.text,{fontSize:13}]}>{formatDate(ingredient.expirationdate)}</Text>
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