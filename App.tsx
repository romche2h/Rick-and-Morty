import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from './src/screens/MainPage';
import DescriptionOfCharacter from './src/screens/DescriptionOfCharacter';
import NetworkStatus from './src/screens/NetworkStatus';
import NetInfo from '@react-native-community/netinfo';
import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

type RootStackParamList = {
  MainPage: undefined;
  Description: { character: any };
  test: any;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [connected, setConnected] = useState<boolean | null>(null);
  const [initialLoadFailed, setInitialLoadFailed] = useState(false);

  const checkConnection = () => {
    NetInfo.fetch().then((state) => {
      setConnected(state.isConnected);
      if (state.isConnected) {
        setInitialLoadFailed(false);
      } else {
        setInitialLoadFailed(true);
      }
    });
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnected(state.isConnected);
      if (state.isConnected) {
        setInitialLoadFailed(false);
      } else {
        setInitialLoadFailed(true);
      }
    });

    checkConnection();
    return () => unsubscribe();
  }, []);

  if (initialLoadFailed) {
    return <NetworkStatus onRetry={checkConnection} />;
  }

  if (connected === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Проверка подключения...</Text>
      </View>
    );
  }

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
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
