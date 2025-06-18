import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/ui';

type Props = {
  filters: {
    status: string;
    gender: string;
  };
  onResetFilters: () => void;
};

export default function ActiveFilters({ filters, onResetFilters }: Props) {
  const hasFilters = filters.status || filters.gender;

  if (!hasFilters) return null;

  return (
    <View style={styles.container}>
      {filters.status ? (
        <View style={styles.tag}>
          <Text style={styles.text}>{filters.status}</Text>
        </View>
      ) : null}

      {filters.gender ? (
        <View style={styles.tag}>
          <Text style={styles.text}>{filters.gender}</Text>
        </View>
      ) : null}

      <TouchableOpacity onPress={onResetFilters} style={styles.resetButton}>
        <View style={[styles.tag, styles.resetTag]}>
          <Text style={[styles.text, styles.resetText]}>Reset all filters</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 10,
    marginBottom: 24,
    marginHorizontal: 12,
  },
  tag: {
    backgroundColor: COLORS.TEXT_COLOR,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 16,
  },
  text: {
    color: COLORS.COLOR_BLACK,
    fontSize: 12,
  },
  resetTag: {
    backgroundColor: COLORS.COLOR_MENTHOL,
  },
  resetText: { color: COLORS.TEXT_COLOR },
  resetButton: { marginLeft: 25 },
});
