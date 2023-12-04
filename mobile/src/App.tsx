import { StyleSheet, Text, View, TextInput,Button } from 'react-native'
import React, {useState} from 'react'
import LoginScreen from './screens/LoginScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  const handleTabPress = (tab: 'login' | 'register') => {
    setActiveTab(tab);
  };

  return (
  
    <View>
      <Text>CANTEEN US</Text>
      <LoginScreen activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  )
}

const styles = StyleSheet.create({})