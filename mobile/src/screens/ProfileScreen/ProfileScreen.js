import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function ProfileScreen({ navigation }) {
    const logoutHandle = () => {
        console.log('Logging out'); //TODO: Add logic
    };

    return (
        <View style={styles.container}>
            <Image style={styles.img} source={require('../../assets/images/User_cicrle_duotone.png')} id='profile-pic' />
            <View>
                <View style={styles.textRow}>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.value} id='profile-email'>
                        tuandeptrai@gmail.com
                    </Text>
                </View>
                <View style={styles.textRow}>
                    <Text style={styles.label}>Mật khẩu</Text>
                    <Text style={styles.value} id='profile-password'>
                        *********
                    </Text>
                </View>
                <View style={styles.textRow}>
                    <Text style={styles.label}>Họ tên</Text>
                    <Text style={styles.value} id='profile-name'>
                        Lê Hoài Trung
                    </Text>
                </View>
                <View style={styles.textRow}>
                    <Text style={styles.label}>SĐT</Text>
                    <Text style={styles.value} id='profile-contact'>
                        0373893503
                    </Text>
                </View>
                <View style={styles.textRow}>
                    <Text style={styles.label}>Cửa hàng</Text>
                    <Text style={styles.value} id='profile-store'>
                        Căn tin 1 HCMUS
                    </Text>
                </View>
            </View>

            <TouchableOpacity style={[styles.button]} onPress={logoutHandle}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0.6,
        width: '90%',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        alignSelf: 'center',
        borderRadius: 15,
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
    img: {
        height: 150,
        width: 150,
        alignSelf: 'center',
    },
    textRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    label: {
        fontFamily: 'Montserrat',
        textAlign: 'left',
        flex: 1,
        fontSize: 15,
        fontWeight: 'bold',
    },
    value: {
        fontFamily: 'Montserrat',
        flexWrap: 'wrap',
        fontSize: 15,
        textAlign: 'left',
        flex: 2,
    },
});