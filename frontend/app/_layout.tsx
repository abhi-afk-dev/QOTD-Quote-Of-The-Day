import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { Platform, AppState, KeyboardAvoidingView } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  useEffect(() => {
    const setNavBarColor = () => {
      if (Platform.OS === 'android') {
        NavigationBar.setButtonStyleAsync('light');
      }
    };
    setNavBarColor();
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        setNavBarColor();
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#000',height:"100%" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <StatusBar style="light" />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}