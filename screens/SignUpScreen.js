// screens/SignUpScreen.js
import React, { useState } from 'react';
import { View, TextInput,TouchableOpacity, Button, Text, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const handleSignUp = async () => {
  if (!email || !password) {
    Alert.alert('Error', 'Please enter both email and password.');
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    Alert.alert('Success', 'User account created!');
    navigation.navigate('Home');
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        style={styles.input}
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
  <Text style={styles.buttonText}>Sign Up</Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 80
  },button: {
  backgroundColor: 'blue',
  padding: 15,
  borderRadius: 5,
  alignItems: 'center',
},
buttonText: {
  color: 'white',
  fontWeight: 'bold',
},
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  }
});
