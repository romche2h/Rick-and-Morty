import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import axios from 'axios';
import Header from './src/components/Header';
import { COLORS } from './src/constants/ui';
import { useEffect, useState } from 'react';

export default function App() {
  const [characters, setCharacters] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const API_CHARACTERS: string = 'https://rickandmortyapi.com/api/character';

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_CHARACTERS);
      setCharacters(response.data);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setError(error.message || 'Ошибка загрузки данных');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Alive':
        return 'green';
      case 'Dead':
        return 'red';
      default:
        return 'grey';
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Header title='Rick & Morty Characters' style={styles.header} />
        <StatusBar style='light' />
        <ScrollView>
          {characters?.results ? (
            characters?.results?.map((char: any) => (
              <View style={styles.content} key={char.id}>
                <View style={styles.row}>
                  <Image
                    source={{
                      uri: char.image,
                    }}
                    style={styles.avatar}
                  />
                  <View style={styles.test}>
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
            ))
          ) : (
            <Text>Персонажи не найдены!</Text>
          )}
        </ScrollView>
      </View>
    </>
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
    width: 390,
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
});
