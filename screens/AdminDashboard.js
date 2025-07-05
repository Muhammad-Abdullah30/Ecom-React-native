import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AuthContext } from '../context/AuthContext';
import AddCategory from './AddCategory';
import AddSubCategory from './AddSubCategory';
import AddItems from './AddItem';

const Tab = createMaterialTopTabNavigator();
const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);  // <-- add logout here

  const handleLogout = () => {
    logout(); // clear user
    navigation.navigate('Home'); // navigate to SignIn screen
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.categoryButtons} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log out</Text>
      </TouchableOpacity>

      <Text style={styles.header}>{user?.email || 'Admin'} Dashboard</Text>
     
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
          tabBarStyle: { backgroundColor: '#e6f2ff' },
          tabBarIndicatorStyle: { backgroundColor: '#0066cc' },
        }}
      >
        <Tab.Screen name="AddCategory" component={AddCategory} options={{ tabBarLabel: 'Add Category' }} />
        <Tab.Screen name="AddSubCategory" component={AddSubCategory} options={{ tabBarLabel: 'Add SubCategory' }} />
        <Tab.Screen name="AddItems" component={AddItems} options={{ tabBarLabel: 'Add Items' }} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#e6f2ff',
  },
  categoryButtons: {
     paddingHorizontal: 15,
  paddingVertical: 8,
  backgroundColor: '#cc0000',  
  borderRadius: 5,
  alignSelf: 'flex-end',
  margin: 10,
  },
  categoryButtonText: { color: '#333',
    gap:10,
   },
  header: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
    paddingTop: 20,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
});

export default AdminDashboard;