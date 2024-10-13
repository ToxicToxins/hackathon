import React, { useState } from 'react';
import { Text, View, StyleSheet, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import Button from '@/components/Buttons';
import ImageViewer from "@/components/ImageViewer";
import { SelectList } from 'react-native-dropdown-select-list';

const PlaceholderImage = require('../assets/images/background-image.jpg');

interface DataItem {
  key: string;
  value: string;
  disabled?: boolean;
}

const InsertScreen: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(["", "", "", "", "", ""]);

  const pickImageAsync = async (): Promise<void> => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log(result);
      console.log(result.assets[0].uri);
    }
  };

  const questionData: DataItem[][] = [
    [
      { key: '1', value: 'Hormonal changes' },
      { key: '2', value: 'Diet and nutrition' },
      { key: '3', value: 'Stress' },
      { key: '4', value: 'Genetic predisposition' },
      { key: '5', value: 'Poor skincare routine' },
    ],
    [
      { key: '1', value: 'Topical retinoids' },
      { key: '2', value: 'Benzoyl peroxide' },
      { key: '3', value: 'Salicylic acid' },
      { key: '4', value: 'Oral antibiotics' },
      { key: '5', value: 'Hormonal therapy' },
    ],
    [
      { key: '1', value: 'Once a week' },
      { key: '2', value: 'Twice a week' },
      { key: '3', value: 'Every other day' },
      { key: '4', value: 'Daily' },
      { key: '5', value: 'Never' },
    ],
    [
      { key: '1', value: 'Alcohol-based products' },
      { key: '2', value: 'Fragrances' },
      { key: '3', value: 'Heavy oils (e.g., coconut oil)' },
      { key: '4', value: 'Parabens' },
      { key: '5', value: 'Sulfates' },
    ],
    [
      { key: '1', value: 'Oil-free moisturizer' },
      { key: '2', value: 'Gel-based moisturizer' },
      { key: '3', value: 'Non-comedogenic moisturizer' },
      { key: '4', value: 'Moisturizers with hyaluronic acid' },
      { key: '5', value: 'Moisturizers with ceramides' },
    ],
    [
      { key:'1',value:"Yes, significantly worsens" }, 
      { key:"2",value:"Slightly worsens"}, 
      { key:"3",value:"No change noticed"}, 
      { key:"4",value:"Improves during cycle"}
    ]
  ];

  const questions = [
    "What Causes Acne?",
    "What Treatments Are Available for My Skin Type?",
    "How Often Should I Exfoliate?",
    "Are There Any Ingredients I Should Avoid?",
    "What Is the Best Moisturizer for Acne-Prone Skin?",
    "Does My Acne Worsen Around My Menstrual Cycle?"
  ];

  const handleSelection = (index:number, value:string): void => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[index] = value;
    setSelectedAnswers(newSelectedAnswers);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
        </View>
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync}/>
        </View>
        {/* Render each question with its dropdown */}
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
        <Button label="Submit answers and image" />
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