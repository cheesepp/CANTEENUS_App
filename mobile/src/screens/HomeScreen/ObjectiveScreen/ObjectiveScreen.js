import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import ObjectiveItem from './ObjectiveItem';
import axios from 'axios';

export default function ObjectiveScreen({ navigation }) {

    const api ='http://localhost:3000/test/get-target'
    

    const items =[
        {date:'18/12/2023', number:18},
        {date:'19/12/2023', number:19},
        {date:'20/12/2023', number:20},
        {date:'21/12/2023', number:21},
    ]

    const renderItem = ({ item }) => {
        return <ObjectiveItem objective={item} />;
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.date}    
            />
        </View>
    );
}