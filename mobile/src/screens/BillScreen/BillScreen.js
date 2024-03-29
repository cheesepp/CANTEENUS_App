import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, FlatList } from 'react-native';
import BillButton from './BillButton'
import styles from './styles';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useUser } from '../../models/userContext';
import { api } from '../../constants/api';

export default function BillScreen({ navigation }) {

  const { user } = useUser()

  const [bills, setBills] = useState(null);

  const [isHeaderClicked, setHeaderClicked] = useState(false);

  const handleHeaderClick = () => {
    // Toggle the state when the header is clicked
    const fetchData = async () => {
      try {
        // Make an Axios GET request to your API endpoint
        const response = await axios.get(api.getBills, {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        });
        
        // Set the fetched data to the state
        console.log(response.data.bills[0].item[0]);
        setBills(response.data.bills);
      } catch (error) {

        if (error.request) {
          // Request made but no response is received from the server.
          console.log(error.request);
        }
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
    setHeaderClicked(!isHeaderClicked);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Hóa Đơn',
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

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try { 
        // Make an Axios GET request to your API endpoint
        const response = await axios.get(api.getBills, {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        });
        
        // Set the fetched data to the state
        setBills(response.data.bills);
        console.log(response.data);
        console.log(response.data.bills.item);
      } catch (error) {
        if (error.response) {
          // Request made but the server responded with an error
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
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
  }, []); // The empty dependency array ensures that the effect runs only once


  const renderItem = ({ item }) => {
    return <BillButton navigation={navigation} bill={item} isNavigate={true} />;
  };

  return (
    <View style={styles.container}  >
      <FlatList
        data={bills}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

