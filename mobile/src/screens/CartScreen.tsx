import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';

import { Product } from '../types/product';
import { api } from '../services/api';

type Props = {
  cart: Product[];
  onClearCart: () => void;
};

type PaymentMethod = 'PSE' | 'Credito' | 'Debito' | 'Paypal';

export default function CartScreen({ cart, onClearCart }: Props) {
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
        keyExtractor={(item, index) => `${item.id_producto}-${index}`}
        ListEmptyComponent={
          <Text style={styles.empty}>Tu carrito está vacío</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.nombre}</Text>
            <Text style={styles.description}>{item.descripcion}</Text>
            <Text style={styles.price}>
              ${item.precio.toLocaleString('es-CO')}
            </Text>
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
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.total}>
            ${total.toLocaleString('es-CO')}
          </Text>

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

  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  description: {
    color: '#aaa',
    marginTop: 6,
  },

  price: {
    color: '#00ff99',
    fontWeight: 'bold',
    marginTop: 8,
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

  totalLabel: {
    color: '#aaa',
  },

  total: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 14,
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