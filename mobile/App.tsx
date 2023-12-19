import MainContainer from './src/routes/MainContainer';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native'
import LoginScreen from './src/screens/LoginScreen/LoginScreen'
import ForgetPasswordScreen from './src/screens/ForgetPasswordScreen/ForgetPasswordScreen'
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';


//File App.tsx chính của ứng dụng mobile
//Ở đây chỉ cần gọi màn hình LoginScreen
const Stack = createNativeStackNavigator(); //Tạo Stack navigator. 
//Tạm thời là giữ các file là .js -> chuyển tsx sau


function App() {
  return (
    // <View >
    //   {/* <LoginScreen/> */}
    //   {/* <ForgetPasswordScreen/> */}

    // </View>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Profile" component={ProfileScreen} /> 
        {/*Copy lại y chang, thay name với component = cái import để test */}
        {/* Add other screens as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
//q: Property 'navigation' is missing in type '{}' but required in type '{navigation: any;}'.
//a: https://stackoverflow.com/questions/63680239/property-navigation-is-missing-in-type-but-required-in-type-navigation


const styles = StyleSheet.create({})

// function App() {
//   const Stack = createNativeStackNavigator();
//   return (
//     <MainContainer/>
//   );
// }

export default App;