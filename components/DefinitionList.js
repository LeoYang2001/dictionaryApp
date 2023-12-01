import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { myColors } from '../constants'

export default function DefinitionList({meanings}) {

    
  return (
    <ScrollView
        className="flex-1 relative "
        style={{ overflow: 'visible' }}
    >
       {
        meanings?.map((meaningItem,index) => (
            <TouchableOpacity 
            key={index}
            style={{
                // Add shadow properties based on platform
                ...Platform.select({
                ios: {
                    shadowColor: '#ccc',
                    shadowOffset: { width: 2, height: 4 },
                    shadowOpacity: 0.8,
                    shadowRadius: 4,
                },
                android: {
                    elevation: 4,
                },
                }),
            }}
            activeOpacity={.6}
    
            className="flex-1 bg-gray-100 rounded-lg py-6 px-4 mx-6 mb-4">
                <Text
                    className="text-md font-semibold"
                    style={{color:"#E54768"}}
                >
                    {meaningItem.partOfSpeech}
                </Text>
                {
                    meaningItem.definitions?.map((definitionItem,index) => (
                        <>
                            <Text
                            key={`${index}-definitionItem`}
                            className="my-2 font-semibold"
                            style={{color:myColors.fontColor}}
                        >{index + 1}. {definitionItem.definition}</Text>
                            {
                                definitionItem.example && (
                                    <Text
                                    className="text-gray-400 mb-4"
                                    key={`${index}-${definitionItem.definition}--example`}
                                    >{definitionItem.example}</Text>
                                )
                            }
                        </>
                    ))
                }
            </TouchableOpacity>
        ))
       }

    
    </ScrollView>
  )
}