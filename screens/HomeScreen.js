import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../firebase';
import ProductItem from '../components/ProductItem';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Men's");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!initialLoad) return;

      try {
        const q = query(collection(db, "Categories"));
        const querySnapshot = await getDocs(q);
        const cats = [];
        querySnapshot.forEach((doc) => {
          cats.push({
            id: doc.id,
            name: doc.data().CatName
          });
        });
        setCategories(cats);

        if (cats.length > 0) {
          const mensCategory = cats.find(c => c.name === "Men's");
          if (mensCategory) {
            await fetchProductsForCategory(mensCategory.id);
            setSelectedCategory(mensCategory.name);
          }
        }
      } catch (err) {
        setError('Failed to load categories');
        console.error(err);
      } finally {
        setInitialLoad(false);
        setLoading(false);
      }
    };

    fetchCategories();
  }, [initialLoad]);

  const fetchProductsForCategory = async (categoryId) => {
    if (!categoryId) return;

    try {
      setLoading(true);
      const itemsQuery = query(
        collection(db, "Items"),
        where("categoryId", "==", categoryId)
      );
      const itemsSnapshot = await getDocs(itemsQuery);

      const items = [];
      itemsSnapshot.forEach((doc) => {
        items.push({
          id: doc.id,
          ...doc.data()
        });
      });

      setProducts(items);
      setError(null);
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.name);
    fetchProductsForCategory(category.id);
  };

  const renderItem = ({ item }) => (
    <ProductItem
      product={item}
      onPress={() => navigation.navigate('Details', { productId: item.id })}
    />
  );

  if (loading && initialLoad) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <Button
          title="Retry"
          onPress={() => {
            setInitialLoad(true);
            setError(null);
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <Button title="Sign In" onPress={() => navigation.navigate('SignIn')} />
        <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
        <Button title="Admin" onPress={() => navigation.navigate('SignIn', { isAdmin: true })} />
      </View>

      <View style={styles.categoryContainer}>
        <Text style={styles.sectionTitle}>Categories:</Text>
        <View style={styles.categoryButtons}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.name && styles.selectedCategoryButton
              ]}
              onPress={() => handleCategorySelect(category)}
            >
              <Text style={[
                styles.categoryButtonText,
                selectedCategory === category.name && styles.selectedCategoryButtonText
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={styles.categoryTitle}>
        {selectedCategory} ({products.length} items)
      </Text>

      {loading ? (
        <ActivityIndicator size="small" />
      ) : products.length > 0 ? (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      ) : (
        <View style={styles.centered}>
          <Text>No products found in this category</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 2, backgroundColor: '#fff' },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    gap: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: { color: 'red', marginBottom: 20 },
  categoryContainer: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  categoryButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
  },
  selectedCategoryButton: { backgroundColor: '#0066cc' },
  categoryButtonText: { color: '#333' },
  selectedCategoryButtonText: { color: '#fff' },
  categoryTitle: { fontSize: 20, fontWeight: 'bold', padding: 10 },
  /*
const styles = StyleSheet.create({
  
 
 

  
  
  
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
  },
  selectedCategoryButton: {
    backgroundColor: '#0066cc',
  },
  
}); */
});

export default HomeScreen;
