import * as React from 'react';
import { View, Text } from 'react-native';

export default function ObjectiveScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => {}}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Objective Screen</Text>
        </View>
    );
}