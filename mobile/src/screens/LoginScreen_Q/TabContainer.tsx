import React from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import LoginTab from '../../components/LoginTab';
import RegisterTab from '../../components/RegisterTab';

type TabContainerProps = {
  activeTab: 'ĐĂNG NHẬP' | 'ĐĂNG KÝ';
  onTabPress: (tab: 'ĐĂNG NHẬP' | 'ĐĂNG KÝ') => void;
};

const TabContainer: React.FC<TabContainerProps> = ({ activeTab, onTabPress }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => onTabPress('ĐĂNG NHẬP')}>
        <Text style={{ color: activeTab === 'ĐĂNG NHẬP' ? 'blue' : 'black' }}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onTabPress('ĐĂNG KÝ')}>
        <Text style={{ color: activeTab === 'ĐĂNG KÝ' ? 'blue' : 'black' }}>Register</Text>
      </TouchableOpacity>
      {activeTab === 'ĐĂNG NHẬP' ? <LoginTab /> : <RegisterTab />}
    </View>
  );
};

const styles = StyleSheet.create({
  
})


export default TabContainer;