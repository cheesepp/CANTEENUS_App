import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import { useUser } from '../../models/userContext';
import { api } from '../../constants/api'
export default function ChatScreen({ navigation }) {

    const { user } = useUser();
    const [staffs, setStaffs] = useState(null);
    const [isHeaderClicked, setHeaderClicked] = useState(false);




    useEffect(() => {
        // Toggle the state when the header is clicked
        const fetchData = async () => {
            try {
                
                // Make an Axios GET request to your API endpoint
                const response = await axios.get(api.getAllChat, {
                    headers: {
                        Authorization: `Bearer ${user.jwt}`,
                    },
                });
                console.log('vào đây')

                // Set the fetched data to the state
                console.log(response.data);
                setStaffs(response.data.listUser);
            } catch (error) {

                if (error.request) {
                    // Request made but no response is received from the server.
                    console.log(error.request);
                }
            }
        };
        fetchData();
    }, [])

    const handleHeaderClick = () => {
        // Toggle the state when the header is clicked
        console.log(user.jwt)
        const fetchData = async () => {
            try {
                // Make an Axios GET request to your API endpoint
                console.log(isHeaderClicked)
                const response = await axios.get(api.getAllChat, {
                    headers: {
                        Authorization: `Bearer ${user.jwt}`,
                    },
                })//.catch((err) => console.log(err));
                console.log('vào đây')

                // Set the fetched data to the state
                 console.log(response.data);
                setStaffs(response.data.listUser);
            } catch (error) {

                if (error.response) {
                    // Request made but the server responded with an error
                    
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(user.jwt)
                    // Request made but no response is received from the server.
                    console.log(error.request);
                } else {
                    // Error occured while setting up the request
                    console.log('Error', error.message);
                }
            }
        };
        // Call the fetchData function when the component mounts
        fetchData();
        setHeaderClicked(!isHeaderClicked);
        console.log(isHeaderClicked)
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Trò Chuyện',
            headerStyle: {
                backgroundColor: '#4554DC'
            },
            headerTintColor: 'white',
            headerTitleAlign: 'left',
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 15 }} onPress={handleHeaderClick}>
                    <AntDesign size={20} name='reload1' color={'white'} />
                </TouchableOpacity>
            ),
        });
    }, [navigation, isHeaderClicked]);


    const renderContactItem = ({ item }) => (
        <TouchableOpacity onPress={() =>  navigation.navigate('ChatDetail', { chatUser: item }) }>
            <View style={{ height: 70, padding: 10, borderBottomWidth: 3, borderBottomColor: '#279CD2' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{item.name} - [{item.role}]</Text>
                {/* <Text style={{fontWeight:'bold', fontSize: 20}}>{item.name}</Text> */}
            </View>
        </TouchableOpacity>
    );

    return (
        <View>
            <FlatList
                data={staffs}
                keyExtractor={(item) => item.id}
                renderItem={renderContactItem}
            />
        </View>
    );
};