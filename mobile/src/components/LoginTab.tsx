import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, {useState} from 'react'

export default function LoginTab() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //Hàm xử lý khi người dùng nhấn nút Login
    //Hiện tại chưa có xử lý gì cả, chỉ in ra màn hình console thông tin đăng nhập
    const handleLogin = () => {
        console.log('-----------LOGIN-----------');
        console.log('Email: ' + email);
        console.log('Password: ' + password);
        console.log('---------------------------');
    }

    return (
        <View>
            <TextInput
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
            />
            <Button title="Đăng Nhập" onPress={handleLogin} />
        </View>
    )
}

const styles = StyleSheet.create({

})