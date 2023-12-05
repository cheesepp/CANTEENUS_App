import { StyleSheet, Text, View, TextInput,Button } from 'react-native'
import React, {useState} from 'react'
import TabContainer from './TabContainer';

export default function App() {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');

  const handleTabPress = (tab: 'signin' | 'signup') => {
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