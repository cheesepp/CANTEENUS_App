import MainContainer from './src/routes/MainContainer';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Import user context để truy cập user
import { UserProvider } from './src/models/userContext';



//File App.tsx chính của ứng dụng mobile
//Ở đây chỉ cần gọi màn hình LoginScreen
const Stack = createNativeStackNavigator(); //Tạo Stack navigator. 
//Tạm thời là giữ các file là .js -> chuyển tsx sau


// CHƯA TEST CÁI NÀY NÊN CỨ ĐỂ ĐÓ
// // Gọi tab cho login screen
// const Tab = createBottomTabNavigator();

// function Login() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="SigninTab" component={SigninTab} options={{ headerShown: false }}/>
//       <Tab.Screen name="SignupTab" component={SignupTab} options={{ headerShown: false }}/>
//     </Tab.Navigator>
//   );
// }


function App() {
  return (
    <UserProvider>
      <MainContainer/>
    </UserProvider>

  )
}
export default App;