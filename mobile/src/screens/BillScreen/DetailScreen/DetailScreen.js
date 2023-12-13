import * as React from 'react';
import { View, Text } from 'react-native';
import BillButton from '../BillButton';

export default function DetailScreen({ route }) {
    const { bill } = route.params
    return (
        <View style={{ flex: 1, justifyContent: 'top', flexDirection: 'column' }}>
            <View style={{ alignItems: 'center' }}>
                <BillButton bill={bill} onPress={{}} ></BillButton>
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', alignItems: 'flex-start', paddingStart: 20 }}>Danh sách khẩu phần</Text>
            </View>
        
        </View>
    );
}