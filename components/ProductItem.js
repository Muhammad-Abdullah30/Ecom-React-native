import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ProductItem = ({ product, onPress,onDelete }) => (
  <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
    {product.image && (
      <Image source={{ uri: product.image }} style={styles.image} />
    )}
    <View style={styles.info}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>Rs{product.price}</Text>
      {onDelete && (
        <Button title="Delete" color="red" onPress={() => onDelete(product.id)} />
      )}
    </View>

  </TouchableOpacity>
);

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'cover',
    borderRadius: 5,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    marginTop: 4,
    fontSize: 14,
    color: 'green',
  },
});

export default ProductItem;
