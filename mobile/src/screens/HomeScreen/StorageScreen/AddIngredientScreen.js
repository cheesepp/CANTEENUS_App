import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function AddIngredientScreen({navigation}) {
    navigation.setOptions({
        title: 'Thêm Nguyên Liệu',
        headerStyle: { 
          backgroundColor: '#4554DC' 
        },
        headerTintColor: 'white',
        headerTitleAlign: 'left', 
    });

    return (
    <View>
      <Text>AddIngredientScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})