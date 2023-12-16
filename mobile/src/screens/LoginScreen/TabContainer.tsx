import React from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import LoginTab from '../../components/SigninTab';
import RegisterTab from '../../components/SignupTab';

//File TabContainer.tsx chứa giao diện đăng nhập/đăng ký
//Gồm 2 tab: Đăng nhập và Đăng ký
//Mặc định hiển thị tab Đăng nhập
//Khi người dùng nhấn vào tab Đăng ký thì hiển thị tab Đăng ký
//Khi người dùng nhấn vào tab Đăng nhập thì hiển thị tab Đăng nhập

//props của TabContainer
//props là một biến đặc biệt, khi giá trị của nó thay đổi thì giao diện sẽ tự động render lại
type TabContainerProps = {
  activeTab: 'signin' | 'signup';
  onTabPress: (tab: 'signin' | 'signup') => void;
};

const TabContainer: React.FC<TabContainerProps> = ({ activeTab, onTabPress }) => {
  return (
    <View>
       <View style={styles.container}>
        <TouchableOpacity onPress={() => onTabPress('signin')}>
          <Text style={[styles.text, activeTab === 'signin' ? styles.choosen : null]}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTabPress('signup')}>
          <Text style={[styles.text, activeTab === 'signup' ? styles.choosen : null]}>ĐĂNG KÝ</Text>
        </TouchableOpacity>

        </View>
        <View>
          {activeTab === 'signin' ? <LoginTab /> : <RegisterTab />}
        </View>
    </View>
   
  );
};

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginBottom:20,
  },
 
  text:{
      fontFamily: 'Montserrat',
      fontSize:20,
      fontWeight:'bold'
  },
  
  choosen:{
    color:'#279CD2',
    borderBottomColor: '#279CD2',
    borderBottomWidth: 1,
  },
})


export default TabContainer;