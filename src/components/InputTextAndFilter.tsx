import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Path, Svg, Circle, G } from 'react-native-svg';
import { TextInput } from 'react-native-gesture-handler';
import { COLORS } from '../constants/ui';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

function InputTextAndFilter({ value, onChangeText }: Props) {
  return (
    <View style={styles.container}>
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
      <TouchableOpacity>
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
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  svgAndInput: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
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
    flex: 1,
    color: COLORS.TEXT_COLOR,
  },
  filter: {
    width: 14,
    height: 12,
  },
});

export default InputTextAndFilter;
