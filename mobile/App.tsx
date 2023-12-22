import MainContainer from './src/routes/MainContainer';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native'
import LoginScreen from './src/screens/LoginScreen/LoginScreen'
import ForgetPasswordScreen from './src/screens/ForgetPasswordScreen/ForgetPasswordScreen'
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';
import SigninTab from './src/components/SigninTab';
import SignupTab from './src/components/SignupTab';
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
    // <View >
    //   {/* <LoginScreen/> */}
    //   {/* <ForgetPasswordScreen/> */}

    // </View>
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {/* <Stack.Screen name="SignIn" component={LoginScreen} /> */}
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignIn" component={SigninTab} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignupTab} options={{ headerShown: false }} />

          <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} options={{ headerShown: false }} />

          <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />

          {/*Copy lại y chang, thay name với component = cái import để test */}
          {/* Add other screens as needed */}
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>

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