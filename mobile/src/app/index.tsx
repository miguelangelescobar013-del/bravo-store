import { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

import CategoriesScreen from '../screens/CategoriesScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import { Product, CartItem } from '../types/product';
import { api } from '../services/api';

type Screen =
  | 'home'
  | 'categories'
  | 'products'
  | 'men'
  | 'women'
  | 'profile'
  | 'cart'
  | 'favorites';

type User = {
  id_usuario: number;
  nombre: string;
  correo: string;
};

export default function Index() {
  const [screen, setScreen] = useState<Screen>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [toast, setToast] = useState('');
  const [user, setUser] = useState<User | null>(null);

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(''), 2200);
  };

  const loginUser = async () => {
    try {
      const response = await api.get('/users/profile/1');
      setUser(response.data.data);
      showToast(`Bienvenido, ${response.data.data.nombre}`);
    } catch (error) {
      console.error('Error iniciando sesión:', error);
      showToast('No se pudo iniciar sesión');
    }
  };

  const openAllProducts = () => {
    setSelectedCategoryId(null);
    setSelectedCategoryName(null);
    setScreen('products');
  };

  const openCategoryProducts = (categoryId: number, categoryName: string) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategoryName(categoryName);
    setScreen('products');
  };

  const openMenProducts = () => {
    setSelectedCategoryId(null);
    setSelectedCategoryName(null);
    setScreen('men');
  };

  const openWomenProducts = () => {
    setSelectedCategoryId(null);
    setSelectedCategoryName(null);
    setScreen('women');
  };

const addToCart = (product: CartItem) => {
  if (!user) {
    showToast('Debes iniciar sesión para agregar al carrito');
    setScreen('profile');
    return;
  }

  setCart([...cart, product]);
  showToast(`${product.nombre} talla ${product.tallaSeleccionada} agregado al carrito`);
};

  const removeFromCart = (indexToRemove: number) => {
    const product = cart[indexToRemove];
    setCart(cart.filter((_item, index) => index !== indexToRemove));

    if (product) {
      showToast(`${product.nombre} eliminado del carrito`);
    }
  };

  const clearCart = () => {
    setCart([]);
    showToast('Carrito vaciado correctamente');
  };

