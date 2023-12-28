import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, FlatList} from 'react-native';
import FoodItem from './FoodItem';
import axios from 'axios';
import { useUser } from '../../../models/userContext';
import { api } from '../../../constants/api';
import AntDesign from 'react-native-vector-icons/AntDesign';


export default function MenuScreen({ navigation }) {
    //Biến user để lấy dữ liệu người dùng đã đăng nhập (trong đó có jwt để xác thực quyền sử dụng API)
    const { user } = useUser();

    //Tạo state để lưu trữ dữ liệu lấy về từ database
    const [foodItems, setFoodItems] = useState(null);

    //Tạo state để lưu trữ trạng thái của header
    const [isHeaderClicked, setHeaderClicked] = useState(false);

    //Hàm xử lý khi header được click
    const handleHeaderClick = () => {
        //Thay đổi trạng thái của header khi được click
        const fetchData = async () => {
            try {
                // Gọi API để lấy dữ liệu từ database
                const response = await axios.get(api.getItems, {
                    headers: {
                        Authorization: `Bearer ${user.jwt}`,
                    },
                });
                //Lưu dữ liệu lấy được vào state
                setFoodItems(response.data.items);
                    
                //In ra màn hình console từng item lấy được để kiểm tra
                console.log('-------- Refresh Items ----------')
                response.data.items.map((item) => {
                    console.log(item);
                });
                console.log('---------------------------');

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

    //Sử dụng useLayoutEffect để tạo header
    React.useLayoutEffect(() => {
        //Tạo header
        navigation.setOptions({
            title: 'Menu',
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
                const response = await axios.get(api.getItems, {
                    //headers để xác thực người dùng
                    headers: {
                        Authorization: `Bearer ${user.jwt}`,
                    },
                });
                
                //Lưu dữ liệu lấy được vào state
                setFoodItems(response.data.items);
                
                //In ra màn hình console từng item lấy được để kiểm tra
                console.log('-------- Items ----------')
                response.data.items.map((item) => {
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
    
        //Gọi hàm fetchData để lấy dữ liệu từ database
        fetchData();
    }, []);

    //Hàm render item trong Flatlist để hiển thị dữ liệu lên màn hình
    const renderItem = ({ item }) => {
        return <FoodItem food={item} />;
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:10 }}>
           <FlatList
                data={foodItems}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={3}
            />
        </View>
    );
}