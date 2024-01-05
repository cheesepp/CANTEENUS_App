import { StyleSheet, Text, View, TouchableOpacity,Image, TextInput} from 'react-native'
import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { useUser } from '../../../../models/userContext'
import { api } from '../../../../constants/api'

import * as ImagePicker from 'react-native-image-picker';
//Hằng số lưu đường dẫn ảnh mặc định cho nhân viên
const defaultImage = require('../../../../assets/Images/Default_item.png')

//Hàm chuyển chuỗi có định dạng 'dd-MM-yyyy' sang 'yyyy-MM-dd'
//Vì API chỉ nhận định dạng 'yyyy-MM-dd', nhưng khi nhập vào thì người dùng nhập theo định dạng 'dd-MM-yyyy' nên cần chuyển đổi
const convertDate = (inputDate) => {
    const date = inputDate.split('-');
    const newDate = date[2] + '-' + date[1] + '-' + date[0];
    return newDate;
}

export default function AddStaffScreen({navigation}) {
    navigation.setOptions({
        title: 'Thêm Nhân Viên',
        headerStyle: { 
        backgroundColor: '#4554DC' 
        },
        headerTintColor: 'white',
        headerTitleAlign: 'left', 
    });

    //Lấy thông tin người dùng từ context
    const { user } = useUser();

    //state để lưu thông tin ảnh nhân viên
    const [image, setImage] = useState(defaultImage);
    const [imageType, setImageType] = useState(null);
    const [imageName, setImageName] = useState(null);

    //state để lưu thông tin tên nhân viên
    const [name, setName] = useState(null);

    //state để lưu thông tin password nhân viên
    const [password, setPassword] = useState(null);

    //state để lưu thông tin email nhân viên
    const [email, setEmail] = useState(null);

    //state để lưu thông tin số điện thoại nhân viên
    const [telephone, setTelephone] = useState(0);
   

    //Hàm xử lý chọn ảnh
    const handleChooseImage = () => {
        //Hiện chưa xử lý gì, chỉ in ra console là đã chọn ảnh
        console.log('choose image')
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
                console.log("Image uri2: ",ingredient.image)
                console.log('response', JSON.stringify(response));
              }
            }
          );
    };
    
    //Hàm xử lý thêm nhân viên
    const handleAddStaff = async () => {
        console.log("add staff to server")
        //data chứa thông tin nhân viên muốn thêm
        const data = {
        name: name,
        password: password,
       email: email, 
       phone: telephone,
       role:"staff"
        };
        try {
        const response = await axios.post(api.addStaff, data, {
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
        navigation.navigate("Nhân Viên");
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
                    Tên: 
                </Text>
                <TextInput
                    style={[{borderBottomColor: '#747474',borderBottomWidth: 0.5,flex:1,fontSize:18,marginRight:10},styles.textInputStyle]}
                    onChangeText={text => setName(text)}
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
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={[styles.textStyle,{}]}>
                    SĐT: 
                </Text>
                <TextInput
                    style={[{borderBottomColor: '#747474',borderBottomWidth: 0.5,flex:1,fontSize:18,marginRight:10},styles.textInputStyle]}
                    onChangeText={text => setTelephone(text)}
                />
            </View>


            <TouchableOpacity style={[styles.buttonStyle,{width:100,height:40, marginBottom:10}]} onPress={handleAddStaff} >
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