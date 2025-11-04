import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

function RootLayoutContent() {
  const router = useRouter();

  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <Tabs
        screenOptions={{
          headerShown: false,

          tabBarStyle: {
            backgroundColor: '#1d1d1d',
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#8e8e93',
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="fav"
          options={{
            title: 'Favorites',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? 'heart' : 'heart-outline'}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="random"
          options={{
            title: 'Random',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? 'bulb' : 'bulb-outline'}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

export default function TabLayout() {
  return (
    <RootLayoutContent />
  );
}