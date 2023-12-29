import React, { Component, useEffect } from 'react';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Icons } from '../constants/index'
import { Image, StyleSheet } from 'react-native';
import LoginScreen from '../screens/LoginScreen/LoginScreen'
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen/ForgetPasswordScreen'
import SigninTab from '../components/SigninTab';
import SignupTab from '../components/SignupTab';
// Screens
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import BillScreen from '../screens/BillScreen/BillScreen';
import DetailsScreen from '../screens/BillScreen/DetailScreen/DetailScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import RevenueScreen from '../screens/RevenueScreen/RevenueScreen';
import ChatScreen from '../screens/ChatScreen/ChatScreen';
import StaffScreen from '../screens/HomeScreen/StaffScreen/StaffScreen';
import ObjectiveScreen from '../screens/HomeScreen/ObjectiveScreen/ObjectiveScreen';
import MenuScreen from '../screens/HomeScreen/MenuScreen/MenuScreen';
import StorageScreen from '../screens/HomeScreen/StorageScreen/StorageScreen';
import ChatDetailScreen from '../screens/ChatScreen/ChatDetailScreen';

//Screen names
const homeName = "Home";
const mainPage = "CanteenUS";
const staffName = "Nhân Viên";
const objectiveName = "Chỉ tiêu";
const menuName = "Menu";
const storageName = "Kho";

const billStack = "BillScreen";
const billName = "Bill";
const billDetailName = "Detail";

const chatStack = "ChatScreen";
const chatName = "Chat";
const chatDetailName = "ChatDetail";


const profileName = "Profile";
const revenueName = "Revenue";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={mainPage} component={HomeScreen}></Stack.Screen>
      <Stack.Screen name={staffName} component={StaffScreen} options={homeHeaderBarStyle}></Stack.Screen>
      <Stack.Screen name={objectiveName} component={ObjectiveScreen} options={homeHeaderBarStyle}></Stack.Screen>
      <Stack.Screen name={menuName} component={MenuScreen} options={homeHeaderBarStyle}></Stack.Screen>
      <Stack.Screen name={storageName} component={StorageScreen} options={homeHeaderBarStyle}></Stack.Screen>
    </Stack.Navigator >
  )
}

const homeHeaderBarStyle = StyleSheet.create(
  {
    headerStyle: {
      backgroundColor: '#4554DC'
    },
    headerTitleStyle: {
      fontWeight: 'bold', color: 'white'
    },
    headerTintColor: 'white',
    headerTitleAlign: 'center',
    headerRight: () => (
      <AntDesign size={20} name='plus' color={'white'} />
    )
  }
)

function BillStackNavigator() {
  // const isFocused = useIsFocused();
  // useEffect(() => {
  //   if (isFocused) {
  //     // Perform actions you want when the screen is focused.
  //     // This could be fetching data, re-rendering components, or any other refresh logic.
  //     // alert('Home screen is on focus');
  //   }
  // }, [isFocused]);
  return (
    <Stack.Navigator

    >
      <Stack.Screen name={billName} component={BillScreen} />
      <Stack.Screen name={billDetailName} component={DetailsScreen} />
    </Stack.Navigator>
  );
}

function ChatStackNavigator() {

  return (
    <Stack.Navigator

    >
      <Stack.Screen name={chatName} component={ChatScreen} />
      <Stack.Screen name={chatDetailName} component={ChatDetailScreen} />
    </Stack.Navigator>
  );
}

function MainContainer() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator> */}
      <Stack.Navigator initialRouteName="Login">
        {/* <Stack.Screen name="SignIn" component={LoginScreen} /> */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" component={SigninTab} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignupTab} options={{ headerShown: false }} />

        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} options={{ headerShown: false }} />

        <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />

        {/*Copy lại y chang, thay name với component = cái import để test */}
        {/* Add other screens as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainScreen() {
  return (
    <Tab.Navigator
      // initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#4554DC'
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            // iconName = focused ? 'home' : 'home-outline';
            iconName = Icons.home;
            console.log(iconName)

          } else if (rn === billStack) {
            // iconName = focused ? 'list' : 'list-outline';
            iconName = Icons.bill;
            console.log(iconName)

          } else if (rn === revenueName) {
            // iconName = focused ? 'settings' : 'settings-outline';
            iconName = Icons.revenue;
            console.log(iconName)

          }
          else if (rn === chatStack) {
            // iconName = focused ? 'settings' : 'settings-outline';
            iconName = Icons.chat;
            console.log(iconName)

          }

          else if (rn === profileName) {
            // iconName = focused ? 'person' : 'person-outline';
            iconName = Icons.profile;
            console.log(iconName)

          }


          // You can return any component that you like here!
          // return <Ionicons name={iconName} size={size} color={color} />;
          return (
            <Image
              source={iconName}
              style={{ height: size, width: size, tintColor: color }}
            />
          );
        },
      })}
      tabBarOptions={{
        style: {
          height: 60,
          with: 100,
          backgroundColor: '#ffffffff',
        },
        activeTintColor: 'white',
        inactiveTintColor: 'lightgrey',
        showLabel: false,
        // labelStyle: { paddingBottom: 10, fontSize: 10 },
      }}
    >

      <Tab.Screen name={homeName} component={HomeStackNavigator} options={{ headerShown: false }} />
      <Tab.Screen name={billStack} component={BillStackNavigator} options={{ headerShown: false }} />
      <Tab.Screen name={revenueName} component={RevenueScreen} />
      <Tab.Screen name={chatStack} component={ChatStackNavigator} options={{ headerShown: false }} />
      <Tab.Screen name={profileName} component={ProfileScreen} />

    </Tab.Navigator>
  )
}

export default MainContainer;