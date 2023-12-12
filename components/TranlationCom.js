import { View, Text, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import * as Icon from 'react-native-feather'
import { BlurView } from 'expo-blur';
import MyModal from './MyModal'
import { useSelector } from 'react-redux'
import { lang_library_formatted } from '../constants'


export default function TranlationCom({word}) {

    const [ifTranslate, setIfTranslate] = useState(false)
    const [translatedWord, setTranslatedWord] = useState('demo')
    const [modalVisible, setModalVisible] = useState(false);
    const [ifTranslating, setIfTranslating] = useState(false)

    const lang = useSelector(state => state.lang)
    const langInfo = lang_library_formatted[lang]
    
    

    useEffect(() => {
        setTranslatedWord('demo')
        setIfTranslate(false)
    }, [word])
    

    const handleConfirmAction = () => {
        // Perform the action to be confirmed
        // ...
        handleTranslate()
        // Close the modal after confirmation
        setModalVisible(false);
      };
    
      const handleCancelAction = () => {
        // Handle cancellation or cleanup
        setModalVisible(false);
      };

    const handleTranslate = async ()=>{
        const url =  `https://nlp-translation.p.rapidapi.com/v1/translate?text=${word}&to=${langInfo.apiEntry}&from=en`;
        
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '7f62298962mshf3e939361cfc4abp134d0ejsn8ecae533c726',
                'X-RapidAPI-Host': 'nlp-translation.p.rapidapi.com'
            }
        };

        try {
            setIfTranslating(true)
            const response = await fetch(url, options);
            const result = await response.json();
            if(result?.translated_text[langInfo.apiEntry])
            {
                setTranslatedWord(result?.translated_text[langInfo.apiEntry])
                setIfTranslate(true)
                setIfTranslating(false)
            }
            
        } catch (error) {
            console.error(error);
        }
    }


  return (
    <View className="justify-center flex-row justify-between px-5 py-4 ">
        <View className=" relative">
            <Text className="text-3xl text-white font-semibold">
                {translatedWord}
            </Text>
           
            {!ifTranslate && (
                <BlurView intensity={20}  className="absolute w-full h-full " >
                </BlurView>
            )}
        </View>
    <TouchableWithoutFeedback
        onPress={() => {
            console.log('Inner TouchableOpacity pressed');
            // Handle inner TouchableOpacity press
        }}
        >
            <LinearGradient 
                colors={['#BA4467', '#E54768']}
                start={{ x: 0, y: 0.5 }}  // Horizontal gradient from left to right
        end={{ x: 1, y: 0.5 }}
        className="flex-row rounded-lg px-2 py-2  justify-between items-center">
                <TouchableOpacity
                    onPress={()=>{
                        // handleTranslate
                        setModalVisible(true)
                    }}
                >
                   {
                    ifTranslating ? (
                        <View className="flex-row items-center justify-between">
                            <ActivityIndicator size="small" color="white" />
                            <Text className="text-lg text-white">Translating...</Text>
                        </View>
                    ):(
                        <Text className="text-lg text-white">
                        {lang}
                    </Text>
                    )
                   }
                </TouchableOpacity>
                {/* <Icon.ChevronDown color={'white'} height={26}/> */}
            </LinearGradient>
    </TouchableWithoutFeedback>
    <MyModal
        modalVisible={modalVisible}
        handleConfirm={handleConfirmAction}
        handleCancel={handleCancelAction}
      />
</View>
  )
}