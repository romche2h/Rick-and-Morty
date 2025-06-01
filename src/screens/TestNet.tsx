import React from 'react';
import { SafeAreaView } from 'react-native';
import NetworkStatus from './NetworkStatus'; // убедись, что путь корректный

export default function TestNetworkStatus() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NetworkStatus
        onRetry={() => {
          console.log('Retry pressed (test mode)');
        }}
      />
    </SafeAreaView>
  );
}
