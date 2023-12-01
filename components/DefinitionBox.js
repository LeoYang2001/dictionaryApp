import { View,Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'
import * as Icon from 'react-native-feather'
import { LinearGradient } from 'expo-linear-gradient'

import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


export default function DefinitionBox() {
    const [ifExpended, setIfExpended] = useState(false)
    
    const boxStyle = useAnimatedStyle(()=>{
        const height = withTiming(
            ifExpended ? 300 : 130
        )
        return {height}
    })

  return (
    <TouchableOpacity  activeOpacity={.9} className="flex-1" onPress={()=>{
        setIfExpended(!ifExpended)
        toggleDefBoxHeight(ifExpended)
    }}>
        <Animated.View style={[boxStyle]} className=" w-full">
        <LinearGradient 
            colors={['#181D5F', '#0F123D']}
            start={{ x: 0, y: 0.5 }}  // Horizontal gradient from left to right
      end={{ x: 1, y: 0.5 }}
            className="w-full h-full rounded-lg  ">
                <View style={{height:130}} className=" justify-between flex-col px-5 py-4 ">
                <View style={{height:'60%'}} className="flex-row justify-between items-center">
                    <Text className="text-2xl text-white font-semibold">
                        infatuate
                    </Text>
                    <TouchableOpacity>
                       <LinearGradient 
                        colors={['#BA4467', '#E54768']}
                        start={{ x: 0, y: 0.5 }}  // Horizontal gradient from left to right
      end={{ x: 1, y: 0.5 }}
                       className=" justify-center items-center rounded-lg">
                       <Icon.Volume1 className="ml-1 my-1" color={"white"} fill={'white'} width={30} height={26}/>
                       </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View className='flex-1 justify-center'>
                    <Text className="text-md  text-gray-300 font-normal">
                        {'/ɪnˈfætju(w)ət/'}
                    </Text>
                </View>
                </View>
            </LinearGradient>
        </Animated.View>
    </TouchableOpacity>

  )
}