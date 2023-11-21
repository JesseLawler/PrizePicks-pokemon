import React from 'react';
import {Platform, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button as PaperButton} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Text from './text';
import {setSelection} from '../redux/actions';
import {useAppDispatch} from '../redux/hooks';
import {PokemonLink} from '../types';
import {FLAMING_RED, STANDARD_BORDER, STANDARD_TEXT} from '../util/colors';
import {AppRouteParamList} from '../util/navigation';

const ROW_HORIZONTAL_PADDING = 12;

type ListItemProps = {
  isFirst: boolean;
  linkUrl?: string | undefined;
} & React.ComponentProps<typeof PaperButton>;

const ListItem: React.FC<ListItemProps> = props => {
  const {isFirst = false, linkUrl = undefined} = props;

  const dispatch = useAppDispatch();

  const navigation = useNavigation<StackNavigationProp<AppRouteParamList>>();

  const handleSelectRow = () => {
    const selection: PokemonLink = {
      name: props.children as string,
      url: linkUrl ?? '',
    };
    console.log(`setting selection to: ${JSON.stringify(selection)}`);
    dispatch(setSelection(selection));
    navigation.navigate('Detail');
  };

  return (
    <Pressable
      onPress={handleSelectRow}
      style={[styles.row, isFirst ? styles.topRow : {}]}
      {...props}>
      <Text variant={'bodyLarge'} style={{color: FLAMING_RED}}>
        {props.children}
      </Text>
      {Platform.OS === 'android' && (
        <Ionicons
          name="caret-forward-sharp"
          size={18}
          color={STANDARD_TEXT}
          style={{position: 'absolute', right: 3}}
        />
      )}
    </Pressable>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  row: {
    position: 'relative',
    flexDirection: 'row',
    height: 50,
    borderBottomColor: STANDARD_BORDER,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
    paddingHorizontal: ROW_HORIZONTAL_PADDING,
    //backgroundColor: '#ff000033',
  },

  topRow: {
    borderTopColor: STANDARD_BORDER,
    borderTopWidth: 1,
  },
});
