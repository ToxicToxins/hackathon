import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';

export default function Page() {
  const router = useRouter();

  const handleInsertPress = () => {
    console.log('Insert button pressed');
    router.push('/insert');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.titleText}>Welcome!</Text>
        <Text style={styles.bodyText}>
          This app uses a trained model to scan and analyze your face for different types of acne, providing a personalized approach to treatment. By taking a picture, the app assesses the severity and distribution of acne, generating a detailed skin report. It offers tailored product recommendations, such as cleansers and topical treatments, based on your specific skin type and acne condition.
        </Text>
        <Link href="/loading" style={styles.linkButton}>Loading</Link>
        <Link href="/output" style={styles.linkButton}>Output</Link>
        <View style={styles.footerContainer}>
          <TouchableOpacity onPress={handleInsertPress} style={styles.button}>
            <Text style={styles.buttonText}>Insert</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
  },
  titleText: {
    color: '#fff',
    fontSize: 30,
    marginTop: 20,
    textAlign: 'center',
  },
  bodyText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  linkButton: {
    fontSize: 20,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#3b3b3b',
    borderRadius: 5,
    color: '#ffffff',
    textAlign: 'center',
  },
  footerContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 200,
  },
  button: {
    backgroundColor: '#3b3b3b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
  },
  headerStyle: {
    backgroundColor: '#25292e',
  }
});