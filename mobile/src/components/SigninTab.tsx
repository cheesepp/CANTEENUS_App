import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image} from 'react-native'
import React, {useState} from 'react'
import { Picker } from '@react-native-picker/picker'

//File LoginTab.tsx
//File này chứa giao diện tab Đăng nhập
//Gồm 2 TextInput: Email và Password

export default function LoginTab() {
    //khai báo các state để lưu thông tin người dùng nhập vào
    //state là một biến đặc biệt, khi giá trị của nó thay đổi thì giao diện sẽ tự động render lại
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginType, setLoginType] = useState('Khách Hàng') //Loại đăng nhập: ['Sinh viên', 'Giảng viên'

    

    //Hàm xử lý khi người dùng nhấn nút Đăng Nhập
    //Hiện tại chưa có xử lý gì cả, chỉ in ra màn hình console thông tin đăng nhập
    const handleLogin = () => {
        console.log('-----------LOGIN-----------');
        console.log('Login Type: ' + loginType);
        console.log('Email: ' + email);
        console.log('Password: ' + password);
        console.log('---------------------------');
    }

    //Hàm xử lý khi người dùng nhấn nút Quên mật khẩu
    //Hiện tại chưa có xử lý gì cả, chỉ in ra màn hình console thông tin
    const handleForgotPassword = () => {
        console.log('-----------FORGOT PASSWORD-----------');
        console.log('Email: ' + email);
        console.log('---------------------------');
    }

    return (
        <View style = {styles.signinContainer} >

            <View style={{flex:5, width:'80%',height:300}}>
                
                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop: 5}}>
                    <Text style = {[styles.text,styles.txtType,{marginTop:12}]}>Đối Tượng:</Text>
                   
                    <Picker
                        selectedValue={loginType}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => setLoginType(itemValue)}
                    >
                        <Picker.Item label="Khách Hàng" value="Khách Hàng" />
                        <Picker.Item label="Nhân Viên" value="Nhân Viên" />
                        <Picker.Item label="Quản Lý" value="Quản Lý" />
                    </Picker>
                </View>

                <View style = {styles.inputContainer}>
                    <Image source={require('../assets/Images/User_Menu_Male.png')}/>
                    <TextInput
                        style={styles.txtInput}
                        placeholder="Email"
                        onChangeText={(text) => setEmail(text)
                        }
                    />
                </View>
            
                <View style = {styles.inputContainer}>
                    <Image source={require('../assets/Images/Lock.png')}/>
                    <TextInput
                        style={[styles.txtInput,{marginLeft:10}]}
                        placeholder="Mật khẩu"
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>

                <View style={styles.forgetPasswordContainer}>
                    <TouchableOpacity onPress={handleForgotPassword}>
                        <Text style={[styles.text,styles.txtForgetPassword]}>Quên mật khẩu</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
           
           
            <View style={{flex:1, alignItems: 'flex-end'}}>
                <TouchableOpacity style = {[styles.button]} onPress={handleLogin}>
                    <Text style = {[styles.text,{fontSize:18,fontWeight:'bold'}]}>Đăng Nhập</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    signinContainer:{
        backgroundColor:'white',
        borderRadius: 25,
        height: 300,
        width: '90%',
        alignItems:'center',
        alignSelf: 'center',
    },

    text:{
        color: '#F4F5FB',
        fontFamily: 'Montserrat',
    },
    txtType:{
        color: '#747474',
        fontSize: 20,
        fontWeight: 'bold',
    },
    picker:{ 
        width: 170,
        fontSize:20,
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
    inputContainer:{
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        textDecorationLine: 'underline line-through',
        borderBottomColor: '#747474',
        borderBottomWidth: 0.5,
    },
    txtInput:{
        color:'#747474',
        fontSize:15,
    },
    txtForgetPassword:{
        marginTop:10,
        color:'#242BD0',
        fontSize: 18,
        textDecorationLine: 'underline',
        fontWeight:'bold',
    },
    forgetPasswordContainer:{
        alignItems:'flex-end',
    }
})