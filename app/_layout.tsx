import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#25292e', // Match this color with your tab bar
        },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="insert" options={{ title: 'Insert' }} />
      <Stack.Screen name="loading" options={{ title: 'Loading' }} />
      <Stack.Screen name="output" options={{ title: 'Output' }} />
    </Stack>
  );
}
