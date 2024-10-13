import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';

export default function InsertScreen() {
  const [progress, setProgress] = useState(0);
  const loadingTime = Math.random() * (5 - 10) + 10;
  const [hasNavigated, setHasNavigated] = useState(false);
  const devAnimation = useRef<LottieView>(null); 
  const router = useRouter();

  
  useEffect(() => {
    if (devAnimation.current) {
      devAnimation.current.play(); 
    }
  }, [devAnimation]);

 
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
  }, [loadingTime, hasNavigated, router]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading Animation</Text>
      {/* Lottie Animation */}
      <LottieView
  ref={devAnimation} 
  source={require('./anim1.json')}  
  autoPlay={false} 
  loop={true}
  onLayout={() => {
    
    if (devAnimation.current) {
      devAnimation.current.play();
    }
  }}
  style={styles.animation}
/>

      {/* Progress Bar */}
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
  text: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
  animation: {
    width: 200,
    height: 200,
  },
  progressContainer: {
    width: '90%',
    marginTop: 20,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3a3a3c',
  },
});
