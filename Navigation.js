import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Text, View } from 'react-native';
import MainScreen from './screens/MainScreen';
import SignInScreen from './screens/SignInScreen';
import DefinitionScreen from './screens/DefinitionScreen';
import LanguageSelectionScreen from './screens/LanguageSelectionScreen';
import DrawerScreen from './screens/DrawerScreen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function Navigation() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
         black: require("./assets/fonts//Roboto-Black.ttf"),
        blackItalic: require("./assets/fonts/Roboto-BlackItalic.ttf"),
        bold: require("./assets/fonts/Roboto-Bold.ttf"),
        boldItalic: require("./assets/fonts/Roboto-BoldItalic.ttf"),
        italic: require("./assets/fonts/Roboto-Italic.ttf"),
        light: require("./assets/fonts/Roboto-Light.ttf"),
        lightItalic: require("./assets/fonts/Roboto-LightItalic.ttf"),
        medium: require("./assets/fonts/Roboto-Medium.ttf"),
        mediumItalic: require("./assets/fonts/Roboto-MediumItalic.ttf"),
        regular: require("./assets/fonts/Roboto-Regular.ttf"),
        thin: require("./assets/fonts/Roboto-Thin.ttf"),
        thinItalic: require("./assets/fonts/Roboto-ThinItalic.ttf"),
        });

        // Your additional asynchronous operations go here

        // Artificial delay (remove this if you don't need it)
        // await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      try {
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <View
      style={{
        flex:1
      }}
      onLayout={onLayoutRootView}>
        <Stack.Navigator  initialRouteName="Drawer">
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Main" component={MainScreen}  options={{ headerShown: false }}/>
          <Stack.Screen name="Definition" component={DefinitionScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Drawer" component={DrawerScreen}  options={{ headerShown: false }}/>
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}


