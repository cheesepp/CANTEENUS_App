import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView, Keyboard, Alert } from 'react-native'
import React, {useState} from 'react'
import { Picker } from '@react-native-picker/picker'

// Cho navigate về trang home
import { CommonActions, useNavigation } from '@react-navigation/native';
//file RegisterTab.tsx
//File này chứa giao diện tab Đăng ký
const SERVER_URL = 'http://10.0.2.2:8080' //Android dùng localhost thì phải dùng IP 10.0.2.2


export default function RegisterTab() {
    // Tạo navigation về trang chủ
    const navigation = useNavigation();

    interface ErrorState {
        email?: string;
        name?: string;
        phone?: string;
        password?: string;
        confirmPassword?: string;
    }
    //khai báo các state để lưu thông tin người dùng nhập vào
    //state là một biến đặc biệt, khi giá trị của nó thay đổi thì giao diện sẽ tự động render lại
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setRole] = useState('Khách Hàng') //Loại đăng nhập: ['Sinh viên', 'Giảng viên'

    //usestate gọi lỗi
    const [error, setError] = useState<ErrorState>({});
    
    const inputValidate = () => {
        Keyboard.dismiss();
        let isValid = true;
        if(!email) {
            handleError('Vui lòng nhập email', 'email')
            isValid = false;
        } else if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            handleError('Email nhập chưa hợp lệ', 'email')
            isValid = false;
        }
        if(!name) {
            handleError('Vui lòng nhập họ tên', 'name')
            isValid = false;
        } else if (name.length > 50) {
            handleError('Độ dài tên phải không quá 50 chữ', 'name')
            isValid = false;
        }
        if(!phone) {
            handleError('Vui lòng nhập số điện thoại', 'phone')
            isValid = false;
            
        }
        //Số phải nằm trong khoảng [8, 11] số và bắt đầu bằng số 0 
        else if (phone.length < 8 || phone.length > 11 && phone.match(/^0\d+/)) {
            handleError('Số điện thoại chưa hợp lệ', 'phone')
            isValid = false;
        }
        if(!password) {
            handleError('Vui lòng nhập mật khẩu', 'password')
            isValid = false;
        } 
        else if (password.length < 6) {
            handleError('Mật khẩu phải có ít nhất 6 ký tự', 'password')
            isValid = false;
        }
        //Mật khẩu phải có ít nhất 1 chữ in hoa và 1 ký số
        else if (!password.match(/[A-Z]/) || !password.match(/[0-9]/)) {
            handleError('Mật khẩu phải có ít nhất 1 chữ in hoa và 1 ký số', 'password')
            isValid = false;
        
        }
        if(!confirmPassword) {
            handleError('Vui lòng nhập lại mật khẩu', 'confirmPassword')
            isValid = false;
        } else if (password != confirmPassword) {
            handleError('Mật khẩu nhập chưa đúng', 'confirmPassword')
            isValid = false;
        }

        
        console.log('VALID?', isValid);
        if (isValid) {
            handleRegister();
        }
    }
    //Có lỗi thì hiện cái này
    const handleError = (errorMessage: string | null, input: string) => {
        setError((prevState) => ({...prevState, [input]: errorMessage}));
    }
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
    const handleRegister = async () => {
            const payload = {
                name,
                email,
                password,
                phone,
                role,
            };
            console.log('Payload', JSON.stringify(payload));
            try {
                const response = await fetch(`${SERVER_URL}/auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });
    
                const jsonRes = await response.json();
    
                if (response.status !== 201) {
                    console.log('Error in register mobile:', jsonRes.message);
                } else {
                    console.log('Success in register mobile:', jsonRes);
                    navigation.dispatch(CommonActions.navigate({ name: 'SignIn' })); //Chuyển tạm sang trang đăng nhập, hơi xấu
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
        
        
    }

    return ( 
        <View style = {styles.signupContainer}>
            <View style={{flex:10, width:330,height:500, marginTop:10}}>

                <View style={{marginBottom:10, borderBottomColor:'#000', borderBottomWidth:1}}>
                    <Image style= {styles.img}source={require('../assets/Images/User_cicrle_duotone.png')}/>

                    <TouchableOpacity style={[styles.button, {height:30,width:100, marginBottom:10}]} onPress={handleChooseImage}>
                        <Text style = {[styles.text,{fontSize:13,fontWeight:'bold'}]}>Chọn Ảnh</Text>
                    </TouchableOpacity>
                </View>
            

                <ScrollView  contentContainerStyle={[styles.scrowView, {height:550}]}>

                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style = {[styles.text,styles.txtLabel,{marginTop:16}]}>Đối Tượng:</Text>
                        <Picker
                            selectedValue={role}
                            style={[styles.picker, {textAlign:'right'}]}
                            onValueChange={(itemValue, itemIndex) => setRole(itemValue)}
                        >
                            <Picker.Item label="Khách Hàng" value="Khách Hàng" />
                            <Picker.Item label="Quản Lý" value="Quản Lý" />
                        </Picker>
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={[styles.text, styles.txtLabel, {marginTop:16, textAlign:'left'}]}>Mail:</Text>
                        <View style={{flexDirection:'column'}}>
                            <View style={[styles.inputContainer]}>
                            <TextInput
                                style={[styles.txtInput, {width:200}]}
                                placeholder='Nhập email'
                                onChangeText={(email) => setEmail(email)}
                                onFocus={() => handleError(null, 'email')}
                            />
                            </View>
                            {error.email && (
                            <Text style={{marginTop: 7, color: 'red', fontSize: 13}}>
                                {error.email}
                            </Text>
                            )}
                        </View>
                        
                    
                    </View>
                    
            
                    <View style = {{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style = {[styles.text,styles.txtLabel,{marginTop:16,textAlign:'left'}]}>Họ tên:</Text>
                        <View style={{flexDirection:'column'}}>
                            <View style={[styles.inputContainer]}>
                                <TextInput
                                    style={[styles.txtInput,{width:200}]}
                                    placeholder='Nhập họ tên'

                                    onChangeText={(name) => setName(name)}
                                    onFocus={() => handleError(null, 'name')}

                                />
                            </View>
                            {error.name && (
                            <Text style={{marginTop: 7, color: 'red', fontSize: 13}}>
                                {error.name}
                            </Text>
                            )}
                        </View>
                        
                    </View>

                    <View style = {{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style = {[styles.text,styles.txtLabel,{marginTop:16,textAlign:'left'}]}>SĐT:</Text>
                        <View style={{flexDirection:'column'}}>
                            <View style={[styles.inputContainer]}>
                                <TextInput
                                    style={[styles.txtInput,{width:200}]}
                                    placeholder='Nhập số điện thoại'
                                    onChangeText={(phone) => setPhone(phone)}
                                    onFocus={() => handleError(null, 'phone')}

                                />
                            </View>

                            {error.phone && (
                                <Text style={{marginTop: 7, color: 'red', fontSize: 13}}>
                                    {error.phone}
                                </Text>
                            )}
                        </View>

                        
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={[styles.text, styles.txtLabel, {marginTop: 16, textAlign: 'left'}]}>Mật khẩu:</Text>
                        <View style={{flexDirection: 'column'}}>
                            <View style={[styles.inputContainer]}>
                                <TextInput
                                    secureTextEntry
                                    style={[styles.txtInput, {width: 200}]}
                                    placeholder='Nhập mật khẩu'
                                    onChangeText={(password) => setPassword(password)}
                                    onFocus={() => handleError(null, 'password')}
                                />
                            </View>

                            <View style={{marginTop: 7, flexDirection: 'row', alignItems: 'flex-start'}}>
                                <Text style={{color: 'red', fontSize: 13, flex: 1}}>
                                    {error.password}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style = {{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style = {[styles.text,styles.txtLabel,{marginTop:16,textAlign:'left'}]}>Xác nhận MK:</Text>
                        <View style={{flexDirection:'column'}}>
                            <View style={[styles.inputContainer]}>
                                <TextInput
                                    secureTextEntry
                                    style={[styles.txtInput,{width:200}]}
                                    placeholder='Nhập lại mật khẩu'

                                    onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                                    onFocus={() => handleError(null, 'confirmPassword')}

                                />
                            </View>

                            {error.confirmPassword && (
                                <Text style={{marginTop: 7, color: 'red', fontSize: 13}}>
                                    {error.confirmPassword}
                                </Text>
                            )}
                        </View>
                        
                    </View>

                </ScrollView>
            </View>

            <View style={{flex:1}}>
                    <TouchableOpacity style = {[styles.button]} onPress={inputValidate} >
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
        height: 650,
        width: "90%",
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
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputContainer:{
        borderBottomColor: '#747474',
        borderBottomWidth: 0.5,
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