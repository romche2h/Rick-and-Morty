import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from './src/screens/MainPage';
import DescriptionOfCharacter from './src/screens/DescriptionOfCharacter';

type RootStackParamList = {
  MainPage: undefined;
  Description: { character: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='light' />
      <Stack.Navigator>
        <Stack.Screen
          name='MainPage'
          component={MainPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Description'
          component={DescriptionOfCharacter}
          options={{ title: 'Подробнее' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
