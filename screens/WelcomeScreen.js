import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function WelcomeScreen({navigation}) {
  return (
    <View className="flex-1 items-center justify-center">
      <TouchableOpacity
        onPress={()=>{
            navigation.replace('SignIn')
        }}
      >
        <Text>
            Go to home
        </Text>
      </TouchableOpacity>
    </View>
  )
}