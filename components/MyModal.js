// MyModal.js

import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur'; // Import the BlurView from expo-blur
import { myColors } from '../constants';

const MyModal = ({ modalVisible, handleConfirm, handleCancel }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleCancel}
    >
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={handleCancel}
      >
        <BlurView
          style={styles.blurContainer}
          intensity={30}
          tint="light"
        />
        <View style={{width:"100%"}}  >
          <View className="mx-10  flex-col px-5" style={styles.modalView}>
            <Text 
                style={{color:myColors.fontColor}}
                className="font-semibold text-lg my-2 text-center"
            >Are you sure you want to translate the word? </Text>
            {/* <Text
                style={{color:myColors.inActiveColor}}

                className="text-left"
            >it's recommended to comprehend a word by its definition rather than translating it.</Text> */}
            <View className="flex-row  w-full justify-between">
              <TouchableOpacity
              className=" items-center justify-center"
                onPress={handleConfirm}
              >
                <Text
                style={{color:myColors.inActiveColor}}

                className="font-semibold text-lg my-2 text-center"
                >Translate</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={handleCancel}
              >
                <Text 
                className="font-semibold text-lg my-2 text-center"
                >Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    margin: 10,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});

export default MyModal;
