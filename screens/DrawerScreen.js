import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainScreen from './MainScreen';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import * as Icon from 'react-native-feather'
import { myColors } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { toggle, open } from '../slices/langSettingSlice';
import LanguageSelectionScreen from './LanguageSelectionScreen';



export default function DrawerScreen({navigation}) {

    const Drawer = createDrawerNavigator();



const CustomDrawerContent = (props) => {
    
    return (
    
        <DrawerContentScrollView {...props}>
            
          <DrawerItemList {...props} />
         
          <DrawerItem
            
            label="Logout"
            onPress={() => {
              // Add your logout logic here
            }}
            labelStyle={{
                marginLeft:-20,
                color:myColors.fontColor,
            }}
    
            icon={()=>(
                <Icon.LogOut width={iconSize} height={iconSize} color={myColors.fontColor}/>
            )}
          />
          {/* Add more custom buttons as needed */}
        </DrawerContentScrollView>
      )
};
  
const iconSize = 20
const drawerActiveColor = '#0288D1'

  return (
    
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen  name="Main" 
        component={MainScreen} 
        options={{ 
          headerShown: false , 
          drawerLabel:({focused})=>(<Text style={{marginLeft:-20, color: focused ? drawerActiveColor : myColors.fontColor}}  className="font-semibold">Translate</Text>) , 
          drawerIcon:({focused})=>(<Icon.Book width={iconSize} height={iconSize} color={focused ? drawerActiveColor : myColors.fontColor}/>),
          drawerActiveBackgroundColor:'transparent'
        }} />
        <Drawer.Screen  name="Language" 
        component={LanguageSelectionScreen} 
        options={{ 
          headerShown: false , 
          drawerLabel:({focused})=>(<Text style={{marginLeft:-20, color: focused ? drawerActiveColor : myColors.fontColor}}  className="font-semibold">Language</Text>) , 
          drawerIcon:({focused})=>(<Icon.Globe width={iconSize} height={iconSize} color={focused ? drawerActiveColor : myColors.fontColor}/>),
          drawerActiveBackgroundColor:'transparent'
        }} />

        {/* Add more screens as needed */}
    </Drawer.Navigator>
  )
}