import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Page() {
  return (
    <View style={styles.container}>
      <Link href="/loading" style={styles.button}>Loading</Link>
      <Link href="/output" style={styles.button}>Output</Link>
      <Link href="/qna" style={styles.button}>QnA</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});