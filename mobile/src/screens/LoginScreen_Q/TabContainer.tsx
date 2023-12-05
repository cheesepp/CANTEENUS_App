import React from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import LoginTab from '../../components/LoginTab';
import RegisterTab from '../../components/RegisterTab';

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