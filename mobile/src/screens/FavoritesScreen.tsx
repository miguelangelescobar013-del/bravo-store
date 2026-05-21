import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Product } from '../types/product';

type Props = {
  favorites: Product[];
};

export default function FavoritesScreen({ favorites }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id_producto.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.nombre}</Text>
            <Text style={styles.description}>{item.descripcion}</Text>
            <Text style={styles.price}>${item.precio}</Text>
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
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
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
    marginTop: 8,
    fontWeight: 'bold',
  },
});