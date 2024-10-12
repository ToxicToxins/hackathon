import React, { useState } from 'react';
import { Text, View, StyleSheet, Alert, ScrollView } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

interface DataItem {
  key: string;
  value: string;
  disabled?: boolean;
}

const InsertScreen: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(["", "", "", "", "", ""]);

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
      {key:"2",value:"Slightly worsens"}, 
      {key:"3",value:"No change noticed"}, 
      {key:"4",value:"Improves during cycle"}
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

  const handleSelection = (index:number, value:string) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[index] = value;
    setSelectedAnswers(newSelectedAnswers);
    Alert.alert(`You selected for Question ${index + 1}:`, value);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollView}>
      <View style={styles.container}>
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
            />
            {!!selectedAnswers[index] && (
              <Text style={styles.answer}>Your answer is: {selectedAnswers[index]}</Text>
            )}
          </View>
        ))}
        {/* Example button style usage */}
        <Text style={styles.button}>Submit Answers</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer:{
    flexGrow : 1,
    justifyContent : "center",
    alignItems : "center",
},
scrollView:{
  flex : 1,
  backgroundColor : "#25292e",
},
container:{
  flex : 1,
  backgroundColor : "#25292e",
  alignItems : "center",
  justifyContent : "center",
},
questionContainer:{
   marginBottom : 40,
   alignItems : "center",
},
text:{
   color : "#fff",
   marginBottom : 10,
},
answer:{
   color : "#fff",
   marginTop : 10,
},
dropdownBox:{
   width : 250,
   backgroundColor : "#fff",
},
dropdown:{
   backgroundColor : "#fff",
},
button:{
   fontSize : 20,
   textDecorationLine : "underline",
   color : "#fff",
   marginTop : 20,
},
});

export default InsertScreen;