import * as React from 'react';
import { View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import IngredientItem from './IngredientItem';

export default function StorageScreen({ navigation }) {

    const ingredientItems =[
        {id: 3, calories:320, name: 'keo con cho', unit:'KG', image:'', quantity:12, price:25000, expirationDate:'2024-12-11'},
        {id: 4, calories:320, name: 'thit cay', unit:'KG', image:'', quantity:12, price:25000, expirationDate:'2024-12-11'},
        {id: 5, calories:320, name: 'trung ga', unit:'Qua', image:'', quantity:12, price:25000, expirationDate:'2024-12-11'},
        {id: 6, calories:320, name: 'thit ga', unit:'KG', image:'', quantity:12, price:25000, expirationDate:'2024-12-11'},
        {id: 7, calories:320, name: 'thit lon', unit:'KG', image:'', quantity:12, price:25000, expirationDate:'2024-12-11'},
        {id: 8, calories:320, name: 'com', unit:'KG', image:'', quantity:12, price:25000, expirationDate:'2024-12-11'},
    ]

    const renderItem = ({ item }) => {
        return <IngredientItem ingredient={item} />;
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:10 }}>
           <FlatList
                data={ingredientItems}
                renderItem={renderItem}
                keyExtractor={item => item.name}
                numColumns={3}
            />
        </View>
    );
}