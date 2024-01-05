import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, FlatList } from 'react-native';
import { api } from '../../../constants/api';
import axios from 'axios';
import { useUser } from '../../../models/userContext';
import AntDesign from 'react-native-vector-icons/AntDesign';

const StaffButton = ({ navigation, staff, isNavigate = false }) => {
    const handleButtonPress = () => {
        navigation.navigate('DetailStaff', { staff: staff });
        // Handle button press
        // if (isNavigate) {
        //     navigation.navigate('DetailStaff', { bill: bill });
        // }
    }

    return (
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
            <Text style={styles.textButton}>ID: {staff.id}</Text>
            <Text style={styles.textButton}>Tên: {staff.name}</Text>
        </TouchableOpacity>
    );
}

export default function StaffScreen({ navigation }) {
    const { user } = useUser();
    
    //Tạo state để lưu trữ trạng thái của header
    const [isHeaderClicked, setHeaderClicked] = useState(false);

    //Tạo state để lưu trữ dữ liệu lấy về từ database
    const [staff, setStaff] = useState(false);


     //Hàm xử lý khi header được click
     const handleHeaderClick = () => {
        //Thay đổi trạng thái của header khi được click
        const fetchData = async () => {
            try {
                // Gọi API để lấy dữ liệu từ database
                const response = await axios.get(api.getStaffs, {
                    headers: {
                        Authorization: `Bearer ${user.jwt}`,
                    },
                });
                //console.log("data res: ", response)
                //Lưu dữ liệu lấy được vào state
                setStaff(response.data.staff);
        
                //In ra màn hình console từng item lấy được để kiểm tra
                console.log('-------- Refresh Staff ----------')
                response.data.staff.map((item) => {
                    console.log(item);
                });
                console.log('---------------------------')
            } catch (error) {
                // Xử lý và báo lỗi
                if (error.request) {
                console.log(error.request);
                }
            }
        };
    
        // Gọi hàm fetchData khi header được click
        fetchData();
        setHeaderClicked(!isHeaderClicked);
    };

    //const staff = [
    //     {id: '101123A', name: 'Việt', price: 7000, payment: "Tiền mặt"},
    //     {id: '101125A', name: 'Nam', price: 7000, payment: "Tiền mặt"},
    //     {id: '101126A', name: 'Chủ', price: 7000, payment: "Tiền mặt"},
    //     {id: '101127A', name: 'Nghĩa', price: 7000, payment: "Tiền mặt"},
    //    // Add more items as needed
    //  ];
   
     const renderItem = ({ item }) => {
       return <StaffButton navigation={navigation} staff={item} />;
     };
   
     //Hàm xử lý khi nút thêm nhan vien được click
    const handleAddStaffButtonPress = () => {
        navigation.navigate('AddStaff');
    }

    //Sử dụng useLayoutEffect để tạo header
    React.useLayoutEffect(() => {
        //Tạo header
        navigation.setOptions({
        title: 'Nhan vien',
        headerStyle: { 
            backgroundColor: '#4554DC' 
        },
        headerTintColor: 'white',
        headerTitleAlign: 'left', 
        //Tạo nút để reload dữ liệu từ database khi được click
        headerRight: () => (
            <TouchableOpacity style={{ marginRight: 15 }} onPress={handleHeaderClick}>
            <AntDesign size={20} name='reload1' color={'white'} />
            </TouchableOpacity>
        ),
        });
    }, [navigation, isHeaderClicked]);

     //sử dụng useEffect để lấy dữ liệu từ database
     useEffect(() => {
        //Khởi tạo hàm fetchData để lấy dữ liệu từ database
        const fetchData = async () => {
            try { 
                //dùng axios để lấy dữ liệu từ database
                const response = await axios.get(api.getStaffs, {
                    //headers để xác thực người dùng
                    headers: {
                        Authorization: `Bearer ${user.jwt}`,
                    },
                });
                
                console.log("data res: ", response)

                //Lưu dữ liệu lấy được vào state
                setStaff(response.data.staff);
    
                //In ra màn hình console từng item lấy được để kiểm tra
                console.log('-------- Staff ----------')
                response.data.staff.map((item) => {
                    console.log(item);
                });
                console.log('---------------------------')
    
            } catch (error) {
                // Xử lý và báo lỗi
                if (error.response) {
                    // Request được gửi đi và server trả về response với status code không phải 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    } else if (error.request) {
                    // Request được gửi đi nhưng không nhận được response nào
                    console.log(error.request);
                    } else {
                        // Có lỗi xảy ra khi setup request
                        console.log('Error', error.message);
                    }
                }
            };
            
            //Hai dòng dưới đây là để StorageScreen tự động gọi hàm fetchData khi component được render (từ màn hình khác quay về màn hình này)
            const unsubscribe = navigation.addListener('focus', fetchData);
            return unsubscribe;
    }, [navigation]);


     return (
       <View style={styles.container}  >
         <FlatList
           data={staff}
           keyExtractor={(item) => item.id}
           renderItem={renderItem}
         />
         <TouchableOpacity style={styles.floatingButton} onPress = {handleAddStaffButtonPress}>
                <Text style={styles.floatingButtonIcon}>+</Text>
            </TouchableOpacity>
       </View>
     );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 15,
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#4554DC',
        marginVertical: 5,
        padding: 15,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'left',
        height: 90,
        width: 380,
    },
    textButton: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'left',
        marginVertical: 3, // Add spacing between text components
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#4554DC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingButtonIcon: {
        fontSize: 35,
        color: 'white',
    },
});