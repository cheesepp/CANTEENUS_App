import { StyleSheet, Text, View, TextInput,Button } from 'react-native'
import React, {useState} from 'react'
import TabContainer from './TabContainer';

export default function App() {
  const [activeTab, setActiveTab] = useState<'ĐĂNG NHẬP' | 'ĐĂNG KÝ'>('ĐĂNG NHẬP');

  const handleTabPress = (tab: 'ĐĂNG NHẬP' | 'ĐĂNG KÝ') => {
    setActiveTab(tab);
  };

  return (
    <View>
      <TabContainer activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  
})