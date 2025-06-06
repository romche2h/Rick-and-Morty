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
  picture: { alignSelf: 'center', width: 395, height: 274 },
  textMessage: { textAlign: 'center', fontSize: 20, marginBottom: 40 },
});
