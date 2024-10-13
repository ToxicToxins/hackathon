import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { router, useRouter } from 'expo-router';

export default function InsertScreen() {
  const [progress, setProgress] = useState(0);
  const loadingTime = Math.random() * (5 - 10) + 10;
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 0.01;
        if (newProgress >= 1 && !hasNavigated) {
          clearInterval(interval);
          setHasNavigated(true);
          router.push('/output');
        }
        return newProgress;
      });
    }, (loadingTime * 1000) / 100); 

    return () => clearInterval(interval);
  }, [loadingTime]);

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <ProgressBar progress={progress} color="#6ac8e1" style={styles.progressBar} />
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
    paddingHorizontal: 20,
  },
  progressContainer: {
    width: '90%',
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3a3a3c', 
  },
});