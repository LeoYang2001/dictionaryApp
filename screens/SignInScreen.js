import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function SignInScreen({navigation}) {

    const auth = getAuth();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = ()=>{
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            navigation.replace('Main')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            
        });
    }


  return (
    <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
    >
     <View className="flex-1">
     <Text
        className="text-2xl font-extrabold self-center m-4"
      >SignInScreen</Text>
      <View 
      className="p-5"
      >
      <View
        className="border justify-start items-center flex-row"
      >
      <TextInput
      value={email}
      style={{ fontSize: 20, borderWidth: 1, borderColor: 'gray', padding: 8 }}
      placeholder='Email'
      className="flex-1"
      onChangeText={text => setEmail(text)}
    />
      </View>
      <View
        className="border justify-start items-center flex-row mt-5"
      >
      <TextInput
      value={password}
      style={{ fontSize: 20, borderWidth: 1, borderColor: 'gray', padding: 8 }}
      placeholder='Password'
      secureTextEntry
      className="flex-1"
      onChangeText={text => setPassword(text)}
    />
      </View>
      </View>
      <TouchableOpacity
        onPress={handleLogin}
      >
        <Text
            className="text-xl self-center"
        >Login</Text>
      </TouchableOpacity>
        </View>
    </TouchableWithoutFeedback>
  )
}