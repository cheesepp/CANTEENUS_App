import React, { useState, useEffect } from 'react';
import { View} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import FoodItem from './FoodItem';
import axios from 'axios';

//Token để xác thực người dùng
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkFEMDJkNTgyMTAtOWYyNC0xMWVlLWE2MjQtM2Q5ZTE4ODk5YWViIiwiaWF0IjoxNzAzMDY4NzY0fQ.fW8qjDBOnpotl8SrBDCxEImAeni6HKNAR2zQ1OxQpY4';

//API để lấy dữ liệu từ database
const api ='http://10.0.2.2:8080/test/get-item'

export default function MenuScreen({ navigation }) {

    //Tạo state để lưu trữ dữ liệu lấy về từ database
    const [foodItems, setFoodItems] = useState(null);

    //sử dụng useEffect để lấy dữ liệu từ database
    useEffect(() => {
        //Khởi tạo hàm fetchData để lấy dữ liệu từ database
        const fetchData = async () => {
            try { 
                //dùng axios để lấy dữ liệu từ database
                const response = await axios.get(api, {
                    //headers để xác thực người dùng
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
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
                keyExtractor={item => item.name}
                numColumns={3}
            />
        </View>
    );
}