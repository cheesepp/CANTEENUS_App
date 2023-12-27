import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import ObjectiveItem from './ObjectiveItem';
import axios from 'axios';
import { useUser } from '../../../models/userContext';
import { api } from '../../../constants/api';


export default function ObjectiveScreen({ navigation }) {
    //Biến user để lấy dữ liệu người dùng đã đăng nhập (trong đó có jwt để xác thực quyền sử dụng API)
    const { user } = useUser();

    //Tạo state để lưu trữ dữ liệu lấy về từ database
    const [objectItems, setObjectItems] = useState(null);
    
    //sử dụng useEffect để lấy dữ liệu từ database
    useEffect(() => {
    //Khởi tạo hàm fetchData để lấy dữ liệu từ database
    const fetchData = async () => {
        try { 
            //dùng axios để lấy dữ liệu từ database
            const response = await axios.get(api.getTargets, {
                //headers để xác thực người dùng
                headers: {
                    Authorization: `Bearer ${user.jwt}`,
                },
            });
            
            //Lưu dữ liệu lấy được vào state
            setObjectItems(response.data.targets);

            //In ra màn hình console từng item lấy được để kiểm tra
            console.log('-------- Targets ----------')
            response.data.targets.map((item) => {
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
        return <ObjectiveItem objective={item} />;
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:10}}>
            {/* Sử dụng flatlist để hiển thị dữ liệu lên màn hình */}
            <FlatList
                //data là dữ liệu lấy từ state
                data={objectItems}
                //gọi hàm renderItem để hiển thị dữ liệu theo từng item custom trong Flatlist
                renderItem={renderItem}
                //keyExtractor để xác định key cho từng item trong Flatlist
                keyExtractor={item => item.id}    
            />
        </View>
    );
}