import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Dimensions, ActivityIndicator } from 'react-native';

export default function ImagesList({ images,numColumns }) {
 

  const renderItem = ({ item }) => (
    <TouchableOpacity className="mx-6 my-1" style={{ flex: 1, flexDirection: 'row' }}>
      <Image source={{ uri: item.image }} style={{ flex: 1, aspectRatio: 1.5}} />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 , overflow:'visible'}}>
      {/* <TouchableOpacity onPress={getImages} style={{ padding: 10 }}>
        <Text>Get Images</Text>
      </TouchableOpacity> */}

      {
        images?.length > 0 ? (
          <FlatList
          style={{ overflow:'visible'}}
            key={JSON.stringify(renderItem)}
            data={images}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={numColumns}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#E54768" />
          </View>
        )
      }
    </View>
  );
}
