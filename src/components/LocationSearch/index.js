import React, {useRef, useEffect} from 'react';
import {Text} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import PropTypes from 'prop-types';
// import Config from 'react-native-config';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

import styles from './styles';

const LocationSearch = props => {
  const {
    onChangeLocation,
    defaultLocation,
    label,
    textInputProps,
    panSearch,
    value,
    types,
    nearbyPlacesAPI,
    populateWithCurrentLocation,
  } = props;
  const searchbar = useRef();

  useEffect(() => {
    if (populateWithCurrentLocation) {
      const init = async () => {
        const authorization = await Geolocation.requestAuthorization(
          'whenInUse',
        );
        if (authorization === 'granted') {
          Geolocation.getCurrentPosition(
            async position => {
              console.log(position);
              // eslint-disable-next-line no-shadow
              const {latitude, longitude} = position.coords;
              const result = await Geocoder.from(latitude, longitude);
              console.log(result);
              const locality = result.results.find(
                item =>
                  item.types.indexOf('locality') !== -1 ||
                  item.types.indexOf('administrative_area_level_3') !== -1,
              );
              if (locality) {
                console.log(locality);
                searchbar.current.setAddressText(locality.formatted_address);
                onChangeLocation(
                  {description: locality.formatted_address},
                  locality,
                );
              }
            },
            error => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 10000,
              distanceFilter: 250,
            },
          );
        }
      };

      init();
    }
  }, []);

  useEffect(() => {
    searchbar.current.setAddressText(value);
  }, [value]);

  useEffect(() => {
    searchbar.current.setAddressText(panSearch);
  }, [panSearch]);

  return (
    <>
      {label != null && <Text style={styles.label}>{label}</Text>}
      <GooglePlacesAutocomplete
        ref={searchbar}
        textInputProps={textInputProps}
        placeholder="Address"
        minLength={2} // minimum length of text to search
        autoFocus={false}
        listViewDisplayed={'auto'} // true/false/undefined
        fetchDetails
        renderDescription={row =>
          row.description || row.formatted_address || row.name
        } // custom description render
        onPress={(location, details) => {
          onChangeLocation(location, details);
        }}
        getDefaultValue={() => defaultLocation}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          // key: Config.GOOGLE_API_KEY,
          // key: 'AIzaSyDn35ByhPquejOCnGWaP7ekuyVs_63BodQ',
          key: 'AIzaSyB93u7SsuRzW0cy-PJ6WEIG4RgJHa8f-p0',
          language: 'en', // language of the results
          components: 'country:us',
          types: 'address', // default: 'geocode' '(regions)'/'(cities)'/'geocode'/'address'/'establishment';
        }}
        enablePoweredByContainer={false}
        styles={{
          textInputContainer: styles.textInputContainer,
          textInput: styles.textInput,
          row: styles.row,
        }}
        // currentLocation // Will add a 'Current location' button at the top of the predefined places list
        // currentLocationLabel="Current location"
        nearbyPlacesAPI={nearbyPlacesAPI} // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        GooglePlacesDetailsQuery={{
          fields: 'address_component,name,geometry,formatted_address,place_id',
        }}
        filterReverseGeocodingByTypes={[
          'locality',
          'administrative_area_level_3',
        ]}
      />
    </>
  );
};

LocationSearch.propTypes = {
  onChangeLocation: PropTypes.func,
  defaultLocation: PropTypes.string,
  panSearch: PropTypes.string,
  label: PropTypes.string,
  textInputProps: PropTypes.object,
  style: PropTypes.object,
  types: PropTypes.string,
  nearbyPlacesAPI: PropTypes.string,
  populateWithCurrentLocation: PropTypes.bool,
};

LocationSearch.defaultProps = {
  onChangeLocation: () => {},
  defaultLocation: '',
  panSearch: '',
  label: null,
  textInputProps: undefined,
  style: null,
  types: 'establishment',
  nearbyPlacesAPI: 'GooglePlacesSearch',
  populateWithCurrentLocation: false,
};

export default LocationSearch;
