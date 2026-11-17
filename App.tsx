import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { DiaryProvider } from './src/state/DiaryContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <DiaryProvider>
        <AppNavigator />
      </DiaryProvider>
    </SafeAreaProvider>
  );
}