import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import ForgetPasswordModal from '../screens/LoginScreen/OTPAuthenticationModal'

// import user
import { UserModel } from '../models/user.m';
import { useUser } from '../models/userContext';
// Cho navigate về trang home
import { CommonActions, useNavigation } from '@react-navigation/native';

const SERVER_URL = 'http://10.0.2.2:8080' //Android dùng localhost thì phải dùng IP 10.0.2.2

//File LoginTab.tsx
//File này chứa giao diện tab Đăng nhập
//Gồm 2 TextInput: Email và Password
//File này có modal được viết ở trong thân code luôn, bấm "Quên mật khẩu" sẽ hiện modal, không thì nó sẽ ẩn. Nhưng cơ bản là nó vẫn ở đó

export default function LoginTab() {
    // Tạo navigation về trang chủ
    const navigation = useNavigation();

    //Cập nhật user
    const { updateUser } = useUser();




    //khai báo các state để lưu thông tin người dùng nhập vào
    //state là một biến đặc biệt, khi giá trị của nó thay đổi thì giao diện sẽ tự động render lại
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginType, setLoginType] = useState('Khách Hàng')

    //Khai báo state modalVisible để xác định modal có hiện hay không
    const [forgetPasswordModalVisible, setForgetPasswordModalVisible] = useState(false);

    // Biến OTP ko khai báo state toàn cục, vì nó chỉ được dùng trong modal, nên khai báo trong hàm openForgetPasswordModal

    // // State lỗi và message
    // const [isError, setIsError] = useState(false);
    // const [message, setMessage] = useState('');

    // const getMessage = () => {
    //     const status = isError ? `Error: ` : `Success: `;
    //     return status + message;
    // }

    const onLoggedIn = async (Token: string) => {
        console.log('Authenticating...');
        try {
            fetch(`${SERVER_URL}/auth/token`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Token}`,
                },
            })
                .then(async res => {
                    try {
                        const jsonRes = await res.json();
                        if (res.status === 200) {
                            console.log('Success in authenticating', jsonRes.message);
                        }
                    } catch (err) {
                        console.log(err);
                        throw err;
                    };
                })
                .catch(error => {
                    console.log(error);
                    // Handle the error here or use Alert.alert to display an error message
                    if (error instanceof Error) {
                        Alert.alert('Error', error.message);
                    } else {

                        Alert.alert('Error', 'An unknown error occurred.');
                    }
                });
        } catch (error) {
            console.log('Fetching error', error);
            throw error;
        }

    }


    //Hàm xử lý khi người dùng nhấn nút Đăng Nhập
    //Hiện tại chưa có xử lý gì cả, chỉ in ra màn hình console thông tin đăng nhập
    const handleLogin = async () => {
        const payload = {
            email,
            password,
        };
        console.log('Payload', JSON.stringify(payload));
        try {
            const response = await fetch(`${SERVER_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const jsonRes = await response.json();
            const jsonUser = jsonRes.user;

            if (response.status !== 200) {
                console.log('Error in login mobile:', jsonRes.message);
            } else {
                onLoggedIn(jsonRes.jwt);
                // console.log('Success in login mobile:', jsonRes);
                // Khởi tạo user
                const loggedInUser = new UserModel(jsonUser.id, jsonUser.email, jsonUser.name, jsonUser.role, jsonUser.password, jsonUser.avatar, jsonUser.phone, jsonRes.jwt);
                console.log('User: ', loggedInUser);


                updateUser(loggedInUser);

                // Reset the navigation stack and navigate to the NewStackScreen
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'MainScreen' }],
                    })
                );
            }
        } catch (error) {
            console.log('Fetch or login error: ', error);

            // Handle the error here or use Alert.alert to display an error message
            if (error instanceof Error) {
                Alert.alert('Error', error.message);
            } else {

                Alert.alert('Error', 'An unknown error occurred.');
            }
        }
    };

    //hàm xử lý mở modal
    const openForgetPasswordModal = () => {
        setForgetPasswordModalVisible(true);
    };

    //hàm xử lý đóng modal
    const closeForgetPasswordModal = () => {
        setForgetPasswordModalVisible(false);
    };

    //Hàm xử lý khi người dùng nhấn nút Ok trên modal ForgetPasswordModal
    //(Đầu tiên khi bấm vào nút Quên mật khẩu thì modal sẽ hiện lên, sau đó người dùng nhập mã OTP và bấm Ok)
    //Hiện tại chưa có xử lý gì cả, chỉ in ra màn hình console thông tin
    const handleForgotPassword = (submittedOTP: string) => {

        //Những code này chỉ được chạy khi người dùng bấm nút Ok trên modal
        console.log('-----------FORGOT PASSWORD-----------');
        console.log('Email: ' + email);
        console.log('Submitted OTP: ' + submittedOTP)
        console.log('---------------------------');
    }

    return (
        <View style={styles.signinContainer} >

            <View style={{ flex: 5, width: '80%', height: 300 }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                    <Text style={[styles.text, styles.txtType, { marginTop: 12 }]}>Đối Tượng:</Text>

                    <Picker
                        selectedValue={loginType}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => setLoginType(itemValue)}
                    >
                        <Picker.Item label="Khách Hàng" value="customer" />
                        <Picker.Item label="Nhân Viên" value="staff" />
                        <Picker.Item label="Quản Lý" value="admin" />
                    </Picker>
                </View>

                <View style={styles.inputContainer}>
                    <Image source={require('../assets/Images/User_Menu_Male.png')} />
                    <TextInput
                        style={styles.txtInput}
                        placeholder="Email"
                        onChangeText={(text) => setEmail(text)
                        }
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Image source={require('../assets/Images/Lock.png')} />
                    <TextInput
                        style={[styles.txtInput, { marginLeft: 10 }]}
                        placeholder="Mật khẩu"
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>

                <ForgetPasswordModal
                    visible={forgetPasswordModalVisible}
                    onSubmit={(submittedOTP) => handleForgotPassword(submittedOTP)}
                    onClose={closeForgetPasswordModal}
                />

                <View style={styles.forgetPasswordContainer}>
                    <TouchableOpacity onPress={openForgetPasswordModal}>
                        <Text style={[styles.text, styles.txtForgetPassword]}>Quên mật khẩu</Text>
                    </TouchableOpacity>
                </View>

            </View>


            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <TouchableOpacity style={[styles.button]} onPress={handleLogin}>
                    <Text style={[styles.text, { fontSize: 18, fontWeight: 'bold' }]}>Đăng Nhập</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    signinContainer: {
        backgroundColor: 'white',
        borderRadius: 25,
        height: 300,
        width: '90%',
        alignItems: 'center',
        alignSelf: 'center',
    },

    text: {
        color: '#F4F5FB',
        fontFamily: 'Montserrat',
    },
    txtType: {
        color: '#747474',
        fontSize: 20,
        fontWeight: 'bold',
    },
    picker: {
        width: 170,
        fontSize: 20,
    },

    button: {
        backgroundColor: '#279CD2',
        fontFamily: 'Montserrat',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 36,
        width: 170,
        alignSelf: 'center',
    },
    inputContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        textDecorationLine: 'underline line-through',
        borderBottomColor: '#747474',
        borderBottomWidth: 0.5,
    },
    txtInput: {
        color: '#747474',
        fontSize: 15,
    },
    txtForgetPassword: {
        marginTop: 10,
        color: '#242BD0',
        fontSize: 18,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    },
    forgetPasswordContainer: {
        alignItems: 'flex-end',
    }
})