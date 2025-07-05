import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import AdminDashboard from './screens/AdminDashboard'; // New screen
import { AuthProvider } from './context/AuthContext';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>    
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Products' }} />
          <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Product Details' }} />
          <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign In' }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ title: 'Admin Dashboard' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}