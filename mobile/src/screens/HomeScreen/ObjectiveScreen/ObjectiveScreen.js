import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import ObjectiveItem from './ObjectiveItem';
import axios from 'axios';

export default function ObjectiveScreen({ navigation }) {

    const api ='http://localhost:3000/test/get-target'
    
    const objectItems =[
        {id:4, date:'2024-12-13 16:48:44', target:50},
        {id:5, date:'2024-11-13 16:48:44', target:90},
    ]

    const renderItem = ({ item }) => {
        return <ObjectiveItem objective={item} />;
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:10}}>
            <FlatList
                data={objectItems}
                renderItem={renderItem}
                keyExtractor={item => item.date}    
            />
        </View>
    );
}