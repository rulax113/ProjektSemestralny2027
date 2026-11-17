import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RunDetailsScreen from '../screens/RunDetailsScreen';
import RunFormScreen from '../screens/RunFormScreen';
import RunListScreen from '../screens/RunListScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="RunList"
        screenOptions={{
          headerStyle: { backgroundColor: '#f4f6f2' },
          headerTintColor: '#234a34',
          headerTitleStyle: { fontWeight: '700' },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: '#f4f6f2' },
        }}
      >
        <Stack.Screen
          name="RunList"
          component={RunListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RunDetails"
          component={RunDetailsScreen}
          options={{ title: 'Szczegóły biegu' }}
        />
        <Stack.Screen
          name="RunForm"
          component={RunFormScreen}
          options={{ title: 'Nowy bieg' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}