import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';
import StudyScreen from './src/screens/StudyScreen';
import MockTestScreen from './src/screens/MockTestScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import QuizScreen from './src/screens/QuizScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import MockTestSettingsScreen from './src/screens/MockTestSettingsScreen';
import MockQuizScreen from './src/screens/MockQuizScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function StudyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="StudyMain" 
        component={StudyScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Quiz" 
        component={QuizScreen}
        options={{ 
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="Results" 
        component={ResultsScreen}
        options={{ 
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function MockTestStack() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen 
        name="MockTestMain" 
        component={MockTestScreen} 
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen 
        name="MockTestSettings" 
        component={MockTestSettingsScreen}
        options={{ 
          headerShown: false, // Changed from true to false if you want custom header
        }}
      />
      <Stack.Screen 
        name="Quiz" 
        component={MockQuizScreen}
        options={{ 
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="Results" 
        component={ResultsScreen}
        options={{ 
          headerShown: false, // Changed from true to false if you want custom header
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: any;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Study') {
                iconName = focused ? 'book' : 'book-outline';
              } else if (route.name === 'Mock Test') {
                iconName = focused ? 'document-text' : 'document-text-outline';
              } else if (route.name === 'Progress') {
                iconName = focused ? 'trending-up' : 'trending-up-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#4A90E2',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
            tabBarLabelStyle: {
              fontSize: 12,
            },
            tabBarStyle: ((route) => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? "";
              if (routeName === "Quiz") {
                return { display: "none" };
              }

              // if (routeName === "Quiz" || routeName === "Results" || routeName === "MockTestSettings") {
              //   return { display: "none" };
              // }

              // const screensWithoutTabBar = ["Quiz", "Results", "MockTestSettings"];
              // if (screensWithoutTabBar.includes(routeName)) {
              //   return { display: "none" };
              // }

              return {};
            })(route),
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Study" component={StudyStack} />
          <Tab.Screen name="Mock Test" component={MockTestStack} />
          <Tab.Screen name="Progress" component={ProgressScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
} 