import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, SafeAreaView ,Image} from 'react-native'
import React, { useState, useEffect } from 'react'
import { getAuth, signInWithEmailAndPassword ,onAuthStateChanged} from "firebase/auth";
import * as Icon from 'react-native-feather'
import { myColors } from '../constants';


export default function SignInScreen({navigation}) {

    const auth = getAuth();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        navigation.replace('Drawer')
        // You can navigate to the next screen or perform other actions as needed
      } else {
        // User is signed out
        console.log('User is signed out');
        // Allow the user to log in or perform other actions as needed
      }
    });

    // Cleanup the subscription when the component is unmounted
    return () => unsubscribe();
    
  }, [])

    const handleLogin = ()=>{
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            navigation.replace('Drawer')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            
        });
    }

    const handleRegister = () => {
      navigation.navigate('SignUp')
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
      >Welcome !</Text>
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
      </View>
      <TouchableOpacity
        onPress={handleLogin}
        style={{backgroundColor:'#F9CB51'}}
        className=' m-5 py-3 rounded-md'
      >
        <Text
            className="text-xl self-center text-black"
        >Login</Text>
      </TouchableOpacity>
      <View className="flex w-full p-5 justify-center flex-row items-center gap-1"> 
        <Text style={{color:myColors.fontColor}}>You don't have an account yet? </Text>
        <TouchableOpacity onPress={handleRegister}>
          <Text  style={{color:"#F9CB51"}}>Sign Up</Text>
        </TouchableOpacity>
      </View>
        </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}