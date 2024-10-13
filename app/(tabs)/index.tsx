import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

export default function Page() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Welcome! </Text>
      <Text style={styles.bodyText}>This app takes a picture of your face,
      scans it for acne, and recommends some products to help treat it.</Text>
      <Text style={styles.bodyText2}>Please fill out some questions to make it easier for the app to recommend you products.</Text>

      {/* <Link href="/loading" style={styles.button}>Loading</Link>
      <Link href="/output" style={styles.button}>Output</Link> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleText: {
    color: '#fff',
    fontSize: 30,
    marginTop: 20,
  },
  bodyText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  bodyText2: {
    color: '#fff',
    fontSize: 18,
    marginTop: 175,
    textAlign: 'center',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});