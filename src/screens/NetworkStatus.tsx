import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/ui';
import { StatusBar } from 'expo-status-bar';

type Props = {
  onRetry: () => void;
};

export default function NetworkStatus({ onRetry }: Props) {
  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <Image
        style={styles.avatar}
        source={require('../../assets/connectionError.png')}
      />
      <Text style={styles.title}>Network Error</Text>
      <Text style={styles.message}>
        There was an error connecting.{'\n'}Please check your internet.
      </Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={onRetry}>
        <Text style={styles.buttonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.PRIMARY_BACKGROUND,
  },
  avatar: { width: 263, height: 263, marginBottom: 32 },
  title: {
    fontSize: 24,
    color: COLORS.TEXT_COLOR,
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: COLORS.COLOR_GREY_FOR_NET_WORK,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 10,
    width: 220,
    height: 42,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#42B4CA',
  },
  buttonText: {
    color: COLORS.TEXT_COLOR,
    fontSize: 21,
  },
});
