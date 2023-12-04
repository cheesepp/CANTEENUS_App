import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LoginTab from '../components/LoginTab';
import RegisterTab from '../components/RegisterTab';

type LoginScreenProps = {
  activeTab: 'login' | 'register';
  onTabPress: (tab: 'login' | 'register') => void;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ activeTab, onTabPress }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => onTabPress('login')}>
        <Text style={{ color: activeTab === 'login' ? 'blue' : 'black' }}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onTabPress('register')}>
        <Text style={{ color: activeTab === 'register' ? 'blue' : 'black' }}>Register</Text>
      </TouchableOpacity>
      {activeTab === 'login' ? <LoginTab /> : <RegisterTab />}
    </View>
  );
};

export default LoginScreen;