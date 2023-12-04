import { View, Text, Button, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import * as Icon from 'react-native-feather'
import { myColors } from '../constants'
import LanguageItem from '../components/LanguageItem'
import { DrawerActions } from '@react-navigation/native'


export default function LanguageSelectionScreen({navigation}) {
  return (
    <SafeAreaView className=" flex-1" >
      <TouchableOpacity
      onPress={()=>{
        navigation.dispatch(DrawerActions.openDrawer())
      }}
      className=" mx-6">
        <Icon.ArrowLeft width={28} height={28} color={myColors.fontColor} />
      </TouchableOpacity>
      <View className=" my-4 mx-6">
        <Text
          className="text-xl"
        >Choose your language</Text>
      </View>
      <View className=" flex-1 mx-6"> 
        <ScrollView>
          <View className="flex-1 flex-row  justify-between px-2">
          <LanguageItem ifSelected={true}/>
          <LanguageItem  ifSelected={false}/>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}