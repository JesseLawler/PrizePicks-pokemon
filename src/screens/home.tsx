import React, {useEffect} from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import Collapsible from 'react-native-collapsible';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as Components from '../components/index';
import {
  addToSearchHistory,
  displaySearchResults,
  setNoSearchResults,
  setSearchString,
  toggleShowHistory,
  updateInternetConnection,
} from '../redux/actions';
import {useAppSelector, useAppDispatch} from '../redux/hooks';
import {InternetConnection, SAMPLE_POKEMON} from '../types';
import {
  FLAMING_RED,
  STANDARD_BACKGROUND,
  STANDARD_BORDER,
  STANDARD_TEXT,
} from '../util/colors';

const DEFAULT_SPRITE_WIDTH = 60;
const GENERATIONS = [
  'generation-i',
  'generation-ii',
  'generation-iii',
  'generation-iv',
  'generation-v',
  'generation-vi',
  'generation-vii',
  'generation-viii',
];
const MAX_SEARCH_HISTORY_HEIGHT = 270; // pixels
const MIN_SEARCH_HISTORY_HEIGHT = 60; // pixels
const MIN_SPRITE_DIMENSION = 25; // pixels
const POKEMON_API_URL_ROOT = 'https://pokeapi.co/api/v2/pokemon/';
const SCREEN_HORIZONTAL_PADDING = 12;

const isNumeric = (str: string) =>
  !isNaN(str as any) && !isNaN(parseFloat(str));

