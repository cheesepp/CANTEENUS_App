import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'

export default function ForgetPasswordScreen() {
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');

    //Hàm xử lý khi người dùng nhấn nút Đổi mật khẩu
    const handleForgetPassword = () => {
        //Hiện chưa xử lý gì, chỉ in ra màn hình console
        console.log('-----------FORGET PASSWORD-----------');
        console.log('Email: ' + email);
        console.log('New Password: ' + newPassword);
        console.log('Confirm Password: ' + confirmPassword);
    }

    return (
        <View style={{backgroundColor:'#F4F5FB'}} >

            <View style={styles.title}>

                <Text style={styles.txtTitle}>
                    CanteenUS
                </Text>
            </View >

            <View style={[{height: '100%'}]}>

                <View style={[{alignItems:'center', marginBottom:20}]}>

                    <Text style={[styles.text, {fontSize:40, color:'#279CD2'}]}>
                        ĐỔI MẬT KHẨU
                    </Text>
                </View>
                
                <View style={styles.Container}>
                  
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={[styles.text, styles.txtLabel, {marginTop:16, textAlign:'left', marginLeft:10}]}>Mail:</Text>
                        <Text style={[styles.text, {marginTop:16, textAlign:'right', marginRight:10}]}>"Mail của người đổi mật khẩu"</Text>
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={[styles.text, styles.txtLabel, {marginTop:16, textAlign:'left', marginLeft:10}]}>Mật khẩu mới:</Text>
                        <View style={[styles.inputContainer,{marginRight:10} ]}>
                            <TextInput
                                secureTextEntry = {true}
                                style={[styles.txtInput, {width:165}]}
                                onChangeText={(newPassword) => setNewPassword(newPassword)} 
                            />  
                        </View>
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>

                        <Text style={[styles.text, styles.txtLabel, {marginTop:16, textAlign:'left', marginLeft:10}]}>Nhập lại mật khẩu:</Text>

                        <View style={[styles.inputContainer,{marginRight:10}]}>
                            <TextInput
                                secureTextEntry = {true}
                                style={[styles.txtInput, {width:165}]}
                                onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)} 
                            />  
                        </View>
                    </View>

                    <View style={{flex:1, justifyContent:'flex-end', marginBottom:10}}>
                        <TouchableOpacity style = {[styles.button]} onPress={handleForgetPassword} >
                            <Text style = {[styles.text,{fontSize:18,fontWeight:'bold', color:'#FFFFFF'}]}>Đổi mật khẩu</Text>
                        </TouchableOpacity>
                    </View>
                </View> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        backgroundColor:'#4554DC',
        height:60,
        justifyContent:'center',
        marginBottom:20,
      },
      text:{
        fontFamily: 'Montserrat',
        fontWeight:'bold'
      },
      txtTitle:{
        marginLeft:20,
        fontSize:30,
        color:'#F4F5FB',
        fontWeight:'bold',
      },
      picker:{ 
        width: 170,
        fontSize:20,
    },
      
    Container:{
        backgroundColor:'white',
        borderRadius: 25,
        height: 300,
        width: '90%',
        alignSelf: 'center',
    },
    txtType:{
        color: '#747474',
        fontSize: 20,
        fontWeight: 'bold',
    },
    inputContainer:{
        flexDirection: 'row',
        borderBottomColor: '#747474',
        borderBottomWidth: 0.5,
    },
    txtInput:{
        color:'#747474',
        fontSize:15,
    },
    txtLabel:{
        color: '#747474',
        fontSize: 20,
        fontWeight: 'bold',
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
})