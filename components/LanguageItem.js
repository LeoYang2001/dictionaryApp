import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import * as Icon from 'react-native-feather'
import { lang_library_formatted, myColors } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import { setLang } from '../slices/langSlice'


export default function LanguageItem({ifSelected, langItem}) {
    
    const langInfo = lang_library_formatted[langItem]

    const dispatch = useDispatch()

    const itemSize = Dimensions.get('window').width * .38

  return (
    <TouchableOpacity 
    onPress={()=>{
        dispatch(setLang({newLang: langInfo?.lang }))
    }}
    style={{width:itemSize, height:itemSize * 1.2 , backgroundColor:myColors.paleColor}} className=" relative rounded-md p-4 my-4">
        <View className=" justify-end flex-row absolute right-4 top-4">
            {
                ifSelected && (
                    <Icon.CheckCircle width={22} height={22} color={myColors.fontColor} />
                )
            }
        </View>
        <View className=" w-full flex-1 justify-center items-center">
            <Text className="text-xl text-center">{langInfo?.lang}</Text>
            <Text className="text-sm">{langInfo?.translatedLang}</Text>
        </View>
    </TouchableOpacity>
  )
}