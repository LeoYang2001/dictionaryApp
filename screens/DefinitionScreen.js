import { View, Text, TouchableWithoutFeedback, SafeAreaView, Dimensions, TouchableOpacity, TextInput, Keyboard, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Icon from 'react-native-feather'
import { myColors } from '../constants';
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import DefinitionList from '../components/DefinitionList';
import {Audio} from 'expo-av'
import VolumePlay from '../components/VolumePlay';
import TranlationCom from '../components/TranlationCom';
import ImagesList from '../components/ImagesList';
import BluryMask from '../components/BluryMask';
import VideoCom from '../components/VideoCom';





export default function DefinitionScreen({route, navigation}) {
    const searchPrompt = route.params?.searchPrompt
    
    const [ifFocused, setIfFocused] = useState(false)    
    const [word, setWord] = useState('')
    const [ifExpended, setIfExpended] = useState(false)
    const [selectionId, setSelectionId] = useState(1)
    const [searchResult, setSearchResult] = useState(null)
    const [ifAudio, setIfAudio] = useState(true)
    const [ifLoadingAudio, setIfLoadingAudio] = useState(false)
    const [currentWord, setCurrentWord] = useState('')

    const [images, setImages] = useState([]);
    const [numColumns, setNumColumns] = useState(2);

    const [videoUrl, setVideoUrl] = useState([])
    const [videoUrlIndex, setVideoUrlIndex] = useState(0)

    const saveVideoUrl = (url) => {
        setVideoUrl(url)
    }

    const refreshVideoIndex = ()=>{
        if(videoUrlIndex >= 9)  setVideoUrlIndex(0)
        else    setVideoUrlIndex(preIndex => preIndex + 1)
    }

    useEffect(() => {
        setSelectionId(1)
      const screenWidth = Dimensions.get('window').width;
      const calculatedColumns = Math.floor(screenWidth / 200);
      setVideoUrl([])
      setNumColumns(calculatedColumns || 2);
      // Change the key to force a re-render when numColumns changes
  
      // Fetch images only if the word prop changes
      if (currentWord) {
        getImages();
      }
    }, [currentWord]);


    const getImages = async () => {
       
        
    const url = 'https://google-api31.p.rapidapi.com/imagesearch';
    const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '7f62298962mshf3e939361cfc4abp134d0ejsn8ecae533c726',
          'X-RapidAPI-Host': 'google-api31.p.rapidapi.com',
        },
        body: JSON.stringify({
          text: currentWord,
          safesearch: 'off',
          region: 'wt-wt',
          color: '',
          size: '',
          type_image: '',
          layout: '',
          max_results: 20,
        }),
      };
  
      try {
        console.log('getting images...');
        
        const response = await fetch(url, options);
        const result = await response.json();
  
        if (response.ok) {
          setImages(result.result);
        } else {
          console.error('Request failed with status:', response.status);
          console.error('Error details:', result);
        }
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      handleSearchWord(searchPrompt)
    }, [searchPrompt])
    
    const playAudio = async () => {
        if(!searchResult)   return
        const sound = new Audio.Sound();
            try {
                console.log('sound playing');

                setIfLoadingAudio(true)
                await sound.loadAsync({ uri: searchResult.audioUrl });
                await sound.playAsync();
                
                // Your sound is playing!
            
            // Don't forget to unload the sound from memory
            // when you are done using the Sound object

            setTimeout(async ()=>{
                await sound.unloadAsync();
                console.log('sound playing stopped');
                setIfLoadingAudio(false)
            },1500)
            } catch (error) {
            // An error occurred!
            alert("audio not found")
            setIfLoadingAudio(false)
            console.log(error);
            
            }
      };

    const handleSearchWord =async (searchPrompt)=>{
        if(!searchPrompt)   return
        const ifOneWord = searchPrompt.trim().split(" ").length <= 1
        if(!ifOneWord)
        {
            alert('Sorry! Unbale to search multiple words currently!')
            return
        }
        
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchPrompt}`);
            
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // reset images 
            setImages([])
            
            const [data] = await response.json();
            
            if(data)
            {
               
                //set Audio
                let audio = null;
                if(data.phonetics && data.phonetics.length > 0){
                    data.phonetics.map(phoneticItem => {
                        if(phoneticItem.audio)
                        {
                            audio=phoneticItem
                        }
                    })

                }
                setCurrentWord(searchPrompt)
                setSearchResult({
                    word:data.word,
                    phonetic:data.phonetic,
                    meanings:data.meanings,
                    audioUrl:audio?.audio
                })
                setWord('')
            }

            
            
            // Further processing of data if needed
          } catch (error) {
                console.log('Error fetching data:', error.status);
                if (error.message.includes('404')) {
                    alert('Not found!');
                    navigation.goBack()
                }
          }
    }
    
    
    const boxStyle = useAnimatedStyle(()=>{
        const height = withTiming(
            ifExpended ? 230 : 130
        )
        return {height}
    })

  return (
    <TouchableWithoutFeedback
        className="flex-1"
        onPress={Keyboard.dismiss}
    >
        <SafeAreaView className="flex-1 bg-white">
               {/* header search box goes here  */}
                <View className="mx-6 mt-2 flex-row justify-start items-center">
                        <TouchableOpacity
                        onPress={()=>{navigation.goBack()}}
                        style={{marginLeft:-10}}>
                            <Icon.ChevronLeft width={30} height={30} color={myColors.fontColor} />
                        </TouchableOpacity>
                            <View
                            className=" mx-2 flex-row flex-1 justify-start 
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
                                <Icon.Search  width={20} height={20} color={ifFocused ? myColors.fontColor : myColors.inActiveColor}/>
                            </TouchableOpacity>
                            <TextInput 
                            value={word}
                            onChangeText={text => setWord(text)}
                            onSubmitEditing={()=>{handleSearchWord(word)}}
                            onFocus={()=>{setIfFocused(true)}}
                            onBlur={()=>{setIfFocused(false)}}
                            style={{fontSize:16, color:myColors.fontColor}}
                            className=" flex-1 h-full py-3 mx-2"
                            placeholder='Search by word'
                            autoCorrect
                            clearButtonMode='while-editing'
                            />
                            <TouchableOpacity
                            >
                            <Icon.Mic width={20} height={20} color={myColors.inActiveColor}/>
                            </TouchableOpacity>
                        </View>
                </View>
                {/* word badge goes here  */}
                <Animated.View style={[boxStyle]} className=" mx-6 mt-6">
                    <TouchableOpacity  activeOpacity={.9} className="flex-1" onPress={()=>{
                        setIfExpended(!ifExpended)
                    }}>
                        <View style={[{height:'100%'},ifExpended && {
                                // Add shadow properties based on platform
                                ...Platform.select({
                                ios: {
                                    shadowColor: '#000',
                                    shadowOffset: { width: 2, height: 24},
                                    shadowOpacity: 0.25,
                                    shadowRadius: 8,
                                },
                                android: {
                                    elevation: 4,
                                },
                                }),
                            }]} className=" w-full">
                        <LinearGradient 
                            colors={['#181D5F', '#0F123D']}
                            start={{ x: 0, y: 0.5 }}  // Horizontal gradient from left to right
                    end={{ x: 1, y: 0.5 }}
                            className="w-full h-full rounded-lg  ">
                                <View style={{height:130}} className=" justify-between flex-col px-5 py-4 ">
                                    <View style={{height:'60%'}} className="flex-row justify-between items-center">
                                        <Text className="text-3xl text-white font-semibold">
                                            {searchResult?.word }
                                        </Text>
                                        <LinearGradient 
                                            colors={['#BA4467', '#E54768']}
                                            start={{ x: 0, y: 0.5 }}  // Horizontal gradient from left to right
                                            end={{ x: 1, y: 0.5 }}
                                            style={{width:40,height:40}}
                                                    className=" justify-center items-center rounded-lg ">
                                                    {
                                                        !ifLoadingAudio ? ( 
                                                        <TouchableOpacity
                                                         onPress={playAudio}
                                                        className="rounded-lg  h-full w-full px-2 py-1 justify-center items-center">
                                                            <Icon.Volume1 className="ml-1 my-1" color={"white"} fill={'white'} width={26} height={26}/>
                                                        </TouchableOpacity>
                                                        )
                                                        :(
                                                            // <Icon.VolumeX className="ml-1 my-1" color={"white"} fill={'white'} width={26} height={26}/>
                                                            <VolumePlay/>
                                                        )
                                                    }
                                                    </LinearGradient>
                                    </View>
                                    <View className='flex-1 justify-center'>
                                        <Text className="text-md  text-gray-300 font-normal">
                                        {searchResult? searchResult.phonetic : ''}
                                        </Text>
                                    </View>
                                </View>
                                <TranlationCom word={currentWord}/>
                            </LinearGradient>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
                <View  style={{ overflow: 'hidden' }} className="flex-1 mt-8">
                {/* options list : Definition, Images  */}
                    <View className=" relative z-30">
                        {/* <View  className="absolute  w-full h-full">
                            <BlurView intensity={40}  className="absolute w-full h-full ">
                            </BlurView>
                        </View> */}
                        <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={
                            {
                                justifyContent:'space-between',
                                alignItems:'center',
                                flexDirection:'row',                        
                            }}
                        className=" pl-6">
                            <TouchableOpacity
                                activeOpacity={.7}
                                onPress={()=>{setSelectionId(1)}}
                                className="py-2"

                            >
                                <Text
                                    style={selectionId !== 1 && {color:myColors.inActiveColor}}
                                    className="text-2xl font-bold"
                                >
                                    Definition
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="ml-14 py-2"
                                onPress={()=>{setSelectionId(2)}}
                                activeOpacity={.7}

                            >
                                <Text
                                    style={selectionId !== 2 && {color:myColors.inActiveColor}}
                                    className="text-2xl font-bold"
                                >
                                    Images
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="ml-14 mr-14  py-2"
                                onPress={()=>{setSelectionId(3)}}
                                activeOpacity={.7}

                            >
                                <Text
                                    style={selectionId !== 3 && {color:myColors.inActiveColor}}
                                    className="text-2xl font-bold"
                                >
                                    Videos
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
                       
                    </View>
                    
                {/* display definition or images here  */}
                <View style={{ overflow: 'hidden' }} className="flex-1 mb-2 ">
                        <BluryMask/>
                        {/* display definition list here  */}
                        {
                              selectionId === 1 && (
                                <DefinitionList  meanings={searchResult? searchResult.meanings : null}/>
                              )
                        }
                         {/* display Images list here  */}
                         {
                              selectionId === 2 && (
                                <ImagesList numColumns={numColumns} images={images} />
                              )
                        }
                        {/* display video list here  */}
                        {
                              selectionId === 3 && (
                                    <VideoCom currentUrl={videoUrl} videoUrlIndex={videoUrlIndex} refreshVideoIndex={refreshVideoIndex} saveVideoUrl={saveVideoUrl} word={currentWord}/>
                                )
                        }
                </View> 
                </View>
                
        </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}