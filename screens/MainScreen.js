import { View, Text, SafeAreaView, Image, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Icon from 'react-native-feather'
import { lang_library, myColors } from '../constants'
import { KeyboardAvoidingView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setLang } from '../slices/langSlice'
import { DrawerActions } from '@react-navigation/native'


export default function MainScreen({navigation}) {

    const [ifFocused, setIfFocused] = useState(false)
    const [word, setWord] = useState('')

    const handleSearchWord = ()=>{
        if(!word)   return
        else{
            const ifOneWord = word.trim().split(" ").length <= 1
            if(!ifOneWord)
            {
                alert('Sorry! Unbale to search multiple words at a time currently!')
                setWord('')
                return
            }
            
        navigation.navigate('Definition', { searchPrompt: word })
        setWord('')
        }
    }

    

  return (
    <SafeAreaView className='flex-1 bg-white'>
       <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
       >
             <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
       <View className="flex-1">
       <TouchableOpacity 
       onPress={()=>{
        Keyboard.dismiss()
        //open drawer
        navigation.dispatch(DrawerActions.openDrawer())
       }}
       className="mt-2 mx-6">
            <Icon.AlignLeft color={myColors.fontColor}/>
        </TouchableOpacity>
        <Image
        style={{height:'36%',width:"100%"}}
        resizeMode='contain'
        className="mt-0"
        source={require('../assets/images/dictionary.jpg')} />
        {
            !ifFocused && (
                <Text
            className="self-center text-3xl font-extrabold"
            style={{color:myColors.fontColor, fontFamily:"boldItalic"}}
        >
                Dictionary
        </Text>
            )
        }
        <View className='w-full text-center my-4'>
        <Text
            style={{fontFamily:"italic"}}

            className="self-center text-md text-gray-400 font-semibold"
        >
                Find definitions, 
        </Text>
        <Text
            style={{fontFamily:"italic"}}

        className="self-center text-md text-gray-400 font-semibold"
        >images, and more. </Text>
        </View>
        <View
            className="mt-2 mx-6 flex-row justify-start 
            items-center bg-gray-100 rounded-md px-4"
            style={ !ifFocused ? {} : {
                // Add shadow properties based on platform
                ...Platform.select({
                  ios: {
                    shadowColor: '#ccc',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.8,
                    shadowRadius: 4,
                  },
                  android: {
                    elevation: 4,
                  },
                }),
              }}
        >
            <TouchableOpacity
                onPress={()=>{
                    if(word)
                    {
                        handleSearchWord()
                    }
                }}
            >
                <Icon.Search  color={ifFocused ? myColors.fontColor : myColors.inActiveColor}/>
            </TouchableOpacity>
            <TextInput 
            value={word}
            onChangeText={text => setWord(text)}
            onSubmitEditing={handleSearchWord}
            onFocus={()=>{setIfFocused(true)}}
            onBlur={()=>{setIfFocused(false)}}
            style={{fontSize:20, color:myColors.fontColor}}
            className=" flex-1 h-full py-4 mx-2"
            placeholder='Search by word'
            autoCorrect
            />
            <TouchableOpacity>
            <Icon.Mic  color={myColors.inActiveColor}/>
            </TouchableOpacity>
        </View>

        
       </View>
       </KeyboardAvoidingView>
       </TouchableWithoutFeedback>
       <TouchableOpacity 
            style={{width:50, height:50}}
            className="bg-gray-100 rounded-md mt-auto self-center justify-center items-center"
        >
            <Icon.BookOpen color={'black' } fill={'white'} />
        </TouchableOpacity>
    </SafeAreaView>
  )
}