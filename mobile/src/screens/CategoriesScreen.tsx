import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { api } from '../services/api';

type Category = {
  id_categoria: number;
  nombre: string;
  descripcion: string;
};

type Props = {
  onSelectCategory: (categoryId: number, categoryName: string) => void;
};

export default function CategoriesScreen({ onSelectCategory }: Props) {
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
      <Text style={styles.subtitle}>Elige una categoría para ver sus productos</Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id_categoria.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => onSelectCategory(item.id_categoria, item.nombre)}
          >
            <Text style={styles.icon}>📦</Text>
            <View style={styles.info}>
              <Text style={styles.name}>{item.nombre}</Text>
              <Text style={styles.description}>{item.descripcion}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    color: '#aaa',
    marginTop: 4,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1f1f1f',
    padding: 18,
    borderRadius: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2b2b2b',
  },
  icon: {
    fontSize: 28,
    marginRight: 14,
  },
  info: {
    flex: 1,
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
  arrow: {
    color: '#00ff99',
    fontSize: 34,
    fontWeight: 'bold',
  },
});