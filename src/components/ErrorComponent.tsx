import { View, Text, StyleSheet, Image } from 'react-native';

type ErrorComponentProps = {
  message: string;
};

export function ErrorComponent({ message }: ErrorComponentProps) {
  return (
    <View>
      <Image
        style={styles.picture}
        source={require('../../assets/iconError.png')}
      />
      <Text style={styles.textMessage}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  picture: { alignSelf: 'center', width: '100%', height: '50%' },
  textMessage: { textAlign: 'center', fontSize: 20, marginBottom: 40 },
});
