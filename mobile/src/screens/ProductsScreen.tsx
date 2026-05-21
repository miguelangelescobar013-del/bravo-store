import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';

import { api } from '../services/api';
import { Product } from '../types/product';

type Props = {
  onAddToCart: (product: Product) => void;
  onAddToFavorites: (product: Product) => void;
};

export default function ProductsScreen({
  onAddToCart,
  onAddToFavorites,
}: Props) {
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error cargando productos:', error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Productos</Text>
      <Text style={styles.subtitle}>Explora nuestro catálogo</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id_producto.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imageText}>BRAVO</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.name}>{item.nombre}</Text>
              <Text style={styles.description}>{item.descripcion}</Text>

              <View style={styles.row}>
                <Text style={styles.price}>
                  ${item.precio.toLocaleString('es-CO')}
                </Text>

                <Text style={styles.stock}>
                  Stock {item.stock}
                </Text>
              </View>

              <View style={styles.actions}>
                <Pressable
                  style={styles.cartButton}
                  onPress={() => onAddToCart(item)}
                >
                  <Text style={styles.cartText}>Agregar al carrito</Text>
                </Pressable>

                <Pressable
                  style={styles.favoriteButton}
                  onPress={() => onAddToFavorites(item)}
                >
                  <Text style={styles.favoriteText}>⭐</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#aaa',
    fontSize: 15,
    marginTop: 4,
    marginBottom: 20,
  },
  list: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#1f1f1f',
    borderRadius: 22,
    marginBottom: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2c2c2c',
  },
  imagePlaceholder: {
    height: 180,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    color: '#444',
    fontSize: 42,
    fontWeight: 'bold',
    letterSpacing: 3,
  },
  info: {
    padding: 18,
  },
  name: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  description: {
    color: '#aaa',
    marginTop: 6,
    lineHeight: 20,
  },
  row: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    color: '#00ff99',
    fontSize: 20,
    fontWeight: 'bold',
  },
  stock: {
    color: '#bbb',
    fontSize: 13,
  },
  actions: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 10,
  },
  cartButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
  },
  cartText: {
    color: '#111',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  favoriteButton: {
    width: 52,
    backgroundColor: '#333',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteText: {
    fontSize: 18,
  },
});