const addToFavorites = (product: Product) => {
  if (!user) {
    showToast('Debes iniciar sesión para agregar favoritos');
    setScreen('profile');
    return;
  }

  const exists = favorites.some(
    (item) => item.id_producto === product.id_producto
  );

  if (!exists) {
    setFavorites([...favorites, product]);
    showToast(`${product.nombre} agregado a favoritos`);
  } else {
    showToast('Este producto ya está en favoritos');
  }
};

  const removeFromFavorites = (productId: number) => {
    const product = favorites.find((item) => item.id_producto === productId);
    setFavorites(favorites.filter((item) => item.id_producto !== productId));

    if (product) {
      showToast(`${product.nombre} eliminado de favoritos`);
    }
  };

  if (screen !== 'home') {
    return (
      <View style={styles.page}>
        <View style={styles.topBar}>
          <Pressable style={styles.backButton} onPress={() => setScreen('home')}>
            <Text style={styles.backText}>← Volver</Text>
          </Pressable>

          <Pressable
            style={styles.loginButton}
            onPress={user ? () => setScreen('profile') : loginUser}
          >
            <Text style={styles.loginText}>
              {user ? user.nombre : 'Iniciar sesión'}
            </Text>
          </Pressable>
        </View>

        {screen === 'categories' && (
          <CategoriesScreen onSelectCategory={openCategoryProducts} />
        )}

        {(screen === 'products' || screen === 'men' || screen === 'women') && (
          <ProductsScreen
            onAddToCart={addToCart}
            onAddToFavorites={addToFavorites}
            categoryId={selectedCategoryId}
            categoryName={selectedCategoryName}
            genderFilter={
              screen === 'men' ? 'Hombre' : screen === 'women' ? 'Mujer' : null
            }
          />
        )}

        {screen === 'profile' && (
          <ProfileScreen user={user} onLogin={loginUser} />
        )}

        {screen === 'cart' && (
          <CartScreen
            cart={cart}
            onClearCart={clearCart}
            onRemoveFromCart={removeFromCart}
          />
        )}

        {screen === 'favorites' && (
          <FavoritesScreen
            favorites={favorites}
            onRemoveFromFavorites={removeFromFavorites}
          />
        )}

        {(screen === 'products' ||
          screen === 'men' ||
          screen === 'women' ||
          screen === 'favorites') && (
          <Pressable style={styles.floatingCart} onPress={() => setScreen('cart')}>
            <Text style={styles.floatingCartText}>🛒 {cart.length}</Text>
          </Pressable>
        )}

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

          <View style={styles.headerActions}>
            <Pressable
              style={styles.loginButton}
              onPress={user ? () => setScreen('profile') : loginUser}
            >
              <Text style={styles.loginText}>
                {user ? user.nombre : 'Iniciar sesión'}
              </Text>
            </Pressable>

            <Pressable style={styles.cartIcon} onPress={() => setScreen('cart')}>
              <Text style={styles.cartText}>🛒 {cart.length}</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroContent}>
            <View style={styles.heroLeft}>
              <Text style={styles.heroSmall}>Nueva colección</Text>

              <Text style={styles.heroTitle}>
                Estilo urbano para todos los días
              </Text>

              <Text style={styles.heroSubtitle}>
                Ropa y accesorios pensados para comodidad, actitud y diseño.
              </Text>

              <Pressable style={styles.heroButton} onPress={openAllProducts}>
                <Text style={styles.heroButtonText}>Comprar ahora</Text>
              </Pressable>
            </View>

            <View style={styles.heroRight}>
              <Image
                source={require('../../assets/images/logo.png')}
                style={styles.heroBigLogo}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Explora Bravo Store</Text>

        <View style={styles.grid}>
          <Pressable style={styles.card} onPress={() => setScreen('categories')}>
            <Text style={styles.cardIcon}>📦</Text>
            <Text style={styles.cardTitle}>Categorías</Text>
            <Text style={styles.cardText}>Explora prendas y accesorios</Text>
          </Pressable>

          <Pressable style={styles.card} onPress={openAllProducts}>
            <Text style={styles.cardIcon}>🔥</Text>
            <Text style={styles.cardTitle}>Productos</Text>
            <Text style={styles.cardText}>Mira todo el catálogo</Text>
          </Pressable>

          <Pressable style={styles.card} onPress={openMenProducts}>
            <Text style={styles.cardIcon}>👕</Text>
            <Text style={styles.cardTitle}>Hombre</Text>
            <Text style={styles.cardText}>Ropa y accesorios masculinos</Text>
          </Pressable>

          <Pressable style={styles.card} onPress={openWomenProducts}>
            <Text style={styles.cardIcon}>✨</Text>
            <Text style={styles.cardTitle}>Mujer</Text>
            <Text style={styles.cardText}>Ropa y accesorios femeninos</Text>
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  loginButton: {
    backgroundColor: '#222',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
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
  topBar: {
    backgroundColor: '#222',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hero: {
    marginTop: 26,
    backgroundColor: '#222',
    borderRadius: 24,
    padding: 30,
    minHeight: 340,
    justifyContent: 'center',
  },
  heroContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroLeft: {
    flex: 1,
    paddingRight: 20,
  },
  heroRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroBigLogo: {
    width: 320,
    height: 320,
    opacity: 0.92,
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
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  backText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  floatingCart: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    backgroundColor: '#00ff99',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 30,
    elevation: 6,
  },
  floatingCartText: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 16,
  },
  toast: {
    position: 'absolute',
    bottom: 84,
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