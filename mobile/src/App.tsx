import { StyleSheet, View } from 'react-native'
import LoginScreen from './screens/LoginScreen/LoginScreen'

//File App.tsx chính của ứng dụng mobile
//Ở đây chỉ cần gọi màn hình LoginScreen

export default function App() {
  return (
    <View >
      <LoginScreen/>
    </View>
  )
}

const styles = StyleSheet.create({})