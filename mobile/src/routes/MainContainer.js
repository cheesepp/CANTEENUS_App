import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Icons} from '../constants/index'
import { Image } from 'react-native';

// Screens
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import BillScreen from '../screens/BillScreen/BillScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import RevenueScreen from '../screens/RevenueScreen/RevenueScreen';
import ChatScreen from '../screens/ChatScreen/ChatScreen';

//Screen names
const homeName = "Home";
const billName = "Bill";
const profileName = "Profile";
const chatName = "Chat";
const revenueName = "Revenue";

const Tab = createBottomTabNavigator();

function MainContainer() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={homeName}
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
  
              } else if (rn === billName) {
                // iconName = focused ? 'list' : 'list-outline';
                iconName = Icons.bill;
                console.log(iconName)

              }  else if (rn === revenueName) {
                // iconName = focused ? 'settings' : 'settings-outline';
                iconName = Icons.revenue;
                console.log(iconName)

              }
              else if (rn === chatName) {
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
                  style={{  height: size, width: size, tintColor: color }}
                />
              );
            },
          })}
          tabBarOptions={{
            style: {
              height: 60,
              with:100,
              backgroundColor: '#ffffffff',
            },
            activeTintColor: 'white',
            inactiveTintColor: 'lightgrey',
            showLabel: false,
            // labelStyle: { paddingBottom: 10, fontSize: 10 },
          }}
          >
  
          <Tab.Screen name={homeName} component={HomeScreen} />
          <Tab.Screen name={billName} component={BillScreen} />
          <Tab.Screen name={revenueName} component={RevenueScreen} />
          <Tab.Screen name={chatName} component={ChatScreen} />
          <Tab.Screen name={profileName} component={ProfileScreen} />
  
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
  
export default MainContainer;