const HomeScreen = () => {
  let _searchHistoryScrollViewRef: ScrollView | null = null;

  const {width} = useWindowDimensions();

  const isLoading = useAppSelector(state => state.searchResultsIsLoading);
  const isInternetConnected = useAppSelector(
    state =>
      state.internetConnection.connectionType === 'unknown' || // If the connectionType is still 'unknown', we give the benefit of the doubt.
      state.internetConnection.isConnected,
  );
  const searchFailed = useAppSelector(state => state.searchFailed);
  const searchHistory = useAppSelector(state => state.searchHistory);
  const searchResult = useAppSelector(state => state.searchResult);
  const searchString = useAppSelector(state => state.searchString);
  const showHistory = useAppSelector(state => state.showHistory);
  const dispatch = useAppDispatch();

  useEffect(() => {
    NetInfo.fetch().then(state => {
      const conn: InternetConnection = {
        connectionType: state.type,
        isConnected: state.isConnected ?? false,
      };
      dispatch(updateInternetConnection(conn));
    });

    const unsubscribe = NetInfo.addEventListener(state => {
      const conn: InternetConnection = {
        connectionType: state.type,
        isConnected: state.isConnected ?? false,
      };
      dispatch(updateInternetConnection(conn));
    });

    return () => unsubscribe();
  }, [dispatch]);

  const doSearch = (query: string) => {
    console.log(`searching for "${query}"...`);
    dispatch(addToSearchHistory(query)); // Note: This starts the spinner, so it must be run before the API call.
    axios
      .get(POKEMON_API_URL_ROOT + query.toLowerCase() + '/', {
        //params: { myVar: 12345},
      })
      .then(function (response) {
        //console.log(`URL request success: ${JSON.stringify(response.data)}`);
        dispatch(displaySearchResults(response.data));
      })
      .catch(function (error) {
        console.log(`URL request error: ${error}`);
        dispatch(setNoSearchResults());
      })
      .finally(function () {
        // always executed
      });
  };

  const isSearchCompleted =
    searchString === searchHistory[0] && searchResult !== null;

  const isSearchEnabled = searchString !== '';

  const redoSearch = (query: string) => {
    dispatch(setSearchString(query));
    doSearch(query);
    dispatch(toggleShowHistory(false));
  };

  const searchIcon =
    Platform.OS === 'android'
      ? () => (
          <Ionicons
            name="search"
            size={24}
            color={isSearchEnabled && !isSearchCompleted ? 'white' : '#aaaaaa'}
          />
        )
      : () => <></>;

  const spritesPerRow = Math.floor(width / DEFAULT_SPRITE_WIDTH);

  const spriteVersions = (): string[] => {
    let images: string[] = [];
    for (let i = GENERATIONS.length - 1; i >= 0; i--) {
      let generation = GENERATIONS[i];
      if (searchResult?.sprites.versions.hasOwnProperty(generation)) {
        let batch = searchResult?.sprites.versions[generation];
        for (let j = 0; j < Object.keys(batch).length; j++) {
          let key = Object.keys(batch)[j];
          let url = batch[key].front_default;
          console.log(`url for sprite: ${url}`);
          images.push(url);
        }
      }
    }
    return images;
  };

  const spriteWidth = Math.round(width / spritesPerRow);

  const sprites = spriteVersions();

  return (
    <View style={styles.container}>
      <Collapsible
        collapsed={!showHistory}
        style={[styles.historyPanel, {width: width}]}>
        <Components.Text
          variant={'headlineSmall'}
          style={[styles.headline, {marginLeft: SCREEN_HORIZONTAL_PADDING}]}>
          search history
        </Components.Text>
        <ScrollView
          ref={ref => (_searchHistoryScrollViewRef = ref)}
          contentContainerStyle={{
            //backgroundColor: 'yellow'
            paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
          }}
          style={{borderBottomColor: STANDARD_BORDER, borderBottomWidth: 1}}>
          {searchHistory.map((item, index) => (
            <Components.Button
              mode={'outlined'}
              key={index}
              onPress={() => redoSearch(item)}>
              {item}
            </Components.Button>
          ))}
        </ScrollView>
      </Collapsible>
      <ScrollView
        contentContainerStyle={[
          styles.layoutArea,
          {width: width, paddingTop: Platform.OS === 'ios' ? 50 : 0},
        ]}>
        <View style={{paddingHorizontal: SCREEN_HORIZONTAL_PADDING}}>
          <Components.Text variant={'headlineSmall'} style={styles.headline}>
            find a pokemon
          </Components.Text>

          <Components.TextInput
            label="what's your favorite Pokemon?"
            //placeholder="What should we call you?"
            value={searchString}
            style={{marginBottom: 10}}
            onChangeText={(text: string) => {
              dispatch(setSearchString(text));
            }}
          />

          <Components.Button
            mode={'contained'}
            onPress={() => {
              if (isSearchEnabled) {
                doSearch(searchString);
              } else {
                Alert.alert(
                  `Please enter a Pokemon name. (No ideas? Try "${SAMPLE_POKEMON.name}".)`,
                );
              }
            }}
            icon={searchIcon}
            isProcessing={isLoading}
            labelStyle={{
              fontSize: 16,
              color:
                isSearchEnabled && !isSearchCompleted ? 'white' : '#aaaaaa',
            }}
            style={{
              backgroundColor:
                isSearchEnabled && !isSearchCompleted
                  ? FLAMING_RED
                  : '#ff000055',
              marginBottom: 10,
            }}>
            {searchString === ''
              ? 'search'
              : `search for ${searchString.trim()}`}
          </Components.Button>
        </View>

        {/*<Components.SegmentedButtons
          buttons={pokemon.types.map((item, index) => {
            let pokemonType = item as PokemonType;
            return {value: pokemonType.type.name, label: pokemonType.type.name};
          })}
          value={favoriteType}
          onValueChange={(selection: string) =>
            dispatch(setFavoriteType(selection))
          }
        />*/}

        <Components.Button
          disabled={searchHistory.length === 0}
          onPress={() => {
            dispatch(toggleShowHistory(!showHistory));
            _searchHistoryScrollViewRef?.flashScrollIndicators();
          }}
          labelStyle={{fontSize: 14}}>
          {showHistory ? 'hide' : 'show'} search history ({searchHistory.length}
          )
        </Components.Button>

        {searchFailed && (
          <Components.Text
            variant={'bodyLarge'}
            style={{color: STANDARD_TEXT, textAlign: 'center'}}>
            No results for "{searchString}".
          </Components.Text>
        )}

        {isSearchCompleted && (
          <View
            style={{
              width: width,
              marginBottom: 10,
            }}>
            <FastImage
              style={{
                height: Math.round(width / 2),
                width: width,
              }}
              source={{
                uri: searchResult.sprites.other.home.front_default, // 'https://unsplash.it/400/400?image=1',
                //headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />

            <Components.Text style={styles.subheading}>
              Sprite Versions ({sprites.length})
            </Components.Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 3,
                flexWrap: 'wrap',
                backgroundColor: 'white',
              }}>
              {sprites.map((url, index) => {
                const fileName = url.substring(url.lastIndexOf('/') + 1);
                let pixelNumber: string | Number = fileName.substring(
                  0,
                  fileName.indexOf('.'),
                );
                if (!isNumeric(pixelNumber.toString())) {
                  pixelNumber = DEFAULT_SPRITE_WIDTH;
                }
                if (Number(pixelNumber) < MIN_SPRITE_DIMENSION) {
                  pixelNumber = MIN_SPRITE_DIMENSION;
                }
                return (
                  <View
                    key={`sprite-${index}`}
                    style={{
                      height: spriteWidth,
                      width: spriteWidth,
                      alignItems: 'center',
                      justifyContent: 'center',
                      //backgroundColor: '#ff000022',
                    }}>
                    <FastImage
                      style={{
                        height: Number(pixelNumber),
                        width: Number(pixelNumber),
                      }}
                      source={{
                        uri: url,
                        //headers: {Authorization: 'someAuthToken'},
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </View>
                );
              })}
            </View>

            <Components.Text style={styles.subheading}>
              Abilities
            </Components.Text>

            {searchResult.abilities.map((item: any, index: number) => (
              <Components.ListItem
                key={`ability-${index}`}
                isFirst={index === 0}
                linkUrl={item.ability.url}>
                {item.ability.name}
              </Components.ListItem>
            ))}

            <Components.Text style={styles.subheading}>Moves</Components.Text>
            {searchResult.moves.map((item: any, index: number) => (
              <Components.ListItem
                key={`move-${index}`}
                isFirst={index === 0}
                linkUrl={item.move.url}>
                {item.move.name}
              </Components.ListItem>
            ))}

            <Components.Text style={styles.subheading}>Species</Components.Text>
            <Components.ListItem
              isFirst={true}
              linkUrl={searchResult.species.url}>
              {searchResult.species.name}
            </Components.ListItem>

            <Components.Text style={styles.subheading}>Types</Components.Text>
            {searchResult.types.map((item: any, index: number) => (
              <Components.ListItem
                key={`type-${index}`}
                isFirst={index === 0}
                linkUrl={item.type.url}>
                {item.type.name}
              </Components.ListItem>
            ))}
          </View>
        )}

        {!isInternetConnected && (Alert.alert('No internet connection!'), null)}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: STANDARD_BACKGROUND,
  },

  content: {
    color: STANDARD_TEXT,
    fontSize: 15,
    fontWeight: '100',
    opacity: 0.8,
    marginBottom: 20,
  },

  headline: {marginBottom: 7, marginTop: 20},

  historyPanel: {
    minHeight: MIN_SEARCH_HISTORY_HEIGHT,
    maxHeight: MAX_SEARCH_HISTORY_HEIGHT,
  },

  layoutArea: {
    paddingHorizontal: 0,
    justifyContent: 'flex-start',
  },

  subheading: {
    fontSize: 20,
    fontWeight: '100',
    color: STANDARD_TEXT,
    marginBottom: 3,
    marginTop: 25,
    marginLeft: SCREEN_HORIZONTAL_PADDING,
  },
});
