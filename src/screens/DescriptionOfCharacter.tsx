import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Svg, Path } from 'react-native-svg';
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

const DescriptionOfCharacter = ({ route, navigation }: DescriptionProps) => {
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
      <StatusBar style='light' />
      <View style={styles.header}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Svg style={styles.hederback} viewBox='0 0 24 24'>
            <Path
              d='M14.29 2.32L14.29 2.29C14.68 1.89 15.31 1.89 15.7 2.29C16.1 2.68 16.1 3.31 15.7 3.7L15.67 3.7L14.29 2.32ZM15.67 20.29L15.7 20.29C16.1 20.68 16.1 21.31 15.7 21.7C15.31 22.1 14.68 22.1 14.29 21.7L14.29 21.67L15.67 20.29Z'
              fill='#F4F4F4'
            />
            <Path
              d='M15 3L6 12L15 21'
              stroke='#F4F4F4'
              strokeWidth={2}
              strokeLinejoin='round'
              strokeLinecap='round'
            />
          </Svg>
        </TouchableOpacity>
        <View style={styles.headerViewName}>
          <Text style={styles.headerName}>{character.name}</Text>
        </View>
      </View>
      <View style={styles.contant}>
        <View style={styles.contantAvatarAndTitle}>
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
        <View style={styles.title}>
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
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  hederback: {
    color: COLORS.TEXT_COLOR,
    height: 24,
    width: 24,
  },
  headerViewName: {
    flex: 1,
    alignItems: 'center',
  },
  headerName: {
    color: COLORS.TEXT_COLOR,
    fontSize: 24,
  },
  contant: {
    backgroundColor: COLORS.SECONDARY_BACKGROUND,
    width: 355,
    height: 570,
    borderRadius: 24,
    gap: 12,
    justifyContent: 'center',
  },
  contantAvatarAndTitle: {
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
  title: {
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
