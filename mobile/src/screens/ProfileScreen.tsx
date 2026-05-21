import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { api } from '../services/api';

type User = {
  id_usuario: number;
  nombre: string;
  correo: string;
  direccion: string;
  telefono: string;
};

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);

  const loadProfile = async () => {
    try {
      const response = await api.get('/users/profile/1');
      setUser(response.data.data);
    } catch (error) {
      console.error('Error cargando perfil:', error);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi perfil</Text>

      {user && (
        <View style={styles.card}>
          <Text style={styles.name}>{user.nombre}</Text>
          <Text style={styles.text}>{user.correo}</Text>
          <Text style={styles.text}>{user.direccion}</Text>
          <Text style={styles.text}>{user.telefono}</Text>
        </View>
      )}
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
    padding: 18,
    borderRadius: 14,
  },
  name: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 6,
  },
});