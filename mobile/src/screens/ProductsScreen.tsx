import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
} from 'react-native';

import { api } from '../services/api';
import { Product, CartItem } from '../types/product';

const productImages: Record<string, any> = {
  'Gorra negra bordado frontal': require('../../assets/images/gorra-bordado-frontal.png'),
  'Gorra béisbol minimalista': require('../../assets/images/gorra-minimalista.png'),

  'Playera básica con bolsillo': require('../../assets/images/playera-bolsillo-parche.png'),
  'Playera Básica con Bolsillo de Parche': require('../../assets/images/playera-bolsillo-parche.png'),

  'Playera cuello Mao botones': require('../../assets/images/playera-henley.png'),
  'Playera de Manga Corta Henley': require('../../assets/images/playera-henley.png'),

  'Sudadera básica cuello redondo': require('../../assets/images/sudadera-cuello-redondo.png'),
  'Suéter de punto clásico': require('../../assets/images/sueter-punto-clasico.png'),

  'Tenis urbanos piel y gamuza': require('../../assets/images/tenis-piel-gamuza.png'),
  'Tenis Urbanos de Piel con Detalles en Gamuza': require('../../assets/images/tenis-piel-gamuza.png'),

  'Tenis running contraste azul': require('../../assets/images/tenis-running-contraste.png'),
  'Tenis running con Detalles en Contraste': require('../../assets/images/tenis-running-contraste.png'),
};

type Props = {
  onAddToCart: (product: CartItem) => void;
  onAddToFavorites: (product: Product) => void;
  categoryId?: number | null;
  categoryName?: string | null;
  genderFilter?: 'Hombre' | 'Mujer' | null;
};

