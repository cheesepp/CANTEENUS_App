import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function IngredientDetailScreen({ navigation, route }) {
    navigation.setOptions({
        title: 'Chi Tiết Nguyên Liệu',
        headerStyle: { 
          backgroundColor: '#4554DC' 
        },
        headerTintColor: 'white',
        headerTitleAlign: 'left', 
    });

    const { ingredient } = route.params;
    
    return (
        <View>
        <Text>{ingredient.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})