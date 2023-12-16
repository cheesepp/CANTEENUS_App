import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

type ForgetPasswordModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
};

const ForgetPasswordModal: React.FC<ForgetPasswordModalProps> = ({ visible, onClose, onSubmit }) => {
    //khai báo state OTP để lưu mã OTP người dùng nhập vào
    const [OTP, setOTP] = useState('');

    //Hàm xử lý khi người dùng nhập mã OTP
    const handleInputChange = (text: string) => {
        setOTP(text);
    };

    //Hàm xử lý khi người dùng nhấn nút Ok trên modal ForgetPasswordModal
    const handleSubmit = () => {
        //Gọi hàm onSubmit được truyền từ component cha vào để gửi mã OTP người dùng nhập vào cho component cha xử lý
        onSubmit(OTP);
    };

    return (
        <Modal visible={visible} animationType="slide" transparent style={{justifyContent:'center'}}>

          <View style={{ alignSelf:'center', justifyContent:'flex-end', width:'90%', height:270, backgroundColor:'white', borderRadius:10, borderWidth:1, marginTop:150}}>

            <View style={{flex:1,alignItems:'center', justifyContent:'center', backgroundColor:'#4554DC', borderTopLeftRadius:10, borderTopRightRadius:10}}>
              
              <Text style={[styles.text,{fontSize:30,fontWeight:'bold',alignContent:'center', justifyContent:'center'}]}>XÁC NHẬN OTP</Text>
            </View>

            <View style={{alignContent:'center', justifyContent:'center', marginTop:5}}>

              <Text style={[styles.text,{color:'#747474',fontSize:18,fontWeight:'bold', marginLeft:10,marginRight:10}]}>
                Điền mã OTP được gửi đến mail của bạn vào ô dưới:
              </Text>
            </View>
                
            <View style={{padding:10}}>
              <TextInput
                  style={styles.input}
                  textAlign='center'
                  onChangeText={handleInputChange}
              />

              <View style={{height:40}}>
                  {/* "chỗ để hiển thị lỗi nhập OTP" */}
              </View>

              <View style={{flexDirection:'row', justifyContent:'space-between', width:'70%', alignSelf:'center'}}>

                <TouchableOpacity style={[styles.button, {width:100, height:40, backgroundColor:'#FF5B5B'}]} onPress={onClose}>
                    <Text style={[styles.text,{textAlign:'left', fontWeight:'bold'}]}>HỦY</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button,{width:100, height:40, backgroundColor:'#28D62F'}]} onPress={handleSubmit}>
                    <Text style={[styles.text,{textAlign:'right', fontWeight:'bold'}]}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
      </Modal>
    );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#747474',
    padding: 8,
    marginVertical: 10,
    fontSize:20,
  },
  title:{
    backgroundColor:'#4554DC',
    height:60,
    justifyContent:'center',
    marginBottom:20,
  },
  text:{
    color: '#F4F5FB',
    fontFamily: 'Montserrat',
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
});

export default ForgetPasswordModal;