export default function ProductsScreen({
  onAddToCart,
  onAddToFavorites,
  categoryId,
  categoryName,
  genderFilter,
}: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});

  const loadProducts = async () => {
    try {
      const endpoint = categoryId
        ? `/products?category=${categoryId}`
        : '/products';

      const response = await api.get(endpoint);
      let data = response.data.data;

      if (genderFilter) {
        data = data.filter((product: Product) =>
          product.categoria_nombre?.startsWith(genderFilter)
        );
      }

      setProducts(data);
    } catch (error) {
      console.error('Error cargando productos:', error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [categoryId, genderFilter]);

  const getProductEmoji = (name: string) => {
    const lower = name.toLowerCase();

    if (lower.includes('camiseta') || lower.includes('playera') || lower.includes('camisa')) return '👕';
    if (lower.includes('gorra')) return '🧢';
    if (lower.includes('pantal') || lower.includes('jean') || lower.includes('falda')) return '👖';
    if (lower.includes('chaqueta')) return '🧥';
    if (lower.includes('tenis')) return '👟';
    if (lower.includes('bolso')) return '👜';
    if (lower.includes('collar') || lower.includes('aretes')) return '💎';

    return '🛍️';
  };

  const getSizes = (sizes?: string) => {
    if (!sizes) return [];
    return sizes.split(',').map((size) => size.trim());
  };

  const handleAddToCart = (product: Product) => {
    const sizes = getSizes(product.tallas);
    const selectedSize = selectedSizes[product.id_producto];

    if (sizes.length > 0 && !selectedSize) {
      alert('Selecciona una talla antes de agregar al carrito');
      return;
    }

    onAddToCart({
      ...product,
      tallaSeleccionada: selectedSize || 'Única',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {categoryName || genderFilter || 'Productos'}
      </Text>

      <Text style={styles.subtitle}>
        {categoryName
          ? 'Productos disponibles en esta categoría'
          : genderFilter
            ? `Colección para ${genderFilter.toLowerCase()}`
            : 'Explora nuestro catálogo urbano'}
      </Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id_producto.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay productos disponibles</Text>
        }
        renderItem={({ item }) => {
          const sizes = getSizes(item.tallas);
          const selectedSize = selectedSizes[item.id_producto];
          const productImage = productImages[item.nombre];

          return (
            <View style={styles.card}>
              <View style={styles.productImage}>
                {productImage ? (
                  <Image
                    source={productImage}
                    style={styles.realProductImage}
                    resizeMode="cover"
                  />
                ) : (
                  <>
                    <Text style={styles.productEmoji}>
                      {getProductEmoji(item.nombre)}
                    </Text>
                    <Text style={styles.imageBrand}>BRAVO</Text>
                  </>
                )}
              </View>

              <View style={styles.info}>
                <Text style={styles.category}>
                  {item.categoria_nombre || 'Colección Bravo'}
                </Text>

                <Text style={styles.name}>{item.nombre}</Text>
                <Text style={styles.description}>{item.descripcion}</Text>

                {sizes.length > 0 && (
                  <>
                    <Text style={styles.sizeTitle}>Selecciona talla</Text>

                    <View style={styles.sizes}>
                      {sizes.map((size) => (
                        <Pressable
                          key={`${item.id_producto}-${size}`}
                          style={[
                            styles.sizeButton,
                            selectedSize === size && styles.sizeSelected,
                          ]}
                          onPress={() =>
                            setSelectedSizes({
                              ...selectedSizes,
                              [item.id_producto]: size,
                            })
                          }
                        >
                          <Text
                            style={[
                              styles.sizeText,
                              selectedSize === size && styles.sizeTextSelected,
                            ]}
                          >
                            {size}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </>
                )}

                <View style={styles.priceRow}>
                  <Text style={styles.price}>
                    ${item.precio.toLocaleString('es-CO')}
                  </Text>

                  <Text style={styles.stock}>
                    {item.stock > 0 ? `Stock ${item.stock}` : 'Agotado'}
                  </Text>
                </View>

                <View style={styles.actions}>
                  <Pressable
                    style={styles.cartButton}
                    onPress={() => handleAddToCart(item)}
                  >
                    <Text style={styles.cartText}>Agregar</Text>
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
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#111', 
    padding: 20 
  },

  title: { 
    color: '#fff', 
    fontSize: 32, 
    fontWeight: 'bold' 
  },

  subtitle: { 
    color: '#aaa', 
    marginTop: 4, 
    marginBottom: 20 
  },

  empty: { 
    color: '#aaa', 
    textAlign: 'center', 
    marginTop: 40, 
    fontSize: 16 
  },

  list: { 
    paddingBottom: 30 
  },

  card: {
    backgroundColor: '#1f1f1f',
    borderRadius: 24,
    marginBottom: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2b2b2b',
  },

  productImage: {
    height: 240,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
  },

  realProductImage: {
    width: '100%',
    height: '100%',
  },

  productEmoji: { 
    fontSize: 70 
  },

  imageBrand: {
    color: '#555',
    fontSize: 34,
    fontWeight: 'bold',
    letterSpacing: 4,
    marginTop: 8,
  },

  info: { 
    padding: 18 
  },

  category: {
    color: '#00ff99',
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 6,
  },

  name: { 
    color: '#fff', 
    fontSize: 22, 
    fontWeight: 'bold' 
  },

  description: { 
    color: '#aaa', 
    marginTop: 6, 
    lineHeight: 20 
  },

  sizeTitle: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 14,
    marginBottom: 8,
  },

  sizes: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 8 
  },

  sizeButton: {
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#444',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
  },

  sizeSelected: { 
    backgroundColor: '#00ff99', 
    borderColor: '#00ff99' 
  },

  sizeText: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },

  sizeTextSelected: { 
    color: '#111' 
  },

  priceRow: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  price: { 
    color: '#fff', 
    fontSize: 22, 
    fontWeight: 'bold' 
  },

  stock: { 
    color: '#aaa', 
    fontSize: 13 
  },

  actions: { 
    marginTop: 16, 
    flexDirection: 'row', 
    gap: 10 
  },

  cartButton: {
    flex: 1,
    backgroundColor: '#00ff99',
    padding: 14,
    borderRadius: 14,
  },

  cartText: { 
    color: '#111', 
    textAlign: 'center', 
    fontWeight: 'bold' 
  },

  favoriteButton: {
    width: 54,
    backgroundColor: '#333',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  favoriteText: { 
    fontSize: 18 
  },
});