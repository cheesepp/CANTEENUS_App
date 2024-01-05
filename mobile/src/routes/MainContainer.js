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
import { useUser } from '../models/userContext';

// Screens
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import BillScreen from '../screens/BillScreen/BillScreen';
import DetailsScreen from '../screens/BillScreen/DetailScreen/DetailScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import RevenueScreen from '../screens/RevenueScreen/RevenueScreen';
import ChatScreen from '../screens/ChatScreen/ChatScreen';
import StaffScreen from '../screens/HomeScreen/StaffScreen/StaffScreen';
import ObjectiveScreen from '../screens/HomeScreen/ObjectiveScreen/ObjectiveScreen';
// Menu
import MenuScreen from '../screens/HomeScreen/MenuScreen/MenuScreen';
import FoodDetailScreen from '../screens/HomeScreen/MenuScreen/FoodDetailScreen';
import EditFoodItem from '../screens/HomeScreen/MenuScreen/EditFoodItem';
import AddFoodItem from '../screens/HomeScreen/MenuScreen/AddFoodItem';
//Storage
import StorageScreen from '../screens/HomeScreen/StorageScreen/StorageScreen';
import IngredientDetailScreen from '../screens/HomeScreen/StorageScreen/IngredientDetailScreen';

import AddIngredientScreen from '../screens/HomeScreen/StorageScreen/AddIngredientScreen';
import EditIngredientScreen from '../screens/HomeScreen/StorageScreen/EditIngredientScreen';
import ChatDetailScreen from '../screens/ChatScreen/ChatDetailScreen';
import RatingScreen from '../screens/BillScreen/RatingScreen/RatingScreen';
import CustomerHomeScreen from '../screens/CustomerRole/CustomerHomeScreen/CustomerHomeScreen';
import CustomerCartScreen from '../screens/CustomerRole/CustomerCartScreen/CustomerCartScreen';

import StaffAddScreen from '../screens/HomeScreen/StaffScreen/StaffDetailScreen/StaffAddScreen';
import StaffDetailtScreen from '../screens/HomeScreen/StaffScreen/StaffDetailScreen/StaffDetailScreen';
import StaffEditScreen from '../screens/HomeScreen/StaffScreen/StaffDetailScreen/StaffEditScreen';
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
const billRatingName = "Rating";

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
      <Stack.Screen name={'FoodDetail'} component={FoodDetailScreen} />
      <Stack.Screen name={'EditFood'} component={EditFoodItem} />
      <Stack.Screen name={'AddFood'} component={AddFoodItem} />
      <Stack.Screen name={storageName} component={StorageScreen} options={homeHeaderBarStyle}></Stack.Screen>
      <Stack.Screen name={'IngredientDetail'} component={IngredientDetailScreen} />
      <Stack.Screen name={'AddIngredient'} component={AddIngredientScreen} />
      <Stack.Screen name={'EditIngredient'} component={EditIngredientScreen} />
      <Stack.Screen name={'AddStaff'} component={StaffAddScreen}></Stack.Screen>
      <Stack.Screen name={'DetailStaff'} component={StaffDetailtScreen}></Stack.Screen>
      <Stack.Screen name={'EditStaff'} component={StaffEditScreen}></Stack.Screen>
    </Stack.Navigator >
  )
}

const staffMainPage = 'staffMainPage'
const staffCartName = 'staffCartName'

function StaffHomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={staffMainPage} component={StaffHomeScreen}></Stack.Screen>
      <Stack.Screen name={staffCartName} component={StaffCartScreen}></Stack.Screen>
    </Stack.Navigator>
  )
}

const customerMainPage = 'customerMainPage'
const customerCartName = 'customerCartName'

function CustomerHomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={customerMainPage} component={CustomerHomeScreen}></Stack.Screen>
      <Stack.Screen name={customerCartName} component={CustomerCartScreen}></Stack.Screen>
    </Stack.Navigator>
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
      <Stack.Screen name={billRatingName} component={RatingScreen}></Stack.Screen>
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

function RoleNavigator({ role }) {

  let content = HomeStackNavigator
  if (role === 'customer' || role === 'staff') {
    console.log('Role is',role)
    content = CustomerHomeNavigator
  }
  return content
}

function MainScreen() {
  
  const { user } = useUser()

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
      {/* Default role là admin */}
      <Tab.Screen name={homeName} component={RoleNavigator({role: user?.role ?? "admin"})} options={{ headerShown: false }} />
      <Tab.Screen name={billStack} component={BillStackNavigator} options={{ headerShown: false }} />
      {
       user && user.role === 'admin' ? <Tab.Screen name={revenueName} component={RevenueScreen} /> : null
      }
      <Tab.Screen name={chatStack} component={ChatStackNavigator} options={{ headerShown: false }} />
      <Tab.Screen name={profileName} component={ProfileScreen} />

    </Tab.Navigator>
  )
}

export default MainContainer;