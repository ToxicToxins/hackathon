import React, { useState } from 'react';
import { Text, View, StyleSheet, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Button from '@/components/Buttons';
import ImageViewer from "@/components/ImageViewer";
import { SelectList } from 'react-native-dropdown-select-list';
import * as FileSystem from 'expo-file-system';
import { Linking } from 'react-native';
import { Link, useRouter } from 'expo-router';
const API_URL = 'http://192.168.1.24:5000/';

const PlaceholderImage = require('../assets/images/background-image.jpg');

interface DataItem {
  key: string;
  value: string;
  disabled?: boolean;
}

const InsertScreen: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(["", ""]);
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();

  const pickImageAsync = async (): Promise<void> => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const questionData: DataItem[][] = [
    [
      { key: '1', value: 'Oily' },
      { key: '2', value: 'Dry' },
      { key: '3', value: 'Combination' },
      { key: '4', value: 'Normal' },
    ],
    [
      { key: '1', value: 'Not sensitive' },
      { key: '2', value: 'Sensitive' },
      { key: '3', value: 'Very sensitive' },
    ],
  ];

  const questions = [
    "What is your skin type?",
    "How sensitive is your skin?"
  ];

  const handleSelection = (index: number, value: string): void => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[index] = value;
    setSelectedAnswers(newSelectedAnswers);
  };

  const submitData = async () => {
    if (!selectedImage || selectedAnswers.some(answer => answer === "")) {
      Alert.alert("Error", "Please fill in all fields and select an image.");
      return;
    }

    try {
      const base64Image = await FileSystem.readAsStringAsync(selectedImage, { encoding: FileSystem.EncodingType.Base64 });

      const response = await fetch(`${API_URL}create_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64Image,
          keywords: selectedAnswers.filter(answer => answer !== ""),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUserId(data.id);
      router.push('/loading');
    } catch (error) {
      console.error('Error submitting data:', error);
      Alert.alert("Error", "Failed to submit data. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
        </View>
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
        </View>
        {questions.map((question, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.text}>{question}</Text>
            <SelectList
              setSelected={(value: string) => handleSelection(index, value)}
              data={questionData[index]}
              save="value"
              placeholder="Select an option"
              boxStyles={styles.dropdownBox}
              dropdownStyles={styles.dropdown}
              inputStyles={dropdownTextStyle}
              dropdownTextStyles={styles.dropdownText}
            />
          </View>
        ))}
        <Button label="Submit answers and image" onPress={submitData} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16, // Add padding to the sides
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#1c1c1e",
  },
  container: {
    flex: 1,
    backgroundColor: "#1c1c1e",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  footerContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  questionContainer: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: "#2c2c2e",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  text: {
    color: "#ffffff",
    marginBottom: 10,
    fontSize: 16,
  },
  answer: {
    color: "#ffffff",
    marginTop: 10,
  },
  dropdownBox: {
    width: '90%',
    backgroundColor: "#3a3a3c",
    borderRadius: 8,
  },
  dropdown: {
    backgroundColor: "#3a3a3c",
    borderRadius: 8,
  },
  dropdownText: {
    color: "#ffffff",
  },
});

const dropdownTextStyle = { color: '#ffffff' };

export default InsertScreen;