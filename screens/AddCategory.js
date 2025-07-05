import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { collection, addDoc, serverTimestamp, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';

export default function AddCategory({ navigation }) {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const snapshot = await getDocs(collection(db, "Categories"));
      const fetchedCategories = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCategories(fetchedCategories);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch categories.');
    }
  };

  const handleAdd = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Category name cannot be empty');
      return;
    }

    setIsLoading(true);

    try {
      const docRef = await addDoc(collection(db, "Categories"), {
        CatName: name.trim(),
        createdAt: serverTimestamp(),
        createdBy: user?.uid || "anonymous",
      });

      alert('Success', 'Category added!');
      setName('');
      fetchCategories(); // Refresh after adding
    } catch (error) {
      Alert.alert('Error', `Failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async(id) => {
    console.log('Attempting to delete category with id:', id);
    try {
              await deleteDoc(doc(db, "Categories", id));
              console.log('Deleted category:', id);
              fetchCategories();
              Alert.alert('Deleted', 'Category deleted successfully');
            } catch (error) {
              console.log('Delete error:', error);
              Alert.alert('Error', `Failed to delete: ${error.message}`);
            }
  };

  const renderCategoryItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text>{item.CatName}</Text>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.userInfo}>Signed in as: {user?.email}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter category name"
        value={name}
        onChangeText={setName}
        maxLength={50}
        editable={!isLoading}
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button 
          title="Add Category" 
          onPress={handleAdd} 
          disabled={!name.trim() || isLoading}
        />
      )}

      <Text style={styles.sectionTitle}>Existing Categories:</Text>
      <FlatList
        data={categories}
        keyExtractor={item => item.id}
        renderItem={renderCategoryItem}
        ListEmptyComponent={<Text>No categories found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userInfo: {
    marginBottom: 20,
    fontSize: 16,
    color: '#666',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  sectionTitle: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  deleteText: {
    color: 'red',
    fontWeight: 'bold',
  },
});
