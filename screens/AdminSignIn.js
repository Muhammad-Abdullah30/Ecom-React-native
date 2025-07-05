// screens/AdminSignIn.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
export default function AdminSignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate('AddCategory');
      })
      .catch((error) => {
        Alert.alert('Login Error', error.message);
      });
  };
  return (
    <View>
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Password" onChangeText={setPassword} secureTextEntry />
      <Button title="Login as Admin" onPress={handleLogin} />
    </View>
  );
}