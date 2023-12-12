import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { BlurView } from 'expo-blur';


export default function BluryMask() {

    let init_blurLevel = []

    for(let i=20;i>0;i--)
    {
        let curBlurLevel = i * 2;
        init_blurLevel.push(curBlurLevel)
    }
    
  return (
    <View className="h-8 z-30" style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
        {
            init_blurLevel.map((blurLevel,index)=>(
                <BlurView key={index} intensity={blurLevel}  style={{height:`${100/init_blurLevel.length}%`}} >
                </BlurView>
            ))
        }
  </View>
  )
}
