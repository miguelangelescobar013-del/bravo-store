import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';

import { CartItem } from '../types/product';
import { api } from '../services/api';

type Props = {
  cart: CartItem[];
  onClearCart: () => void;
  onRemoveFromCart: (index: number) => void;
};

type PaymentMethod = 'PSE' | 'Credito' | 'Debito' | 'Paypal';

export default function CartScreen({
  cart,
  onClearCart,
  onRemoveFromCart,
}: Props) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('PSE');

  const total = cart.reduce((sum, item) => sum + item.precio, 0);

  const createOrder = async () => {
    try {
      if (cart.length === 0) {
        Alert.alert(
          'Carrito vacío',
          'Agrega productos antes de finalizar la compra'
        );
        return;
      }

      const items = cart.map((item) => ({
        id_producto: item.id_producto,
        cantidad: 1,
      }));

      const orderResponse = await api.post('/orders', {
        id_usuario: 1,
        items,
      });

      const id_pedido = orderResponse.data.data.id_pedido;

      await api.post('/payments/simulate', {
        id_pedido,
        metodo_pago: paymentMethod,
      });

      Alert.alert(
        'Compra realizada',
        `Tu pedido #${id_pedido} fue creado correctamente usando ${paymentMethod}`
      );

      onClearCart();
    } catch (error) {
      console.error('Error finalizando compra:', error);
      Alert.alert('Error', 'No se pudo finalizar la compra');
    }
  };

  const renderPaymentButton = (method: PaymentMethod) => (
    <Pressable
      style={[
        styles.paymentButton,
        paymentMethod === method && styles.paymentSelected,
      ]}
      onPress={() => setPaymentMethod(method)}
    >
      <Text
        style={[
          styles.paymentText,
          paymentMethod === method && styles.paymentTextSelected,
        ]}
      >
        {method}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito</Text>
      <Text style={styles.subtitle}>Productos seleccionados</Text>

      <FlatList
        data={cart}
        keyExtractor={(item, index) => `${item.id_producto}-${item.tallaSeleccionada}-${index}`}
        ListEmptyComponent={
          <Text style={styles.empty}>Tu carrito está vacío</Text>
        }
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.productInfo}>
                <Text style={styles.name}>{item.nombre}</Text>
                <Text style={styles.description}>{item.descripcion}</Text>

                <Text style={styles.size}>
                  Talla: {item.tallaSeleccionada}
                </Text>

                <Text style={styles.price}>
                  ${item.precio.toLocaleString('es-CO')}
                </Text>
              </View>

              <Pressable
                style={styles.removeButton}
                onPress={() => onRemoveFromCart(index)}
              >
                <Text style={styles.removeText}>✕</Text>
              </Pressable>
            </View>
          </View>
        )}
      />

      <View style={styles.checkoutBox}>
        <Text style={styles.paymentTitle}>Método de pago</Text>

        <View style={styles.paymentMethods}>
          {renderPaymentButton('PSE')}
          {renderPaymentButton('Credito')}
          {renderPaymentButton('Debito')}
          {renderPaymentButton('Paypal')}
        </View>

        <View style={styles.summary}>
          <View style={styles.totalRow}>
            <View>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.total}>
                ${total.toLocaleString('es-CO')}
              </Text>
            </View>

            {cart.length > 0 && (
              <Pressable style={styles.clearButton} onPress={onClearCart}>
                <Text style={styles.clearText}>Vaciar</Text>
              </Pressable>
            )}
          </View>

          <Pressable style={styles.buyButton} onPress={createOrder}>
            <Text style={styles.buyText}>Pagar ahora</Text>
          </Pressable>
        </View>
      </View>
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
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },

  productInfo: {
    flex: 1,
  },

  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  description: {
    color: '#aaa',
    marginTop: 6,
  },

  size: {
    color: '#00ff99',
    marginTop: 8,
    fontWeight: 'bold',
  },

  price: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 8,
  },

  removeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },

  removeText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  checkoutBox: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 16,
  },

  paymentTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  paymentMethods: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 18,
  },

  paymentButton: {
    backgroundColor: '#222',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#333',
  },

  paymentSelected: {
    backgroundColor: '#00ff99',
    borderColor: '#00ff99',
  },

  paymentText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  paymentTextSelected: {
    color: '#111',
  },

  summary: {
    paddingTop: 4,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalLabel: {
    color: '#aaa',
  },

  total: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 14,
  },

  clearButton: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
  },

  clearText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  buyButton: {
    backgroundColor: '#00ff99',
    padding: 16,
    borderRadius: 16,
  },

  buyText: {
    color: '#111',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});