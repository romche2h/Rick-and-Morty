import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Header from '../components/Header';
import { COLORS } from '../constants/ui';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

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
};

type MainPageProps = NativeStackScreenProps<RootStackParamList, 'MainPage'>;

export default function MainPage({ navigation }: MainPageProps) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchData = async (numberPage = 1) => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await axios.get<{
        results: Character[];
        info: { next: string };
      }>(`https://rickandmortyapi.com/api/character?page=${numberPage}`);
      const data = response.data;
      setCharacters((prev) => [...prev, ...response.data.results]);
      setHasMore(data.info.next !== null);
      setPage((prev) => prev + 1);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setError(error.message || 'Ошибка загрузки данных');
      } else {
        setError('Неизвестная ошибка');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'green';
      case 'dead':
        return 'red';
      default:
        return 'grey';
    }
  };

  return (
    <View style={styles.container}>
      <Header title='Rick & Morty Characters' style={styles.header} />
      {error ? <Text>{error}</Text> : null}
      <ScrollView onMomentumScrollEnd={() => fetchData(page)}>
        {characters.map((char, index) => (
          <TouchableOpacity
            key={`${char.id}-${index}`}
            onPress={() =>
              navigation.navigate('Description', { character: char })
            }
          >
            <View style={styles.content}>
              <View style={styles.row}>
                <Image source={{ uri: char.image }} style={styles.avatar} />
                <View>
                  <Text style={styles.text}>{char.name}</Text>
                  <View style={styles.statusAndSpecies}>
                    <Text
                      style={[
                        styles.textSmall,
                        { color: getStatusColor(char.status) },
                      ]}
                    >
                      {char.status}
                    </Text>
                    <Text style={styles.textSmall}>{char.species}</Text>
                  </View>
                  <Text style={styles.textSmall}>{char.gender}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        {loading && (
          <ActivityIndicator
            style={styles.indicatorLoading}
            size='small'
            color={COLORS.COLOR_GREEN}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY_BACKGROUND,
    padding: 20,
  },
  row: { flexDirection: 'row', gap: 16, padding: 15 },
  test: {
    gap: 6,
  },
  header: { marginBottom: 24 },
  statusAndSpecies: { flexDirection: 'row', gap: 5 },
  content: {
    width: 368,
    height: 100,
    borderRadius: 24,
    backgroundColor: COLORS.SECONDARY_BACKGROUND,
    gap: 6,
    marginTop: 4,
  },
  avatar: {
    width: 86,
    height: 70,
    borderRadius: 10,
  },
  text: {
    color: COLORS.TEXT_COLOR,
    fontSize: 18,
  },
  textSmall: {
    color: COLORS.TEXT_COLOR,
    fontSize: 12,
  },
  indicatorLoading: { marginVertical: 20, alignSelf: 'center' },
});
