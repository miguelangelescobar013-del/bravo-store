import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bravo Store</Text>
      <Text style={styles.subtitle}>Moda, accesorios y estilo urbano</Text>

      <Link href={'/categories' as any} asChild>
  <Pressable style={styles.button}>
    <Text style={styles.buttonText}>Ver categorías</Text>
  </Pressable>
</Link>

<Link href={'/products' as any} asChild>
  <Pressable style={styles.button}>
    <Text style={styles.buttonText}>Ver productos</Text>
  </Pressable>
</Link>

<Link href={'/profile' as any} asChild>
  <Pressable style={styles.button}>
    <Text style={styles.buttonText}>Ver perfil</Text>
  </Pressable>
</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
  },
  buttonText: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});