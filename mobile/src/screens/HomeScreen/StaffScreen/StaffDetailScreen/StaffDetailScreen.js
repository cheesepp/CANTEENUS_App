import { StyleSheet, Text, View, TouchableOpacity, Modal, Image} from 'react-native'
import React,{useState} from 'react'
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

export default function StaffDetailScreen({ navigation, route }) {
    //Sử dụng useLayoutEffect để tạo header
    navigation.setOptions({
        title: 'Chi Tiết Nhân Viên',
        headerStyle: { 
          backgroundColor: '#4554DC' 
        },
        headerTintColor: 'white',
        headerTitleAlign: 'left', 
    });

    //Lấy dữ liệu nhân viên từ route
    const { staff } = route.params;

    //Tạo state để lưu trữ trạng thái của modal
    const [modalVisible, setModalVisible] = useState(false);

    //Biến user để lấy dữ liệu người dùng đã đăng nhập (trong đó có jwt để xác thực quyền sử dụng API)
    const { user } = useUser();

    //Hàm xử lý khi nút sửa được click
    const handleEditPress = () => {
        navigation.navigate('EditStaff', { staff: staff });
    }

    //Hàm xử lý khi nút xóa được click
    const handleDeletePress = () => {
        //Cho hiện modal
        setModalVisible(!modalVisible); 
    }

    //Hàm xử lý khi nút OK trong modal được click
    const handleOKDeletePress = () => {
        //Gọi API để xóa nhân viên
        const deleteStaff = async () => {
            try {
                // Gọi API để xóa nhân viên
                const response = await axios.delete(api.deleteStaff +'/'+ staff.id, {
                    headers: {
                        Authorization: `Bearer ${user.jwt}`,
                    },
                });
                //In ra màn hình console để kiểm tra
                console.log('-------- Delete Staff ----------')
                console.log(response.data);
                console.log('---------------------------')
            } catch (error) {
                // Xử lý và báo lỗi
                if (error.request) {
                console.log(error.request);
                }
            }
        }
        //Gọi hàm deleteIngredient
        deleteStaff();

        //Cho ẩn modal
        setModalVisible(!modalVisible);

        //Trở về màn hình trước đó
        navigation.goBack();
    }

    //Hàm xử lý khi nút HỦY trong modal được click
    const handleCancelDeletePress = () => {
        //Cho ẩn modal
        setModalVisible(!modalVisible); 
    }
    
    return (
        <View style={[{width:'100%', height:'100%'}]}>
            <View style={[styles.mainContainer]}>
            <Image source={(staff.avatar=='')?staff.avatar:defaultImage} style={styles.imageStyle}/>
            <View>
                <View style={styles.textContainer}>
                    <Text style={[styles.textStyle,{fontWeight:'bold', marginRight:5, flex:1, flexWrap:'wrap'}]}>
                        UID: 
                    </Text>
                    <Text style={[styles.textStyle,{flex:7, flexWrap:'wrap'}]}>
                        {staff.id}
                    </Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={[styles.textStyle,{fontWeight:'bold', marginRight:5}]}>
                        Tên nhân viên: 
                    </Text>
                    <Text style={styles.textStyle}>
                        {staff.name}
                    </Text>
                </View>

                

                <View style={styles.textContainer}>
                    <Text style={[styles.textStyle,{fontWeight:'bold', marginRight:5}]}>
                        Mật khẩu: 
                    </Text>
                    <Text style={styles.textStyle}>
                        ********
                    </Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={[styles.textStyle,{fontWeight:'bold', marginRight:5}]}>
                        Email:
                    </Text>
                    <Text style={styles.textStyle}>
                        {staff.email}
                    </Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={[styles.textStyle,{fontWeight:'bold', marginRight:5}]}>
                        SĐT:
                    </Text>
                    <Text style={styles.textStyle}>
                        {staff.phone}
                    </Text>
                </View>

               

            </View>

            
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.buttonStyle,{marginRight:5}]} onPress={handleEditPress}>
                    <Text style={styles.buttonTextStyle}>
                        Sửa
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.buttonStyle,{marginLeft:5}]} onPress={handleDeletePress}>
                    <Text style={styles.buttonTextStyle}>
                        Xóa
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Modal xác nhận xóa nhân viên */}
            <Modal visible={modalVisible} transparent={true}>
                <View style={{ alignSelf:'center', justifyContent:'flex-end', width:'90%', height:'25%', backgroundColor:'white', borderRadius:10, borderWidth:1, marginTop:350}}>

                    <View style={{flex:1,alignItems:'center', justifyContent:'center', backgroundColor:'#4554DC', borderTopLeftRadius:10, borderTopRightRadius:10}}>
                        <Text style={[styles.text,{fontSize:30,fontWeight:'bold',alignContent:'center', justifyContent:'center'}]}>Xác Nhận</Text>
                    </View>

                    <View style={{alignContent:'center', justifyContent:'center', alignSelf:'center'}}>
                        <Text style={[styles.text, styles.txtLabel, {marginTop:10}]}>Xóa hoàn toàn nhân viên này?</Text>
                    </View>

                    <View style={{padding:10, marginTop:10}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', width:'70%', alignSelf:'center'}}>

                            <TouchableOpacity style={[styles.button, {width:100, height:40, backgroundColor:'#FF5B5B'}]} onPress={handleCancelDeletePress} >
                                <Text style={[styles.text,{textAlign:'left', fontWeight:'bold'}]}>HỦY</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.button,{width:100, height:40, backgroundColor:'#28D62F'}]} onPress={handleOKDeletePress} >
                                <Text style={[styles.text,{textAlign:'right', fontWeight:'bold'}]}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            </View>

            {/* Overlay dùng để làm background tối đi sau khi modal được gọi */}
            {modalVisible && <View style={styles.overlay} />}

        </View>
        
    )
}

const styles = StyleSheet.create({
    mainContainer:{
        width:'90%', height:'70%', marginTop:10, alignSelf:'center',backgroundColor:'white', borderRadius:15
    },
    imageStyle:{
        alignSelf:'center', width:'30%', height:'30%'
    },
    textContainer:{
        flexDirection:'row', marginLeft:15, marginBottom:5
    },
    textStyle:{
        color:'#747474',fontSize:20, fontFamily:'Montserrat'
    },
    buttonContainer:{
        flex:1,flexDirection:'row', alignItems:'flex-end', justifyContent:'center'
    },
    buttonStyle:{
        backgroundColor:'#279CD2', borderRadius:20, width:70, height:30, alignSelf:'center'
    },
    buttonTextStyle:{
        fontSize:20, fontFamily:'Montserrat',color:'white',fontWeight:'bold', alignSelf:'center'
    },
    darkBackground: {
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
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
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black
    },
    txtLabel:{
        color: '#747474',
        fontSize: 18,
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
})