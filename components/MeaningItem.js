import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { myColors } from '../constants'

export default function MeaningItem({meaningItem}) {
  return (
    <TouchableOpacity 
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
                        <View 
                            key={index}
                        >
                            <Text
                            className="my-2 font-semibold"
                            style={{color:myColors.fontColor}}
                        >{index + 1}. {definitionItem.definition}</Text>
                            {
                                definitionItem.example && (
                                    <Text

                                    className="text-gray-400 mb-4"
                                    >{definitionItem.example}</Text>
                                )
                            }
                        </View>
                    ))
                }
            </TouchableOpacity>
  )
}