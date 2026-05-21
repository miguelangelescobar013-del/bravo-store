import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';

import CategoriesScreen from '../screens/CategoriesScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import { Product } from '../types/product';

type Screen = 'home' | 'categories' | 'products' | 'profile' | 'cart' | 'favorites';

export default function Index() {
  const [screen, setScreen] = useState<Screen>('home');
  const [cart, setCart] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [toast, setToast] = useState('');

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(''), 2200);
  };

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    showToast(`${product.nombre} agregado al carrito`);
  };

  const addToFavorites = (product: Product) => {
    const exists = favorites.some((item) => item.id_producto === product.id_producto);

    if (!exists) {
      setFavorites([...favorites, product]);
      showToast(`${product.nombre} agregado a favoritos`);
    } else {
      showToast('Este producto ya está en favoritos');
    }
  };

  if (screen !== 'home') {
    return (
      <View style={styles.page}>
        <Pressable style={styles.backButton} onPress={() => setScreen('home')}>
          <Text style={styles.backText}>← Volver</Text>
        </Pressable>

        {screen === 'categories' && <CategoriesScreen />}

        {screen === 'products' && (
          <ProductsScreen
            onAddToCart={addToCart}
            onAddToFavorites={addToFavorites}
          />
        )}

        {screen === 'profile' && <ProfileScreen />}

        {screen === 'cart' && (
          <CartScreen
            cart={cart}
            onClearCart={() => setCart([])}
          />
        )}

        {screen === 'favorites' && <FavoritesScreen favorites={favorites} />}

        {toast !== '' && (
          <View style={styles.toast}>
            <Text style={styles.toastText}>{toast}</Text>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.logo}>BRAVO STORE</Text>

          <Pressable style={styles.cartIcon} onPress={() => setScreen('cart')}>
            <Text style={styles.cartText}>🛒 {cart.length}</Text>
          </Pressable>
        </View>

        <View style={styles.hero}>
          <Text style={styles.heroSmall}>Nueva colección</Text>
          <Text style={styles.heroTitle}>Estilo urbano para todos los días</Text>
          <Text style={styles.heroSubtitle}>
            Ropa y accesorios pensados para comodidad, actitud y diseño.
          </Text>

          <Pressable style={styles.heroButton} onPress={() => setScreen('products')}>
            <Text style={styles.heroButtonText}>Comprar ahora</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>Explora Bravo Store</Text>

        <View style={styles.grid}>
          <Pressable style={styles.card} onPress={() => setScreen('categories')}>
            <Text style={styles.cardIcon}>📦</Text>
            <Text style={styles.cardTitle}>Categorías</Text>
            <Text style={styles.cardText}>Explora prendas y accesorios</Text>
          </Pressable>

          <Pressable style={styles.card} onPress={() => setScreen('products')}>
            <Text style={styles.cardIcon}>🔥</Text>
            <Text style={styles.cardTitle}>Productos</Text>
            <Text style={styles.cardText}>Mira todo el catálogo</Text>
          </Pressable>

          <Pressable style={styles.card} onPress={() => setScreen('favorites')}>
            <Text style={styles.cardIcon}>⭐</Text>
            <Text style={styles.cardTitle}>Favoritos</Text>
            <Text style={styles.cardText}>{favorites.length} guardados</Text>
          </Pressable>

          <Pressable style={styles.card} onPress={() => setScreen('profile')}>
            <Text style={styles.cardIcon}>👤</Text>
            <Text style={styles.cardTitle}>Perfil</Text>
            <Text style={styles.cardText}>Datos del usuario</Text>
          </Pressable>
        </View>
      </ScrollView>

      {toast !== '' && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{toast}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#111',
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  cartIcon: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  cartText: {
    color: '#111',
    fontWeight: 'bold',
  },
  hero: {
    marginTop: 26,
    backgroundColor: '#222',
    borderRadius: 24,
    padding: 26,
    minHeight: 260,
    justifyContent: 'center',
  },
  heroSmall: {
    color: '#00ff99',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 38,
    fontWeight: 'bold',
    maxWidth: 720,
  },
  heroSubtitle: {
    color: '#bbb',
    fontSize: 16,
    marginTop: 12,
    maxWidth: 520,
  },
  heroButton: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    marginTop: 24,
    width: 180,
  },
  heroButtonText: {
    color: '#111',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  card: {
    backgroundColor: '#1f1f1f',
    borderRadius: 18,
    padding: 18,
    minHeight: 140,
    width: '48%',
  },
  cardIcon: {
    fontSize: 28,
    marginBottom: 10,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardText: {
    color: '#aaa',
    marginTop: 6,
  },
  backButton: {
    backgroundColor: '#222',
    padding: 16,
  },
  backText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  toast: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    backgroundColor: '#00ff99',
    padding: 14,
    borderRadius: 14,
  },
  toastText: {
    color: '#111',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});