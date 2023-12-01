import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useRef, useState } from 'react'
import YoutubePlayer from 'react-native-youtube-iframe'
import * as Icon from 'react-native-feather'
import { LinearGradient } from 'expo-linear-gradient'


export default function VideoCom({word, saveVideoUrl, currentUrl}) {

    const [videoUrl, setVideoUrl] = useState(currentUrl)
    const [isLoading, setIsLoading] = useState(false)
    
    const extractVideoId = (url) => {
        const match = url.match(/[?&]v=([^?&]+)/);
        return match && match[1];
      };

    const fetchVideo = async ()=>{
        const url = 'https://google-api31.p.rapidapi.com/videosearch';
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '7f62298962mshf3e939361cfc4abp134d0ejsn8ecae533c726',
                'X-RapidAPI-Host': 'google-api31.p.rapidapi.com'
            },
            body: JSON.stringify({
                text: `${word} meaning SDictionary`,
                safesearch: 'off',
                timelimit: '',
                duration: '',
                resolution: '',
                region: 'wt-wt',
                max_results: 4
            })
        };

        try {
            setIsLoading(true)
            const response = await fetch(url, options);
            const {result} = await response.json();
            

            if ( result?.length > 0) {
                const videoUrl = result[0].content
                setIsLoading(false)
                setVideoUrl(videoUrl)
                saveVideoUrl(videoUrl)
            } else {
                console.error('No video found.');
            }
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <View className="mx-6 flex-1 justify-between">
       
      {
        videoUrl ? (
            <View className=" justify-center  rounded-xl bg-black" style={{ overflow: 'hidden' }}>
            <YoutubePlayer
                height={192}
                play={true}
                videoId={extractVideoId(videoUrl)}
            />
            </View>
        ) : (
            <View style={{height:192}}  className="border  rounded-xl justify-center bg-black" >
                <TouchableOpacity
                className="self-center flex-row justify-between items-center  p-2  "
                    onPress={fetchVideo}
                >
                    <LinearGradient 
                        colors={['#BA4467', '#E54768']}
                        start={{ x: 0, y: 0.5 }}  // Horizontal gradient from left to right
                        end={{ x: 1, y: 0.5 }}
                        className="flex-row justify-center items-center rounded-lg px-4 py-2">
                                {
                                    isLoading ? (
                                        <>
                                            <ActivityIndicator size={'small'} color={'white'} />
                                            <Text
                                                className="text-white ml-1"
                                            >Searching...</Text>
                                        </> 
                                    ) : (
                                        <>
                                                <Icon.Search color={"white"} width={22} height={22}/>
                                                <Text
                                                    className="text-white ml-1"
                                                >Search</Text>
                                        </>
                                    )
                                }
                                </LinearGradient>
                </TouchableOpacity>
            </View>
        )
      }
       
    </View>
  )
}

