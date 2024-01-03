import { StyleSheet, Text, View, TouchableOpacity, Modal, Image,TextInput } from 'react-native'
import React,{useState} from 'react'
import axios from 'axios';
import { useUser } from '../../../models/userContext';
import { api } from '../../../constants/api';


//Hằng số lưu đường dẫn ảnh mặc định cho nguyên liệu
const defaultImage = require('../../../assets/Images/Default_item.png')

//viết hàm formar lại chuỗi có dạng 2024-12-11T11:07:13.000Z thành 11/12/2024
const formatDate = (input) => {
    var date = input.split('T')[0];
    var year = date.split('-')[0];
    var month = date.split('-')[1];
    var day = date.split('-')[2];
    return day+'/'+month+'/'+year;
}

export default function IngredientDetailScreen({ navigation, route }) {
    //Sử dụng useLayoutEffect để tạo header
    navigation.setOptions({
        title: 'Chi Tiết Nguyên Liệu',
        headerStyle: { 
          backgroundColor: '#4554DC' 
        },
        headerTintColor: 'white',
        headerTitleAlign: 'left', 
    });

    //Lấy dữ liệu nguyên liệu từ route
    const { ingredient } = route.params;

    //Tạo state để lưu trữ trạng thái của modal
    const [modalVisible, setModalVisible] = useState(false);

    //Biến user để lấy dữ liệu người dùng đã đăng nhập (trong đó có jwt để xác thực quyền sử dụng API)
    const { user } = useUser();

    //Hàm xử lý khi nút sửa được click
    const handleEditPress = () => {
        //navigation.navigate('EditIngredient', { ingredient: ingredient });
        console.log('Edit Ingredient')
    }

    //Hàm xử lý khi nút xóa được click
    const handleDeletePress = () => {
        //Cho hiện modal
        setModalVisible(!modalVisible); 
    }

    //Hàm xử lý khi nút OK trong modal được click
    const handleOKDeletePress = () => {
        //Gọi API để xóa nguyên liệu
        const deleteIngredient = async () => {
            try {
                // Gọi API để xóa nguyên liệu
                const response = await axios.delete(api.deleteIngredient +'/'+ ingredient.id, {
                    headers: {
                        Authorization: `Bearer ${user.jwt}`,
                    },
                });
                //In ra màn hình console để kiểm tra
                console.log('-------- Delete Ingredient ----------')
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
        deleteIngredient();

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
            

            <Image source={(ingredient.image=='')?ingredient.image:defaultImage} style={styles.imageStyle}/>
            <View>
                <View style={styles.textContainer}>
                    <Text style={[styles.textStyle,{fontWeight:'bold', marginRight:5}]}>
                        Tên nguyên liệu: 
                    </Text>
                    <Text style={styles.textStyle}>
                        {ingredient.name}
                    </Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={[styles.textStyle,{fontWeight:'bold', marginRight:5}]}>
                        Đơn vị tính: 
                    </Text>
                    <Text style={styles.textStyle}>
                        {ingredient.unit}
                    </Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={[styles.textStyle,{fontWeight:'bold', marginRight:5}]}>
                        Số lượng:
                    </Text>
                    <Text style={styles.textStyle}>
                        {ingredient.quantity}
                    </Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={[styles.textStyle,{fontWeight:'bold', marginRight:5}]}>
                        Giá đầu vào (đ):
                    </Text>
                    <Text style={styles.textStyle}>
                        {ingredient.price}
                    </Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={[styles.textStyle,{fontWeight:'bold', marginRight:5}]}>
                        Ngày hết hạn:
                    </Text>
                    <Text style={styles.textStyle}>
                        {formatDate(ingredient.expirationdate)}
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

            {/* Modal xác nhận xóa nguyên liệu */}
            <Modal visible={modalVisible} transparent={true}>
                <View style={{ alignSelf:'center', justifyContent:'flex-end', width:'90%', height:'25%', backgroundColor:'white', borderRadius:10, borderWidth:1, marginTop:350}}>

                    <View style={{flex:1,alignItems:'center', justifyContent:'center', backgroundColor:'#4554DC', borderTopLeftRadius:10, borderTopRightRadius:10}}>
                        <Text style={[styles.text,{fontSize:30,fontWeight:'bold',alignContent:'center', justifyContent:'center'}]}>Xác Nhận</Text>
                    </View>

                    <View style={{alignContent:'center', justifyContent:'center', alignSelf:'center'}}>
                        <Text style={[styles.text, styles.txtLabel, {marginTop:10}]}>Xóa hoàn toàn nguyên liệu này?</Text>
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