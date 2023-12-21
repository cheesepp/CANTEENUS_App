import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Iconicons from 'react-native-vector-icons/Ionicons';
import io from 'socket.io-client';

const ChatBubble = ({ sender, message }) => (
    <View style={sender === 'AD02d58210-9f24-11ee-a624-3d9e18899aeb' ? styles.sentBubble : styles.receivedBubble}>
        <Text style={styles.messageText}>{message}</Text>
    </View>
);

export default function ChatDetailScreen({ navigation, route }) {
    const [message, setMessage] = useState('');
    const { user } = route.params
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        const newSocket = io('http://10.0.2.2:8080'); // Replace with your server URL
        // Listen for initial messages
        newSocket.on('initialMessages', (initialMessages) => {
            setMessages(initialMessages);
        });

        // Listen for new messages
        newSocket.on('newMessage', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        // Listen for connection status
        newSocket.on('connect', () => {
            console.log('Connected to server');
        });

        setSocket(newSocket)

        return () => {
            // Disconnect the socket when the component unmounts
            newSocket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        // Emit a 'sendMessage' event to the server
        if (socket) {

            socket.emit('sendMessage', { sender: 'AD02d58210-9f24-11ee-a624-3d9e18899aeb', receiver: user.id, message });
            setMessage('');
        }
    };



    navigation.setOptions({
        title: user.name,
        headerStyle: {
            backgroundColor: '#4554DC'
        },
        headerTintColor: 'white',
        headerTitleAlign: 'left',
    });

    const renderMessageItem = ({ item }) => (
        <ChatBubble sender={item.sender} message={item.message} />
    );

    return (
        <View style={{ flex: 1, justifyContent: 'top', flexDirection: 'column' }}>

            <View style={{
                flex: 1, padding: 16,
                justifyContent: 'flex-end',
            }}>
                <FlatList
                    style={{
                        flex: 1,
                        marginBottom: 16,
                    }}
                    data={messages}
                    keyExtractor={(item) => item._id}
                    renderItem={renderMessageItem}
                ></FlatList>
            </View>

            <View style={{ flexDirection: 'row', borderTopWidth: 3, borderTopColor: '#279CD2', alignItems: 'center', paddingHorizontal: 5 }}>
                <TextInput style={{ flex: 1 }}
                    placeholder="Nhập tin nhắn..."
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                />
                <TouchableOpacity onPress={sendMessage}>

                    <Iconicons size={20} name='send' />
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'flex-end',
    },
    messageList: {
        flex: 1,
        marginBottom: 16,
    },
    sentBubble: {
        alignSelf: 'flex-end',
        backgroundColor: '#4554DC',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
    },
    receivedBubble: {
        alignSelf: 'flex-start',
        backgroundColor: '#747474',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
    },
    messageText: {
        color: 'white',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        marginRight: 8,
        padding: 8,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
    },
});