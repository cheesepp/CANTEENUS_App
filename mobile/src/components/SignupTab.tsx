import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState} from 'react'
import { Picker } from '@react-native-picker/picker'

//file RegisterTab.tsx
//File này chứa giao diện tab Đăng ký


export default function RegisterTab() {
    //khai báo các state để lưu thông tin người dùng nhập vào
    //state là một biến đặc biệt, khi giá trị của nó thay đổi thì giao diện sẽ tự động render lại
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loginType, setLoginType] = useState('Khách Hàng') //Loại đăng nhập: ['Sinh viên', 'Giảng viên'

    

    //Hàm xử lý khi người dùng nhấn nút Chọn Ảnh
    //Hiện tại chưa có xử lý gì cả, chỉ in ra màn hình console thông tin
    const handleChooseImage = () => {
        console.log('-----------CHOOSE IMAGE-----------');
        console.log('Name: ' + name);
        console.log('Email: ' + email);
        console.log('Password: ' + password);
        console.log('Confirm Password: ' + confirmPassword);
    }

    //Hàm xử lý khi người dùng nhấn nút Đăng Ký
    //Hiện tại chưa có xử lý gì cả, chỉ in ra màn hình console thông tin đăng ký
    const handleRegister = () => {
        console.log('-----------REGISTER-----------');
        console.log('Type: ' + loginType);
        console.log('Email: ' + email);
        console.log('Name: ' + name);
        console.log('Phone: ' + phone);
        console.log('Password: ' + password);
        console.log('Confirm Password: ' + confirmPassword);
    }

    return ( 
        <View style = {styles.signupContainer}>
            <View style={{flex:10, width:260,height:500, marginTop:10}}>

                <View style={{marginBottom:10, borderBottomColor:'#000', borderBottomWidth:1}}>
                    <Image style= {styles.img}source={require('../assets/Images/User_cicrle_duotone.png')}/>

                    <TouchableOpacity style={[styles.button, {height:20,width:80, marginBottom:10}]} onPress={handleChooseImage}>
                        <Text style = {[styles.text,{fontSize:10,fontWeight:'bold'}]}>Chọn Ảnh</Text>
                    </TouchableOpacity>
                </View>
               

                <ScrollView  contentContainerStyle={[styles.scrowView, {height:550}]}>

                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style = {[styles.text,styles.txtLabel,{marginTop:16}]}>Đối Tượng:</Text>
                        <Picker
                            selectedValue={loginType}
                            style={[styles.picker, {textAlign:'right'}]}
                            onValueChange={(itemValue, itemIndex) => setLoginType(itemValue)}
                        >
                            <Picker.Item label="Khách Hàng" value="Khách Hàng" />
                            <Picker.Item label="Quản Lý" value="Quản Lý" />
                        </Picker>
                    </View>

                    <View style = {{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style = {[styles.text,styles.txtLabel,{marginTop:16,textAlign:'left'}]}>Mail:</Text>
                        <View style={[styles.inputContainer]}>
                            <TextInput
                                style={[styles.txtInput,{width:150}]}
                                onChangeText={(email) => setEmail(email)}
                            />
                        </View>
                    </View>
            
                    <View style = {{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style = {[styles.text,styles.txtLabel,{marginTop:16,textAlign:'left'}]}>Họ tên:</Text>
                        <View style={[styles.inputContainer]}>
                            <TextInput
                                style={[styles.txtInput,{width:150}]}
                                onChangeText={(name) => setName(name)}
                            />
                        </View>
                    </View>

                    <View style = {{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style = {[styles.text,styles.txtLabel,{marginTop:16,textAlign:'left'}]}>SĐT:</Text>
                        <View style={[styles.inputContainer]}>
                            <TextInput
                                style={[styles.txtInput,{width:150}]}
                                onChangeText={(phone) => setPhone(phone)}
                            />
                        </View>
                    </View>

                    <View style = {{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style = {[styles.text,styles.txtLabel,{marginTop:16,textAlign:'left'}]}>Mật khẩu:</Text>
                        <View style={[styles.inputContainer]}>
                            <TextInput
                                style={[styles.txtInput,{width:150}]}
                                onChangeText={(password) => setPassword(password)}
                            />
                        </View>
                    </View>

                    <View style = {{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style = {[styles.text,styles.txtLabel,{marginTop:16,textAlign:'left'}]}>Xác nhận MK:</Text>
                        <View style={[styles.inputContainer]}>
                            <TextInput
                                style={[styles.txtInput,{width:150}]}
                                onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                            />
                        </View>
                    </View>

                </ScrollView>
            </View>

            <View style={{flex:1, alignContent:'flex-end'}}>
                    <TouchableOpacity style = {[styles.button]} onPress={handleRegister} >
                        <Text style = {[styles.text,{fontSize:18,fontWeight:'bold'}]}>Đăng ký</Text>
                    </TouchableOpacity>
            </View>
        </View>   
    )
}

const styles = StyleSheet.create({
    signupContainer:{
        backgroundColor:'white',
        borderRadius: 25,
        height: 580,
        width: 285,
        alignItems:'center',
        alignSelf: 'center',
    },
    button:{
        backgroundColor: '#279CD2',
        fontFamily: 'Montserrat',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 36,
        width: 170,
        alignSelf: 'center',
    },
    text:{
        color: '#F4F5FB',
        fontFamily: 'Montserrat',
    },
    img:{
        height:150,
        width:150, 
        alignSelf:'center'
    },
    picker:{ 
        height:10,
        width: 170,
        fontSize:20,
    },
    txtLabel:{
        color: '#747474',
        fontSize: 15,
        fontWeight: 'bold',
    },
    inputContainer:{
        alignItems: 'center',
        borderBottomColor: '#747474',
        borderBottomWidth: 1,
    },
    txtInput:{
        color:'#747474',
        fontSize:15,
    },
    scrowView:{
        height:'100%',
        showVerticalScrollIndicator: true,
    }
})