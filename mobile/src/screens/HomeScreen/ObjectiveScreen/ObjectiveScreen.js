import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, FlatList, Text,StyleSheet, Modal, TextInput} from 'react-native';
import ObjectiveItem from './ObjectiveItem';
import axios from 'axios';
import { useUser } from '../../../models/userContext';
import { api } from '../../../constants/api';
import AntDesign from 'react-native-vector-icons/AntDesign';



export default function ObjectiveScreen({ navigation }) {
    //Tạo state để lưu trữ trạng thái của modal
    const [modalVisible, setModalVisible] = useState(false);

    //Biến user để lấy dữ liệu người dùng đã đăng nhập (trong đó có jwt để xác thực quyền sử dụng API)
    const { user } = useUser();

    //Tạo state để lưu trữ dữ liệu lấy về từ database
    const [objectItems, setObjectItems] = useState(null);
    
    //Tạo state để lưu trữ trạng thái của header
    const [isHeaderClicked, setHeaderClicked] = useState(false);

    //Tạo state để lưu trữ dữ liệu nhập vào
    const [target, setTarget] = useState(null);
    const [date, setDate] = useState(null);

    //Hàm xử lý khi header được click
    const handleHeaderClick = () => {
        //Thay đổi trạng thái của header khi được click
        const fetchData = async () => {
            try {
                // Gọi API để lấy dữ liệu từ database
                const response = await axios.get(api.getTargets, {
                    headers: {
                        Authorization: `Bearer ${user.jwt}`,
                    },
                });
                //Lưu dữ liệu lấy được vào state
                setObjectItems(response.data.targets);

                //In ra màn hình console từng item lấy được để kiểm tra
                console.log('-------- Refresh Targets ----------')
                response.data.targets.map((item) => {
                    console.log(item);
                });
                console.log('---------------------------')
            } catch (error) {
                // Xử lý và báo lỗi
                if (error.request) {
                    console.log(error.request);
                }
            }
        };
        // Gọi hàm fetchData khi header được click
        fetchData();
        setHeaderClicked(!isHeaderClicked);
    };

    //Sử dụng useLayoutEffect để tạo header
    React.useLayoutEffect(() => {
        //Tạo header
        navigation.setOptions({
            title: 'Chỉ tiêu',
            headerStyle: { 
            backgroundColor: '#4554DC' 
            },
            headerTintColor: 'white',
            headerTitleAlign: 'left', 
            //Tạo nút để reload dữ liệu từ database khi được click
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 15 }} onPress={handleHeaderClick}>
                    <AntDesign size={20} name='reload1' color={'white'} />
                </TouchableOpacity>
            ),
        });
    }, [navigation, isHeaderClicked]);

    //sử dụng useEffect để lấy dữ liệu từ database
    useEffect(() => {
    //Khởi tạo hàm fetchData để lấy dữ liệu từ database
    const fetchData = async () => {
        try { 
            //dùng axios để lấy dữ liệu từ database
            const response = await axios.get(api.getTargets, {
                //headers để xác thực người dùng
                headers: {
                    Authorization: `Bearer ${user.jwt}`,
                },
            });
            
            //Lưu dữ liệu lấy được vào state
            setObjectItems(response.data.targets);

            //In ra màn hình console từng item lấy được để kiểm tra
            console.log('-------- Targets ----------')
            response.data.targets.map((item) => {
                console.log(item);
            });
            console.log('---------------------------')

        } catch (error) {
            // Xử lý và báo lỗi
            if (error.response) {
                // Request được gửi đi và server trả về response với status code không phải 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                } else if (error.request) {
                // Request được gửi đi nhưng không nhận được response nào
                console.log(error.request);
                } else {
                    // Có lỗi xảy ra khi setup request
                    console.log('Error', error.message);
                }
            }
        };
        //Gọi hàm fetchData để lấy dữ liệu từ database
        fetchData();
    }, []);

    //Hàm render item trong Flatlist để hiển thị dữ liệu lên màn hình
    const renderItem = ({ item }) => {
        return <ObjectiveItem objective={item} />;
    };

   
    //Hàm gọi POST API add-target để thêm một chỉ tiêu mới vào database
    //-target là kiểu int
    //-date là kiểu string có định dạng 'yyyy-MM-dd'
    const addTarget = async (target, date) => {
        //data là những tham số nằm trong body của API
        const data = {
            target: target,
            date: date
        };
        try {
            const response = await axios.post(api.addTarget, data, {
                //headers để xác thực người dùng
                headers: {
                    Authorization: `Bearer ${user.jwt}`,
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error sending data: ", error);
        }
    };
    //VD: addTarget(1, "2003-06-21");

    //Hàm chuyển chuỗi có định dạng 'dd-MM-yyyy' sang 'yyyy-MM-dd'
    //Vì API chỉ nhận định dạng 'yyyy-MM-dd', nhưng khi nhập vào thì người dùng nhập theo định dạng 'dd-MM-yyyy' nên cần chuyển đổi
    const convertDate = (inputDate) => {
        const date = inputDate.split('-');
        const newDate = date[2] + '-' + date[1] + '-' + date[0];
        return newDate;
    }

    //Hàm xử lý khi nút thêm món ăn được click
    const handleFloatingButtonPress = () => {
        //Cho hiện modal
        setModalVisible(!modalVisible); 
    }

    //Handle khi nút OK được click
    const handleOKButtonPress = async () => {
        //Thêm chỉ tiêu vào database
        await addTarget(target, date);

        //Refresh lại dữ liệu từ database
        const fetchData = async () => {
            try {
                const response = await axios.get(api.getTargets, {
                    headers: {
                        Authorization: `Bearer ${user.jwt}`,
                    },
                });
                // Update the state with the new data
                setObjectItems(response.data.targets);
            } catch (error) {
                console.log(error);
            }
        };

        // Gọi hàm fetchData để lấy dữ liệu từ database
        fetchData();

        //Tắt modal
        setModalVisible(!modalVisible);
        
    }

    //Trả về giao diện của component
    return (
        <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center'} ]}>
            {/* Sử dụng flatlist để hiển thị dữ liệu lên màn hình */}
            <FlatList
                //data là dữ liệu lấy từ state
                data={objectItems}
                //gọi hàm renderItem để hiển thị dữ liệu theo từng item custom trong Flatlist
                renderItem={renderItem}
                //keyExtractor để xác định key cho từng item trong Flatlist
                keyExtractor={item => item.id}    
            />

            {/* Floating button khi bấm vào sẽ gọi modal để thêm chỉ tiêu */}
            <TouchableOpacity style={styles.floatingButton} onPress = {handleFloatingButtonPress}>
                <Text style={styles.floatingButtonIcon}>+</Text>
            </TouchableOpacity>

             {/* Overlay dùng để làm background tối đi sau khi modal được gọi */}
            {modalVisible && <View style={styles.overlay} />}

            {/* Modal để thêm chỉ tiêu */}
            <Modal visible={modalVisible} transparent={true}>
                <View style={{ alignSelf:'center', justifyContent:'flex-end', width:'90%', height:240, backgroundColor:'white', borderRadius:10, borderWidth:1, marginTop:300}}>

                    <View style={{flex:1,alignItems:'center', justifyContent:'center', backgroundColor:'#4554DC', borderTopLeftRadius:10, borderTopRightRadius:10}}>
                        <Text style={[styles.text,{fontSize:30,fontWeight:'bold',alignContent:'center', justifyContent:'center'}]}>Thiết Lập</Text>
                    </View>

                    <View style={{alignContent:'center', justifyContent:'center', marginTop:5, marginRight:10, marginLeft:10,flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={[styles.text, styles.txtLabel, {marginTop:16, textAlign:'left'}]}>Ngày:</Text>
                        <View style={{flexDirection:'column'}}>
                            <View style={[styles.inputContainer]}>
                                <TextInput
                                    style={[styles.txtInput, {width:200}]}
                                    placeholder='dd-MM-yyyy'
                                    //Tham số inputDate là chuỗi có định dạng 'dd-MM-yyyy', cần chuyển đổi sang 'yyyy-MM-dd' để gọi API
                                    onChangeText={(inputDate) => setDate(convertDate(inputDate))}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={{alignContent:'center', justifyContent:'center', marginTop:5,marginRight:10, marginLeft:10,flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={[styles.text, styles.txtLabel, {marginTop:16, textAlign:'left'}]}>Chỉ tiêu :</Text>
                        <View style={{flexDirection:'column'}}>
                            <View style={[styles.inputContainer]}>
                                <TextInput
                                    style={[styles.txtInput, {width:200}]}
                                    placeholder='Số lượng khẩu phần'
                                    onChangeText={(inputTarget) => setTarget(inputTarget)}
                                />
                            </View>
                        </View>
                    </View>
                        
                    <View style={{padding:10, marginTop:20}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', width:'70%', alignSelf:'center'}}>

                            <TouchableOpacity style={[styles.button, {width:100, height:40, backgroundColor:'#FF5B5B'}]} onPress={handleFloatingButtonPress}>
                                <Text style={[styles.text,{textAlign:'left', fontWeight:'bold'}]}>HỦY</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.button,{width:100, height:40, backgroundColor:'#28D62F'}]} onPress={handleOKButtonPress}>
                                <Text style={[styles.text,{textAlign:'right', fontWeight:'bold'}]}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    darkBackground: {
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#4554DC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingButtonIcon: {
        fontSize: 35,
        color: 'white',
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