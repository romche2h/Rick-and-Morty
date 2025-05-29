import { View, Text, StyleSheet, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS } from '../constants/ui';

type RootStackParamList = {
  MainPage: undefined;
  Description: { character: Character };
};

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  location: {
    name: string;
    url: string;
  };
  origin: {
    name: string;
    url: string;
  };
};

type DescriptionProps = NativeStackScreenProps<
  RootStackParamList,
  'Description'
>;

const DescriptionOfCharacter = ({ route }: DescriptionProps) => {
  const { character } = route.params || {};

  if (!character) {
    return (
      <View>
        <Text>Персонаж не найден!</Text>
      </View>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return '#198737';
      case 'dead':
        return '#D62300';
      default:
        return '#686874';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style='dark' />
      <View style={styles.contant}>
        <View style={styles.test}>
          <Image style={styles.avatar} source={{ uri: character.image }} />
          <Text
            style={[
              styles.status,
              { backgroundColor: getStatusColor(character.status) },
            ]}
          >
            {character.status}
          </Text>
        </View>
        <View style={styles.testTwo}>
          <Text style={styles.species}>Species: {character.species}</Text>
          <Text style={styles.gender}>Gender: {character.gender}</Text>
          <Text style={styles.episode}>Episodes: {character.id}</Text>
          <Text style={styles.location}>
            Last known location: {character.origin.name}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARY_BACKGROUND,
    flex: 1,
    color: COLORS.TEXT_COLOR,
    padding: 30,
  },
  contant: {
    backgroundColor: COLORS.SECONDARY_BACKGROUND,
    width: 355,
    height: 570,
    borderRadius: 24,
    gap: 12,
    justifyContent: 'center',
  },
  test: {
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  avatar: { width: 320, height: 318, borderRadius: 12 },
  status: {
    width: 320,
    height: 42,
    backgroundColor: COLORS.COLOR_GREEN,
    borderRadius: 16,
    color: COLORS.TEXT_COLOR,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  testTwo: {
    gap: 12,
    marginLeft: 16,
  },
  species: {
    color: COLORS.TEXT_COLOR,
    fontSize: 16,
  },
  gender: {
    color: COLORS.TEXT_COLOR,
    fontSize: 16,
  },
  episode: {
    color: COLORS.TEXT_COLOR,
    fontSize: 16,
  },
  location: {
    color: COLORS.TEXT_COLOR,
    fontSize: 16,
  },
});

export default DescriptionOfCharacter;
