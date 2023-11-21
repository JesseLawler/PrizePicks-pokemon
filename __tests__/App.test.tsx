/**
 * @format
 */

import 'react-native';

// trivially stupid test
const isCity = (city: string) => {
  const cities = ['Vienna', 'San Juan', 'San Francisco', 'Corvallis'];
  return cities.includes(city);
};

test('Corvallis is known to be a city.', () => {
  expect(isCity('Vienna')).toBeTruthy();
});
