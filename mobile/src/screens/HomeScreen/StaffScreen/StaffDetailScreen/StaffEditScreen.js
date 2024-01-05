import { StyleSheet, Text, View, TouchableOpacity,Image, TextInput, Button} from 'react-native'
import React,{useState, useEffect} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import { useUser } from '../../../../models/userContext';
import { api } from '../../../../constants/api';

//Hằng số lưu đường dẫn ảnh mặc định cho nhân viên
const defaultImage = require('../../../../assets/Images/Default_item.png')

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

export default function EditStaffScreen({ navigation, route }) {
    //Sử dụng useLayoutEffect để tạo header
    navigation.setOptions({
        title: 'Sửa Nhân Viên',
        headerStyle: { 
          backgroundColor: '#4554DC' 
        },
        headerTintColor: 'white',
        headerTitleAlign: 'left', 
    });

    //Lấy dữ liệu nhân viên từ route
    const { staff } = route.params;

    //Lấy thông tin người dùng từ context
    const { user } = useUser();

    //state để lưu thông tin ảnh nhân viên
    const [image, setImage] = useState(staff.image);
    const [imageType, setImageType] = useState(null);
    const [imageName, setImageName] = useState(null);
    //state để lưu thông tin tên nhân viên
    const [name, setName] = useState(staff.name);
    
    //state để lưu thông tin password nhân viên
    const [password, setPassword] = useState(null);

    //state để lưu thông tin email nhân viên
    const [email, setEmail] = useState(staff.email);

    //state để lưu thông tin số điện thoại nhân viên
    const [telephone, setTelephone] = useState(staff.phone);

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
                //console.log("Image uri2: ",ingredient.image)
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
    const handleEditStaff2 = async () => {
        try {
            const formData = new FormData();
            formData.append('file', {
                uri: image,
                name: imageName, // The name key should match the field name expected by the server
                type: imageType, // Adjust the file type according to your requirements                });
            })
        
            const data = {
                
                name: name,
                phone: telephone,
                email: email,
                password: password,

            };
            formData.append('data',JSON.stringify(data));

           
            const response = await axios.put(api.editStaff + '/' + staff.id, formData, {
                //headers để xác thực người dùng
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.jwt}`,
                },
            });
                
            console.log(response.data);

            //Chuyển về màn hình StorageScreen
            navigation.navigate('Nhân Viên');
        
          // Handle the response from the server
        } catch (error) {
            console.error("Error sending data: ", error);
        }
      };

    //Hàm xử lý sửa nhân viên
    const handleEditStaff = async () => {
        //console.log(expirationDate)
        //data chứa thông tin nhân viên cần sửa
        const data = {
            name: name,
            phone: telephone,
            email: email,
            password: password,

        };
        try {
            const response = await axios.put(api.editStaff + '/' + staff.id, data, {
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
        navigation.navigate('Nhân Viên');
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
                    Tên: 
                </Text>
                <TextInput
                    style={[{borderBottomColor: '#747474',borderBottomWidth: 0.5,flex:1,fontSize:18,marginRight:10},styles.textInputStyle]}
                    onChangeText={text => setName(text)}
                    placeholder={staff.name}
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={[styles.textStyle,{}]}>
                    Mật khẩu:
                </Text>
                <TextInput
                    style={[{borderBottomColor: '#747474',borderBottomWidth: 0.5,flex:1,fontSize:18,marginRight:10},styles.textInputStyle]}
                    onChangeText={text => setPassword(text)}
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={[styles.textStyle,{}]}>
                    Email: 
                </Text>
                <TextInput
                    style={[{borderBottomColor: '#747474',borderBottomWidth: 0.5,flex:1,fontSize:18,marginRight:10},styles.textInputStyle]}
                    onChangeText={text => setEmail(text)}
                    placeholder={staff.email}
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={[styles.textStyle,{}]}>
                    SĐT: 
                </Text>
                <TextInput
                    style={[{borderBottomColor: '#747474',borderBottomWidth: 0.5,flex:1,fontSize:18,marginRight:10},styles.textInputStyle]}
                    onChangeText={text => setTelephone(text)}
                    placeholder={staff.phone}
                />
            </View>

            <TouchableOpacity style={[styles.buttonStyle,{width:100,height:40, marginBottom:10}]} onPress={handleEditStaff} >
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