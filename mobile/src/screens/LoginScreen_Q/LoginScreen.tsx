import { StyleSheet, Text, View, TextInput,Button } from 'react-native'
import React, {useState} from 'react'
import TabContainer from './TabContainer';

export default function App() {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');

  const handleTabPress = (tab: 'signin' | 'signup') => {
    setActiveTab(tab);
  };

  return (
  <View style={{backgroundColor:'#F4F5FB',justifyContent:'space-evenly'}} >
      <View style={styles.title}>
        <Text style={styles.txtTitle}>
          CanteenUS
        </Text>
      </View>
    <View style={[styles.tabContainer,{height: '100%'}]}>
      <TabContainer activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
   
  </View>
  )
}

const styles = StyleSheet.create({
  title:{
    backgroundColor:'#4554DC',
    height:50,
    justifyContent:'center',
    marginBottom:20,
  },
  text:{
    fontFamily: 'Montserrat',
    fontWeight:'bold'
  },
  txtTitle:{
    marginLeft:20,
    fontSize:30,
    color:'#F4F5FB',
    fontWeight:'bold',
  },
  tabContainer:{
    //backgroundColor: '#F4F5FB',
  }
})