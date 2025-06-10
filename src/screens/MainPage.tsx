import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import axios from 'axios';
import Header from '../components/Header';
import { COLORS } from '../constants/ui';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import InputTextAndFilter from '../components/InputTextAndFilter';
import { ErrorComponent } from '../components/ErrorComponent';

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
  episode: [];
};

type MainPageProps = NativeStackScreenProps<RootStackParamList, 'MainPage'>;

export default function MainPage({ navigation }: MainPageProps) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [filters, setFilters] = useState<{ status: string; gender: string }>({
    status: '',
    gender: '',
  });

  const fetchData = async (
    pageNumber = 1,
    searchQuery = '',
    appliedFilters = { status: '', gender: '' },
    append = false
  ) => {
    if (loading || (!hasMore && append)) return;

    setLoading(true);
    try {
      const response = await axios.get<{
        results: Character[];
        info: { next: string | null };
      }>(
        `https://rickandmortyapi.com/api/character?page=${pageNumber}&name=${searchQuery}&status=${appliedFilters.status}&gender=${appliedFilters.gender}`
      );

      const data = response.data;

      if (append) {
        setCharacters((prev) => [...prev, ...data.results]);
      } else {
        setCharacters(data.results);
      }

      setHasMore(data.info.next !== null);
      setPage((prev) => prev + 1);
      setError('');
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          setCharacters([]);
          setError('Такого персонажа не существует!');
        } else {
          setError(error.message || 'Ошибка загрузки данных');
        }
      } else {
        setError('Неизвестная ошибка');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchData(1, searchText, filters, false);
  }, [searchText, filters]);

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

  const filtersApplied = filters.status !== '' || filters.gender !== '';
  const isFiltered = searchText !== '' || filtersApplied;

  return (
    <View style={styles.container}>
      <Header title='Rick & Morty Characters' style={styles.header} />
      <InputTextAndFilter
        value={searchText}
        onChangeText={setSearchText}
        style={styles.inputAndFilterStyle}
        onApplyFilters={(newFilters) => {
          setFilters(newFilters);
        }}
      />
      {error && <ErrorComponent message={error} />}
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Description', { character: item })
            }
          >
            <View style={styles.content}>
              <View style={styles.row}>
                <Image source={{ uri: item.image }} style={styles.avatar} />
                <View>
                  <Text style={styles.text}>{item.name}</Text>
                  <View style={styles.statusAndSpecies}>
                    <Text
                      style={[
                        styles.textSmall,
                        { color: getStatusColor(item.status) },
                      ]}
                    >
                      {item.status}
                    </Text>
                    <Text style={styles.textSmall}>{item.species}</Text>
                  </View>
                  <Text style={styles.textSmall}>{item.gender}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        onEndReached={() => {
          if (!isFiltered) {
            fetchData(page, '', { status: '', gender: '' }, true);
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator
              style={styles.indicatorLoading}
              size='small'
              color={COLORS.COLOR_GREEN}
            />
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY_BACKGROUND,
    padding: 20,
  },
  inputAndFilterStyle: {},
  row: {
    flexDirection: 'row',
    gap: 16,
    padding: 15,
  },
  header: { marginBottom: 24 },
  statusAndSpecies: { flexDirection: 'row', gap: 5 },
  content: {
    width: '100%',
    height: 100,
    borderRadius: 24,
    backgroundColor: COLORS.SECONDARY_BACKGROUND,
    marginTop: 8,
    justifyContent: 'center',
  },
  avatar: {
    width: 86,
    height: 70,
    borderRadius: 10,
  },
  text: {
    color: COLORS.TEXT_COLOR,
    fontSize: 15,
  },
  textSmall: {
    color: COLORS.TEXT_COLOR,
    fontSize: 11,
  },
  indicatorLoading: { marginVertical: 20, alignSelf: 'center' },
});
