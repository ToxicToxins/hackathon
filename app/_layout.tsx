import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    
    <Stack screenOptions={{
      headerStyle: {
        backgroundColor: '#25292e', // Match this color with your tab bar
      },
      headerTintColor: '#fff',
    }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
  
}
