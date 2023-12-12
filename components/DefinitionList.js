import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { myColors } from '../constants'
import MeaningItem from './MeaningItem'

export default function DefinitionList({meanings}) {

    
  return (
    <ScrollView
        className="flex-1 relative "
        style={{ overflow: 'visible' }}
    >
       {
        meanings?.map((meaningItem,index) => (
            <MeaningItem meaningItem={meaningItem} key={index} />
        ))
       }

    
    </ScrollView>
  )
}