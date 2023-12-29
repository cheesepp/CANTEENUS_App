import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function FoodDetailScreen({ navigation, route }) {
    navigation.setOptions({
        title: 'Chi Tiết Món Ăn',
        headerStyle: { 
          backgroundColor: '#4554DC' 
        },
        headerTintColor: 'white',
        headerTitleAlign: 'left', 
    });

    const { food } = route.params;
    
    return (
        <View>
        <Text>{food.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})