import { View, Text, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function DefinedInfo({definedInfo}) {

    const [meanings, setMeanings] = useState(null)

    useEffect(() => {
        console.log("definedInfo: ");
        console.log(definedInfo);
        
      if(definedInfo.length > 0)
      {
        setMeanings(definedInfo[0].meanings)
        setMeanings(definedInfo[0].meanings)
        
      }
    }, [definedInfo])
    

  return (
    <View className="flex-row px-4 py-2 border-b-2 border-gray-300 items-center">
        <Text>
            {
                meanings && meanings[0].definitions[0].definition
            }
        </Text>
    </View>
  )
}