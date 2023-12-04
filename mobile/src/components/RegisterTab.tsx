import { StyleSheet, Text, View, TextInput,Button, Image } from 'react-native'
import React, {useState} from 'react'

export default function RegisterTab() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    //Hàm xử lý khi người dùng nhấn nút Register
    //Hiện tại chưa có xử lý gì cả, chỉ in ra màn hình console thông tin đăng ký
    const handleRegister = () => {
        console.log('-----------REGISTER-----------');
        console.log('Name: ' + name);
        console.log('Email: ' + email);
        console.log('Password: ' + password);
        console.log('Confirm Password: ' + confirmPassword);
    }

    return (
        <View>
            <Image source={require('../assets/Images/User_cicrle_duotone.png')}/>
        <TextInput
            placeholder="Tên"
            onChangeText={(text) => setName(text)}
        />
        <TextInput
            placeholder="Mail"
            onChangeText={(text) => setEmail(text)}
        />
        <TextInput
            placeholder="Mật khẩu"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
        />
        <TextInput
            placeholder="Nhập lại mật khẩu"
            secureTextEntry
            onChangeText={(text) => setConfirmPassword(text)}
        />
        <Button title='Đăng Ký' onPress={handleRegister} />
        </View>
    )
}

const styles = StyleSheet.create({})