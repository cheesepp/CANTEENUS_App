import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import IngredientItem from './IngredientItem';
import axios from 'axios';
import { useUser } from '../../../models/userContext';
import { api } from '../../../constants/api';


export default function StorageScreen({ navigation }) {
    //Biến user để lấy dữ liệu người dùng đã đăng nhập (trong đó có jwt để xác thực quyền sử dụng API)
    const { user } = useUser();

    //Tạo state để lưu trữ dữ liệu lấy về từ database
    const [ingredientItems, setIngredientItems] = useState(null);

    //sử dụng useEffect để lấy dữ liệu từ database
    useEffect(() => {
        //Khởi tạo hàm fetchData để lấy dữ liệu từ database
        const fetchData = async () => {
            try { 
                //dùng axios để lấy dữ liệu từ database
                const response = await axios.get(api.getIngredients, {
                    //headers để xác thực người dùng
                    headers: {
                        Authorization: `Bearer ${user.jwt}`,
                    },
                });
                
                //Lưu dữ liệu lấy được vào state
                setIngredientItems(response.data.ingredients);
    
                //In ra màn hình console từng item lấy được để kiểm tra
                console.log('-------- Ingredients ----------')
                response.data.ingredients.map((item) => {
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

    //Hàm renderItem để hiển thị từng item trong danh sách nguyên liệu
    const renderItem = ({ item }) => {
        return <IngredientItem ingredient={item} />;
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:10 }}>
           <FlatList
                data={ingredientItems}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={3}
            />
        </View>
    );
}