import { StyleSheet, Text, View, TouchableOpacity,Image, TextInput} from 'react-native'
import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { useUser } from '../../../models/userContext';
import { api } from '../../../constants/api';

//Hằng số lưu đường dẫn ảnh mặc định cho nguyên liệu
const defaultImage = require('../../../assets/Images/Default_item.png')

//Hàm chuyển chuỗi có định dạng 'dd-MM-yyyy' sang 'yyyy-MM-dd'
//Vì API chỉ nhận định dạng 'yyyy-MM-dd', nhưng khi nhập vào thì người dùng nhập theo định dạng 'dd-MM-yyyy' nên cần chuyển đổi
const convertDate = (inputDate) => {
    const date = inputDate.split('-');
    const newDate = date[2] + '-' + date[1] + '-' + date[0];
    return newDate;
}

export default function AddIngredientScreen({navigation}) {
    navigation.setOptions({
        title: 'Thêm Nguyên Liệu',
        headerStyle: { 
        backgroundColor: '#4554DC' 
        },
        headerTintColor: 'white',
        headerTitleAlign: 'left', 
    });

    //Lấy thông tin người dùng từ context
    const { user } = useUser();

    //state để lưu thông tin ảnh nguyên liệu
    const [image, setImage] = useState(defaultImage);

    //state để lưu thông tin tên nguyên liệu
    const [name, setName] = useState(null);

    //state để lưu thông tin calories nguyên liệu
    const [calories, setCalories] = useState(0);

    //state để lưu thông tin đơn vị tính nguyên liệu
    const [unit, setUnit] = useState(0);

    //state để lưu thông tin số lượng nguyên liệu
    const [quantity, setQuantity] = useState(null);

    //state để lưu thông tin giá nguyên liệu
    const [price, setPrice] = useState(null);

    //state để lưu thông tin ngày hết hạn nguyên liệu
    const [expirationDate, setExpirationDate] = useState(null);

    //Hàm xử lý chọn ảnh
    const handleChooseImage = () => {
        //Hiện chưa xử lý gì, chỉ in ra console là đã chọn ảnh
        console.log('choose image')
    };
    
    //Hàm xử lý thêm nguyên liệu
    const handleAddIngredient = async () => {
        console.log(expirationDate)
        //data chứa thông tin nguyên liệu muốn thêm
        const data = {
        calories: calories,
        name: name,
        unit: unit,
        quantity: quantity,
        price: price,
        expirationDate: expirationDate,
        //image: image,
        };
        try {
        const response = await axios.post(api.addIngredient, data, {
            //headers để xác thực người dùng
            headers: {
            Authorization: `Bearer ${user.jwt}`,
            },
        });
        console.log(response.data);
        } catch (error) {
        console.error("Error sending data: ", error);
        }

        //Chuyển về màn hình StorageScreen
        navigation.navigate('Kho');
    };
 
     
    //Render màn hình
    return (
        <View style={styles.mainContainer}>
            <Image source={image} style={styles.imageStyle}/>

            <TouchableOpacity style={[styles.buttonStyle,{width:100, marginBottom:10}]} onPress={handleChooseImage} >
                <Text style={styles.buttonTextStyle}>
                    Chọn ảnh
                </Text>
            </TouchableOpacity>

            <View style={styles.textContainer}>
                <Text style={[styles.textStyle,{}]}>
                    Tên nguyên liệu: 
                </Text>
                <TextInput
                    style={[{borderBottomColor: '#747474',borderBottomWidth: 0.5,flex:1,fontSize:18,marginRight:10},styles.textInputStyle]}
                    onChangeText={text => setName(text)}
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={[styles.textStyle,{}]}>
                    Calories:
                </Text>
                <TextInput
                    style={[{borderBottomColor: '#747474',borderBottomWidth: 0.5,flex:1,fontSize:18,marginRight:10},styles.textInputStyle]}
                    onChangeText={text => setCalories(text)}
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={[styles.textStyle,{}]}>
                    Đơn vị tính: 
                </Text>
                <TextInput
                    style={[{borderBottomColor: '#747474',borderBottomWidth: 0.5,flex:1,fontSize:18,marginRight:10},styles.textInputStyle]}
                    onChangeText={text => setUnit(text)}
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={[styles.textStyle,{}]}>
                    Số lượng: 
                </Text>
                <TextInput
                    style={[{borderBottomColor: '#747474',borderBottomWidth: 0.5,flex:1,fontSize:18,marginRight:10},styles.textInputStyle]}
                    onChangeText={text => setQuantity(text)}
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={[styles.textStyle,{}]}>
                    Giá tiền đầu vào (đ): 
                </Text>
                <TextInput
                    style={[{borderBottomColor: '#747474',borderBottomWidth: 0.5,flex:1,fontSize:18,marginRight:10},styles.textInputStyle]}
                    onChangeText={text => setPrice(text)}
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={[styles.textStyle,{}]}>
                    Ngày hết hạn: 
                </Text>
                <TextInput
                    style={[{borderBottomColor: '#747474',borderBottomWidth: 0.5,flex:1,fontSize:18,marginRight:10},styles.textInputStyle]}
                    placeholder={'dd-MM-yyyy'}
                    onChangeText={text => setExpirationDate(convertDate(text))}
                />
            </View>

            <TouchableOpacity style={[styles.buttonStyle,{width:100,height:40, marginBottom:10}]} onPress={handleAddIngredient} >
                    <Text style={styles.buttonTextStyle}>
                        Thêm
                    </Text>
            </TouchableOpacity>
        </View>
    )
 }
 
 const styles = StyleSheet.create({
    mainContainer:{
        width:'90%', height:'98%', marginTop:5, alignSelf:'center',backgroundColor:'white', borderRadius:15
    },
    imageStyle:{
        alignSelf:'center', width:'20%', height:'20%'
    },
    textContainer:{
        flexDirection:'row', marginLeft:15, marginBottom:5
    },
    textStyle:{
        color:'#747474',fontSize:18, fontFamily:'Montserrat',fontWeight:'bold', marginRight:5, marginTop:10
    },
    buttonContainer:{
        flex:1,flexDirection:'row', alignItems:'flex-end', justifyContent:'center'
    },
    buttonStyle:{
        backgroundColor:'#279CD2', borderRadius:20, width:70, height:30, alignSelf:'center'
    },
    buttonTextStyle:{
        fontSize:20, fontFamily:'Montserrat',color:'white',fontWeight:'bold', alignSelf:'center', justifyContent:'center', marginTop:3
    },
    textInputContainer:{
        borderBottomColor: '#747474',
        borderBottomWidth: 0.5,
    },
    textInputStyle:{
        color:'#747474',
        fontSize:15,
    }
 })