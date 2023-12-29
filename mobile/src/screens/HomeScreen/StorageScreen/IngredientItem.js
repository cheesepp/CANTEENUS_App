import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import * as React from 'react'

//Hằng số lưu đường dẫn ảnh mặc định cho nguyên liệu
const defaultImage = require('../../../assets/Images/Default_item.png')

export default function IngredientItem({navigation,ingredient, isNavigate=false}) {
    //viết hàm formar lại chuỗi có dạng 2024-12-11T11:07:13.000Z thành 11/12/2024
    const formatDate = (input) => {
        var date = input.split('T')[0];
        var year = date.split('-')[0];
        var month = date.split('-')[1];
        var day = date.split('-')[2];
        return day+'/'+month+'/'+year;
    }

    //Hàm xử lý khi component được nhấn
    const handleFoodPress = () => {
        if(isNavigate){
            navigation.navigate('IngredientDetail', { ingredient: ingredient });
        }  
    }

    //Trả về giao diện của component
    return (
        <TouchableOpacity onPress={handleFoodPress}>
            <View style={styles.container}>
                <Text style={[styles.text,{fontSize:15}]}>{ingredient.name}</Text>
                <Image source={(ingredient.image=='')?ingredient.image:defaultImage} style={styles.imageStyle}/>
                <Text style={[styles.text,{fontSize:13}]}>{formatDate(ingredient.expirationdate)}</Text>
            </View>
        </TouchableOpacity>
        
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