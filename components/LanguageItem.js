import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import * as Icon from 'react-native-feather'
import { myColors } from '../constants'


export default function LanguageItem({ifSelected}) {

    const itemSize = Dimensions.get('window').width * .38

  return (
    <TouchableOpacity style={{width:itemSize, height:itemSize * 1.2 , backgroundColor:myColors.paleColor}} className=" rounded-md p-4 my-4">
        <View className=" justify-end flex-row">
            {
                ifSelected && (
                    <Icon.CheckCircle width={22} height={22} color={myColors.fontColor} />
                )
            }
        </View>
        <View className=" w-full flex-1 justify-center items-center">
            <Text className="text-xl">中文</Text>
            <Text className="text-sm">Chinese</Text>
        </View>
    </TouchableOpacity>
  )
}