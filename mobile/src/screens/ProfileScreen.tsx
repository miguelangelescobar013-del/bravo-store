import { View, Text, StyleSheet, Pressable } from 'react-native';

type User = {
  id_usuario: number;
  nombre: string;
  correo: string;
};

type Props = {
  user: User | null;
  onLogin: () => void;
};

export default function ProfileScreen({ user, onLogin }: Props) {
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.icon}>👤</Text>

        <Text style={styles.title}>
          Inicia sesión
        </Text>

        <Text style={styles.subtitle}>
          Accede a tus favoritos, pedidos y carrito personalizado
        </Text>

        <Pressable style={styles.loginButton} onPress={onLogin}>
          <Text style={styles.loginText}>
            Iniciar sesión
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {user.nombre.charAt(0)}
        </Text>
      </View>

      <Text style={styles.name}>
        {user.nombre}
      </Text>

      <Text style={styles.email}>
        {user.correo}
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Pedidos</Text>
        <Text style={styles.cardText}>
          Consulta el historial de compras realizadas
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Favoritos</Text>
        <Text style={styles.cardText}>
          Guarda productos para comprarlos después
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 24,
    alignItems: 'center',
  },

  icon: {
    fontSize: 90,
    marginTop: 70,
  },

  title: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 20,
  },

  subtitle: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 12,
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 320,
  },

  loginButton: {
    backgroundColor: '#00ff99',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 18,
    marginTop: 30,
  },

  loginText: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 16,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#00ff99',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },

  avatarText: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#111',
  },

  name: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
  },

  email: {
    color: '#aaa',
    fontSize: 16,
    marginTop: 6,
    marginBottom: 30,
  },

  card: {
    width: '100%',
    backgroundColor: '#1f1f1f',
    padding: 20,
    borderRadius: 20,
    marginBottom: 14,
  },

  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  cardText: {
    color: '#aaa',
    marginTop: 8,
    lineHeight: 22,
  },
});