import { Text, View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import Button from '@/components/Buttons';
import ImageViewer from "@/components/ImageViewer";

const PlaceholderImage = require('../../assets/images/background-image.jpg');

export default function InsertScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a photo" />
        <Button label="Use this photo" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
  imageContainer: {
    flex: 1 / 1.5,
  },
  image: {
    width: 430,
    height: 430,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 4,
    alignItems: 'center',
  },
});