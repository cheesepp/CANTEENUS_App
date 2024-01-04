import * as React from 'react';
import {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, FlatList} from 'react-native';
import StaffButton from './StaffButton';
import axios from 'axios';
import {useUser} from '../../../models/userContext';
import {api} from '../../../constants/api';
import AntDesign from 'react-native-vector-icons/AntDesign';

// const StaffButton = ({navigation, staff, isNavigate = false}) => {
//   const handleButtonPress = () => {
//     // Handle button press
//     if (isNavigate) {
//       navigation.navigate('Detail', {bill: bill});
//     }
//   };

//   return (
//     <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
//       <Text style={styles.textButton}>ID: {staff.id}</Text>
//       <Text style={styles.textButton}>Tên: {staff.name}</Text>
//     </TouchableOpacity>
//   );
// };

export default function StaffScreen({navigation}) {
  //Biến user để lấy dữ liệu người dùng đã đăng nhập (trong đó có jwt để xác thực quyền sử dụng API)
  const {user} = useUser();

  //Tạo state để lưu trữ dữ liệu lấy về từ database
  const [staffs, setStaffs] = useState(null);

  //Tạo state để lưu trữ trạng thái của header
  const [isHeaderClicked, setHeaderClicked] = useState(false);

  // const staff = [
  //   {id: '101123A', name: 'Việt', price: 7000, payment: 'Tiền mặt'},
  //   {id: '101125A', name: 'Nam', price: 7000, payment: 'Tiền mặt'},
  //   {id: '101126A', name: 'Chủ', price: 7000, payment: 'Tiền mặt'},
  //   {id: '101127A', name: 'Nghĩa', price: 7000, payment: 'Tiền mặt'},
  //   // Add more items as needed
  // ];

  // Hàm xử lý khi header được click
  const handleHeaderClick = () => {};

  //Sử dụng useLayoutEffect để tạo header
  React.useLayoutEffect(() => {
    //Tạo header
    navigation.setOptions({
      title: 'Nhân viên',
      headerStyle: {
        backgroundColor: '#4554DC',
      },
      headerTintColor: 'white',
      headerTitleAlign: 'left',
      //Tạo nút thêm nhân viên
      headerRight: () => (
        <TouchableOpacity style={{marginRight: 15}} onPress={handleHeaderClick}>
          <AntDesign size={20} name="plus" color={'white'} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, isHeaderClicked]);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make an Axios GET request to your API endpoint
        const response = await axios.get(api.getStaffs, {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        });

        // Set the fetched data to the state
        setStaffs(response.data.staff);
        console.log(response.data);
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

  // Render item
  const renderItem = ({item}) => {
    return (
      <StaffButton navigation={navigation} staff={item} isNavigate={true} />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={staffs}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'center',
  },
});
