import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, SafeAreaView ,Image} from 'react-native'
import React, { useState, useEffect } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import * as Icon from 'react-native-feather'
import { myColors } from '../constants';


export default function SignUpScreen({navigation}) {

    const auth = getAuth();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cfmpassword, setCfmPassword] = useState('')


 

    const hanldeSignUp = ()=>{
        if(password !== cfmpassword) return alert('Please make sure the passwords match.')

        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // ...
            alert('successfully registered!')
            navigation.goBack()
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
    }


  return (
    <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
    >
     <SafeAreaView className="flex-1 bg-white">

     <Image
     className="my-5"
          source={require('../assets/dictionary.gif')} // Replace with the actual path to your GIF image
          style={{ width: '100%', height: 140, resizeMode: 'contain', alignSelf: 'center' }}
        />
     <Text
        className="text-3xl font-bold self-center m-4"
      >Sign Up !</Text>
      <View 
      className="p-5  flex flex-col gap-5"
      >
      <View
        className=" rounded-md   justify-start items-center flex-row bg-gray-100"
      >
        <Icon.Mail className="mx-4" color={myColors.fontColor}/>
      <TextInput
      value={email}
      style={{ fontSize: 18, color: myColors.fontColor}}
      placeholder='Email'
      className="flex-1 px-2 py-4"
      onChangeText={text => setEmail(text)}
    />
      </View>
      <View
        className=" rounded-md   justify-start items-center flex-row bg-gray-100"
      >
        <Icon.Lock className="mx-4" color={myColors.fontColor}/>
      <TextInput
      value={password}
      secureTextEntry
      style={{ fontSize: 18, color: myColors.fontColor}}
      placeholder='password'
      className="flex-1 px-2 py-4"
      onChangeText={text => setPassword(text)}
    />
      </View>
      <View
        className=" rounded-md   justify-start items-center flex-row bg-gray-100"
      >
        <Icon.Lock className="mx-4" color={myColors.fontColor}/>
      <TextInput
      value={cfmpassword}
      secureTextEntry
      style={{ fontSize: 18, color: myColors.fontColor}}
      placeholder='confirm password'
      className="flex-1 px-2 py-4"
      onChangeText={text => setCfmPassword(text)}
    />
      </View>
      </View>
      <TouchableOpacity
        onPress={hanldeSignUp}
        style={{backgroundColor:'#F9CB51'}}
        className=' m-5 py-3 rounded-md'
      >
        <Text
            className="text-xl self-center text-black"
        >Register</Text>
      </TouchableOpacity>
      <View className="flex w-full p-5 justify-center flex-row items-center gap-1"> 
        <Text style={{color:myColors.fontColor}}>You already have an account? </Text>
        <TouchableOpacity onPress={()=>{navigation.goBack()}}>
          <Text  style={{color:"#F9CB51"}}>Sign In</Text>
        </TouchableOpacity>
      </View>
        </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}