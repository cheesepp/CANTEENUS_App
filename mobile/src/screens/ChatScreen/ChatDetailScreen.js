import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import Iconicons from 'react-native-vector-icons/Ionicons';

export default function ChatDetailScreen({ navigation, route }) {
    const [message, setMessage] = useState('');
    const { user } = route.params

    const sendMessage = () => {
        // Emit a 'sendMessage' event to the server
        // socket.emit('sendMessage', { sender: 'user1', receiver: 'user2', message });
        setMessage('');
    };

    
    navigation.setOptions({
        title: user.name,
        headerStyle: {
            backgroundColor: '#4554DC'
        },
        headerTintColor: 'white',
        headerTitleAlign: 'left',
    });


    return (
        <View style={{ flex: 1, justifyContent: 'top', flexDirection: 'column' }}>

            <Text style={{ flex: 1 }}>{user.name}</Text>
            <View style={{ flexDirection: 'row', borderTopWidth: 3, borderTopColor: '#279CD2', alignItems: 'center', paddingHorizontal: 5 }}>
                <TextInput style={{ flex: 1 }}
                    placeholder="Nhập tin nhắn..."
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                />

                <Iconicons size={20} name='send' />

            </View>
        </View>
    );
}