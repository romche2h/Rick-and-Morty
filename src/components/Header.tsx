import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../constants/ui';

type HeaderProps = {
  title: string;
  style?: ViewStyle;
};

const Header: React.FC<HeaderProps> = ({ title, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 66,
    alignItems: 'center',
  },
  text: { color: COLORS.TEXT_COLOR, fontSize: 24, fontFamily: 'IBM Plex Sans' },
});

export default Header;
