import * as React from 'react';
import { View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import FoodItem from './FoodItem';

export default function MenuScreen({ navigation }) {

    const foodItems =[
        {id:40, name:'Com thit cho',  image:'',price:35000,rating:4},
        {id:41, name:'Com suon heo',  image:'',price:37000,rating:4},
        {id:42, name:'Com ga xe',  image:'',price:39000,rating:5},
        
    ]

    const renderItem = ({ item }) => {
        return <FoodItem food={item} />;
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:10 }}>
           <FlatList
                data={foodItems}
                renderItem={renderItem}
                keyExtractor={item => item.name}
                numColumns={3}
            />
        </View>
    );
}