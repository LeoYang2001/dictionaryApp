import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import DefinedInfo from '../components/DefinedInfo'

export default function HomeScreen({navigation}) {

    const [word, setWord] = useState("")
    const [definedInfo, setDefinedInfo] = useState([])
    
    const handleDefine = async ()=>{
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        const data = await res.json(); // Parse the JSON data
        setDefinedInfo(data)
    }

  return (
    <TouchableWithoutFeedback
    onPress={Keyboard.dismiss}
    >
        <View className="flex-1 bg-white">
        {/* Header goes here where you could change language  */}
        <View className="w-full py-2 justify-between flex-row border-b-2 border-gray-300">
            <TouchableOpacity
            onPress={()=>{
            }}
            className="flex-1  justify-center items-center">
                <Text className="text-lg">
                    English
                </Text>
            </TouchableOpacity>
            <View className="w-10 justify-center items-center">
                <Text>{'>'}</Text>
            </View>
            <TouchableOpacity className="flex-1  justify-center items-center">
                <Text className="text-lg">
                    {word}
                </Text>
            </TouchableOpacity>
        </View>
        {/* text that needs to be defined */}
        <View className="flex-row px-4 py-2 border-b-2 border-gray-300 items-center">
            <TextInput 
            multiline
            placeholder='Enter text'
            className="flex-1 h-36"
            value={word}
            onChangeText={text => setWord(text)}
            />
            <View>
            <TouchableOpacity
                className="bg-black rounded-full p-2"
                onPress={handleDefine}
            >
                <Text
                    className="text-white"
                >Define</Text>
            </TouchableOpacity>
            </View>
        </View>
        {/* texts after defined  */}
       <DefinedInfo definedInfo={definedInfo} />
        </View>
    </TouchableWithoutFeedback>
  )
}