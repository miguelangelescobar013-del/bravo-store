import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Product } from '../types/product';

type Props = {
  favorites: Product[];
  onRemoveFromFavorites: (productId: number) => void;
};

export default function FavoritesScreen({
  favorites,
  onRemoveFromFavorites,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      <Text style={styles.subtitle}>Productos que guardaste</Text>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id_producto.toString()}
        ListEmptyComponent={
          <Text style={styles.empty}>Aún no tienes productos favoritos</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.productImage}>
              <Text style={styles.productEmoji}>⭐</Text>
              <Text style={styles.imageBrand}>BRAVO</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.name}>{item.nombre}</Text>
              <Text style={styles.description}>{item.descripcion}</Text>
              <Text style={styles.price}>
                ${item.precio.toLocaleString('es-CO')}
              </Text>

              <Pressable
                style={styles.removeButton}
                onPress={() => onRemoveFromFavorites(item.id_producto)}
              >
                <Text style={styles.removeText}>Quitar de favoritos</Text>
              </Pressable>
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
    marginTop: 4,
    marginBottom: 20,
  },

  empty: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },

  card: {
    backgroundColor: '#1f1f1f',
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2b2b2b',
  },

  productImage: {
    height: 120,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
  },

  productEmoji: {
    fontSize: 46,
  },

  imageBrand: {
    color: '#555',
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginTop: 4,
  },

  info: {
    padding: 16,
  },

  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  description: {
    color: '#aaa',
    marginTop: 6,
  },

  price: {
    color: '#00ff99',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },

  removeButton: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 14,
    marginTop: 14,
  },

  removeText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});