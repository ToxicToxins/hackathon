import React, { useState } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

interface DataItem {
  key: string;
  value: string;
  disabled?: boolean;
}

const InsertScreen: React.FC = () => {
  const [selected, setSelected] = useState<string>("");

  const data: DataItem[] = [
    { key: '1', value: 'Mobiles', disabled: true },
    { key: '2', value: 'Appliances' },
    { key: '3', value: 'Cameras' },
    { key: '4', value: 'Computers', disabled: true },
    { key: '5', value: 'Vegetables' },
    { key: '6', value: 'Dairy Products' },
    { key: '7', value: 'Drinks' },
  ];

  const handleSelection = (value: string) => {
    setSelected(value);
    // Here you can handle the logic for answering the question
    Alert.alert("You selected:", value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select an item to answer the question:</Text>
      <SelectList 
        setSelected={handleSelection} 
        data={data} 
        save="value"
        placeholder="Select an item"
        boxStyles={styles.dropdownBox}
        dropdownStyles={styles.dropdown}
      />
      {selected && <Text style={styles.answer}>Your answer is: {selected}</Text>}
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
      marginBottom: 20,
    },
    answer: {
      color: '#fff',
      marginTop: 20,
    },
    dropdownBox: {
      width: 200,
      backgroundColor: '#fff',
    },
    dropdown: {
      backgroundColor: '#fff',
    },
});

export default InsertScreen;