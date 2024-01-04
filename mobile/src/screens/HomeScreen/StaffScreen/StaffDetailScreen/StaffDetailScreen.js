import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import React from 'react';

export default function StaffDetailScreen({navigation, route}) {
  navigation.setOptions({
    title: 'Thông Tin',
    headerStyle: {
      backgroundColor: '#4554DC',
    },
    headerTintColor: 'white',
    headerTitleAlign: 'left',
  });

  const {staff} = route.params;

  // Xử lý Sửa thông tin
  const handleEdit = () => {};
  // Xử lý Xoá nhân viên
  const handleDelete = () => {};

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={require('../../../../assets/Images/User_cicrle_duotone.png')}
        id="profile-pic"
      />
      <View>
        <View style={styles.textRow}>
          <Text style={styles.label}>ID</Text>
          <Text style={styles.value} id="staff-id">
            {staff ? staff.id : ''}
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value} id="staff-email">
            {staff ? staff.email : ''}
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.label}>Mật khẩu</Text>
          <Text
            style={styles.value}
            id="staff-password"
            onPress={togglePasswordVisibility}>
            {showPassword ? staff?.password : '**********'}
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.label}>Họ tên</Text>
          <Text style={styles.value} id="staff-name">
            {staff ? staff.name : ''}
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.label}>SĐT</Text>
          <Text style={styles.value} id="staff-contact">
            {staff ? staff.phone : ''}
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignSelf: 'center',
        }}>
        <TouchableOpacity style={[styles.button]} onPress={handleEdit}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
            Sửa
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button]} onPress={handleDelete}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
            Xoá
          </Text>
        </TouchableOpacity>
      </View>
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
    height: 29,
    width: 61,
    alignSelf: 'center',
    marginHorizontal: 5,
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
