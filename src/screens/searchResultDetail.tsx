import React from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {WebView} from 'react-native-webview';

import {useAppSelector} from '../redux/hooks';
import {STANDARD_BACKGROUND} from '../util/colors';

const DEFAULT_URL = 'https://reactnative.dev/';

const SearchResultDetail = () => {
  const {width} = useWindowDimensions();

  const selection = useAppSelector(state => state.selection);

  /*
  useLayoutEffect(() => {
    navigation.setOptions({
      title: selection?.name ?? '',
      //headerLeft: () => backButton,
    });
  }, []);
  */

  return (
    <WebView
      source={{uri: selection?.url ?? DEFAULT_URL}}
      style={[styles.container, {width: width}]}
    />
  );
};

export default SearchResultDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: STANDARD_BACKGROUND,
  },
});
