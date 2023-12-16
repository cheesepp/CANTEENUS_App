import MainContainer from './src/routes/MainContainer';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native'
import LoginScreen from './src/screens/LoginScreen/LoginScreen'
import ForgetPasswordScreen from './src/screens/ForgetPasswordScreen/ForgetPasswordScreen'

//File App.tsx chính của ứng dụng mobile
//Ở đây chỉ cần gọi màn hình LoginScreen

function App() {
  return (
    <View >
      <LoginScreen/>
      {/* <ForgetPasswordScreen/> */}
    </View>
  )
}

const styles = StyleSheet.create({})

// function App() {
//   const Stack = createNativeStackNavigator();
//   return (
//     <MainContainer/>
//   );
// }

export default App;