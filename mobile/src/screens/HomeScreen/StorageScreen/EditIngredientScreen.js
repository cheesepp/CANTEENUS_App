import { StyleSheet, Text, View, TouchableOpacity,Image, TextInput, Button} from 'react-native'
import React,{useState, useEffect} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import { useUser } from '../../../models/userContext';
import { api } from '../../../constants/api';

//Hằng số lưu đường dẫn ảnh mặc định cho nguyên liệu
const defaultImage = require('../../../assets/Images/Default_item.png')

//viết hàm formar lại chuỗi có dạng 2024-12-11T11:07:13.000Z thành 11/12/2024
const formatDate = (input) => {
    if(input != null){
        var date = input.split('T')[0];
        var year = date.split('-')[0];
        var month = date.split('-')[1];
        var day = date.split('-')[2];
        return day+'-'+month+'-'+year;
    }
    return null;
}

//Hàm chuyển chuỗi có định dạng 'dd-MM-yyyy' sang 'yyyy-MM-dd'
//Vì API chỉ nhận định dạng 'yyyy-MM-dd', nhưng khi nhập vào thì người dùng nhập theo định dạng 'dd-MM-yyyy' nên cần chuyển đổi
const convertDate = (inputDate) => {
    const date = inputDate.split('-');
    const newDate = date[2] + '-' + date[1] + '-' + date[0];
    return newDate;
}

export default function EditIngredientScreen({ navigation, route }) {
    //Sử dụng useLayoutEffect để tạo header
    navigation.setOptions({
        title: 'Sửa Nguyên Liệu',
        headerStyle: { 
          backgroundColor: '#4554DC' 
        },
        headerTintColor: 'white',
        headerTitleAlign: 'left', 
    });

    //Lấy dữ liệu nguyên liệu từ route
    const { ingredient } = route.params;

    //Lấy thông tin người dùng từ context
    const { user } = useUser();

    //state để lưu thông tin ảnh nguyên liệu
    const [image, setImage] = useState(ingredient.image);
    const [imageType, setImageType] = useState(null);
    const [imageName, setImageName] = useState(null);
    //state để lưu thông tin tên nguyên liệu
    const [name, setName] = useState(ingredient.name);

    //state để lưu thông tin calories nguyên liệu
    const [calories, setCalories] = useState(ingredient.calories.toString());

    //state để lưu thông tin đơn vị tính nguyên liệu
    const [unit, setUnit] = useState(ingredient.unit);

    //state để lưu thông tin số lượng nguyên liệu
    const [quantity, setQuantity] = useState(ingredient.quantity.toString());

    //state để lưu thông tin giá nguyên liệu
    const [price, setPrice] = useState(ingredient.price.toString());

    //state để lưu thông tin ngày hết hạn nguyên liệu
    const [expirationDate, setExpirationDate] = useState(ingredient.expirationDate);

    //Hàm xử lý chọn ảnh
    const handleChooseImage = () => {
        //Hiện chưa xử lý gì, chỉ in ra console là đã chọn ảnh
        console.log('choose image: ',)
        ImagePicker.launchImageLibrary(
            {
              title: 'Choose Image',
              mediaType: 'photo',
              quality: 1,
            },
            (response) => {
              if (!response.didCancel && !response.error) {
                const assets = response.assets
                console.log("first assets:",assets[0])
                setImage(assets[0].uri);
                setImageType(assets[0].type)
                setImageName(ingredient.id)
                console.log("Image uri1: ",image)
               // console.log("Image uri2: ",ingredient.image)
                console.log('response', JSON.stringify(response));
        // this.setState({
        //   filePath: response,
        //   fileData: response.data,
        //   fileUri: response.uri
        // });
              }
            }
          );
    };

    //ham upload anh
    const handleEditIngredient2 = async () => {
        try {
            const formData = new FormData();
            formData.append('file', {
                uri: image,
                name: imageName, // The name key should match the field name expected by the server
                type: imageType, // Adjust the file type according to your requirements                });
            })
        
            const data = {
                calories: calories,
                name: name,
                unit: unit,
                quantity: quantity,
                price: price,
                expirationDate: expirationDate,
                //image: image,
            };
            formData.append('data',JSON.stringify(data));

           
            const response = await axios.put(api.editIngredient + '/' + ingredient.id, formData, {
                //headers để xác thực người dùng
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.jwt}`,
                },
            });
                
            console.log(response.data);

            //Chuyển về màn hình StorageScreen
            navigation.navigate('Kho');
        
          // Handle the response from the server
        } catch (error) {
            console.error("Error sending data: ", error);
        }
      };

    //Hàm xử lý sửa nguyên liệu
    const handleEditIngredient = async () => {
        //console.log(expirationDate)
        //data chứa thông tin nguyên liệu cần sửa
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
            const response = await axios.put(api.editIngredient + '/' + ingredient.id, data, {
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
            {(image==''?<Image source={defaultImage} style={styles.imageStyle}/>:<Image source={{uri:image}} style={styles.imageStyle}/>)}
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
                    placeholder={ingredient.name}
                    onChangeText={text => setName(text)}
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={[styles.textStyle,{}]}>
                    Calories:
                </Text>
                <TextInput
                    style={[{borderBottomColor: '#747474',borderBottomWidth: 0.5,flex:1,fontSize:18,marginRight:10},styles.textInputStyle]}
                    placeholder={ingredient.calories.toString()}
                    onChangeText={text => setCalories(text)}
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={[styles.textStyle,{}]}>
                    Đơn vị tính: 
                </Text>
                <TextInput
                    style={[{borderBottomColor: '#747474',borderBottomWidth: 0.5,flex:1,fontSize:18,marginRight:10},styles.textInputStyle]}
                    placeholder={ingredient.unit}
                    onChangeText={text => setUnit(text)}
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={[styles.textStyle,{}]}>
                    Số lượng: 
                </Text>
                <TextInput
                    style={[{borderBottomColor: '#747474',borderBottomWidth: 0.5,flex:1,fontSize:18,marginRight:10},styles.textInputStyle]}
                    placeholder={ingredient.quantity.toString()}
                    onChangeText={text => setQuantity(text)}
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={[styles.textStyle,{}]}>
                    Giá tiền đầu vào (đ): 
                </Text>
                <TextInput
                    style={[{borderBottomColor: '#747474',borderBottomWidth: 0.5,flex:1,fontSize:18,marginRight:10},styles.textInputStyle]}
                    placeholder={ingredient.price.toString()}
                    onChangeText={text => setPrice(text)}
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={[styles.textStyle,{}]}>
                    Ngày hết hạn: 
                </Text>
                <TextInput
                    style={[{borderBottomColor: '#747474',borderBottomWidth: 0.5,flex:1,fontSize:18,marginRight:10},styles.textInputStyle]}
                    placeholder={formatDate(ingredient.expirationdate)}
                    onChangeText={text => setExpirationDate(convertDate(text))}
                />
            </View>

            <TouchableOpacity style={[styles.buttonStyle,{width:100,height:40, marginBottom:10}]} onPress={handleEditIngredient2} >
                    <Text style={styles.buttonTextStyle}>
                        Sửa
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