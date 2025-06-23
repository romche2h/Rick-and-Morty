import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ViewStyle,
  SafeAreaView,
  Modal,
  TextInput,
} from 'react-native';
import { Path, Svg, Circle, G } from 'react-native-svg';
import { COLORS } from '../constants/ui';
import { useState, useEffect } from 'react';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  style?: ViewStyle;
  onApplyFilters?: (filters: { status: string; gender: string }) => void;
  resetFiltersFlag?: boolean;
  onResetHandled?: () => void;
};

function InputTextAndFilter({
  value,
  onChangeText,
  onApplyFilters,
  style,
  resetFiltersFlag,
  onResetHandled,
}: Props) {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectStatus, setSelectStatus] = useState<string>('');
  const [selectGender, setSelectGender] = useState<string>('');

  useEffect(() => {
    if (resetFiltersFlag) {
      setSelectStatus('');
      setSelectGender('');
      if (onApplyFilters) {
        onApplyFilters({ status: '', gender: '' });
      }
      if (onResetHandled) {
        onResetHandled();
      }
    }
  }, [resetFiltersFlag]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.svgAndInput}>
        <Svg style={styles.iconSearch} viewBox='0 0 22.6281 22.6281'>
          <G
            stroke='#FFFFFF'
            strokeWidth={2}
            strokeOpacity={1}
            strokeLinejoin='round'
            strokeLinecap='round'
          >
            <Circle cx='12.208984' cy='6.419006' r='5.419' />
            <Path d='M7.62 11L5 13.62' />
          </G>
        </Svg>
        <TextInput
          style={styles.inputText}
          placeholder='Search'
          placeholderTextColor={COLORS.TEXT_COLOR}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      <TouchableOpacity onPress={() => setShowFilters(true)}>
        <Svg style={styles.filter} viewBox='0 0 16.0959 14.096'>
          <Circle
            cx='4.714966'
            cy='3.048004'
            r='2'
            stroke='#FFFFFF'
            strokeWidth='2.096'
          />
          <Path
            d='M10.04 3.04L15.04 3.04'
            stroke='#FFFFFF'
            strokeWidth='2.096'
            strokeLinecap='round'
          />
          <Path
            d='M1.04 11.04L6.04 11.04'
            stroke='#FFFFFF'
            strokeWidth='2.096'
            strokeLinecap='round'
          />
          <Path
            d='M1.04 3.04L2.71 3.04'
            stroke='#FFFFFF'
            strokeWidth='2.096'
            strokeLinecap='round'
          />
          <Path
            d='M14.04 11.04L15.04 11.04'
            stroke='#FFFFFF'
            strokeWidth='2.096'
            strokeLinecap='round'
          />
          <Circle
            cx='8.714966'
            cy='11.048004'
            r='2'
            stroke='#FFFFFF'
            strokeWidth='2.096'
          />
        </Svg>
      </TouchableOpacity>

      <Modal
        visible={showFilters}
        animationType='slide'
        transparent
        onRequestClose={() => setShowFilters(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.containerTwo}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <Image
                  source={require('../../assets/IconCross.png')}
                  style={styles.cross}
                />
              </TouchableOpacity>
              <Text style={styles.filters}>Filters</Text>
              <TouchableOpacity
                onPress={() => {
                  setSelectGender('');
                  setSelectStatus('');
                }}
              >
                <Text style={styles.reset}>Reset</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.margBot}>
              <Text style={styles.status}>Status</Text>
              <View style={styles.statusContent}>
                {['Dead', 'Alive', 'Unknown'].map((status) => (
                  <TouchableOpacity
                    key={`status-${status}`}
                    onPress={() => setSelectStatus(status)}
                  >
                    <Text
                      style={[
                        styles.statusLives,
                        selectStatus === status && {
                          backgroundColor: COLORS.TEXT_COLOR,
                          color: COLORS.COLOR_BLACK,
                        },
                      ]}
                    >
                      {status}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.margBot}>
              <Text style={styles.status}>Gender</Text>
              <View style={styles.statusContent}>
                {['Female', 'Male', 'Genderless', 'Unknown'].map((gender) => (
                  <TouchableOpacity
                    key={`gender-${gender}`}
                    onPress={() => setSelectGender(gender)}
                  >
                    <Text
                      style={[
                        styles.statusLives,
                        selectGender === gender && {
                          backgroundColor: COLORS.TEXT_COLOR,
                          color: COLORS.COLOR_BLACK,
                        },
                      ]}
                    >
                      {gender}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={styles.containerBottom}
              onPress={() => {
                if (onApplyFilters) {
                  onApplyFilters({
                    status: selectStatus,
                    gender: selectGender,
                  });
                }
                setShowFilters(false);
              }}
            >
              <Text style={styles.bottomApply}>Apply</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    zIndex: 100,
  },
  svgAndInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 13,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.COLOR_BORDER_RADIUS,
    width: 320,
  },
  iconSearch: {
    width: 20,
    height: 20,
    marginRight: 2.2,
  },
  inputText: {
    height: 40,
    flex: 1,
    color: COLORS.TEXT_COLOR,
  },
  filter: {
    width: 14,
    height: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  containerTwo: {
    width: '100%',
    backgroundColor: COLORS.SECONDARY_BACKGROUND,
    borderRadius: 32,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  cross: { width: 25, height: 25 },
  filters: { color: COLORS.TEXT_COLOR, fontSize: 20 },
  reset: { color: COLORS.TEXT_COLOR },
  status: {
    color: COLORS.TEXT_COLOR,
    fontSize: 14,
    marginBottom: 13,
    fontWeight: '500',
  },
  statusLives: {
    color: COLORS.TEXT_COLOR,
    borderWidth: 2,
    paddingHorizontal: 16,
    paddingVertical: 10,
    textAlign: 'center',
    borderColor: COLORS.COLOR_BORDER_RADIUS,
    borderRadius: 24,
    fontSize: 10,
  },
  statusContent: { flexDirection: 'row', gap: 10 },
  margBot: { marginBottom: 34 },
  containerBottom: {
    width: '100%',
    height: 42,
    backgroundColor: COLORS.COLOR_MENTHOL,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomApply: { color: COLORS.TEXT_COLOR, fontSize: 18 },
});

export default InputTextAndFilter;
