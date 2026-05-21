import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { api } from '../services/api';

type Category = {
  id_categoria: number;
  nombre: string;
  descripcion: string;
};

export default function CategoriesScreen() {
  const [categories, setCategories] = useState<Category[]>([]);

  const loadCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error cargando categorías:', error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorías</Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id_categoria.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.nombre}</Text>
            <Text style={styles.description}>{item.descripcion}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#111',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 12,
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
});