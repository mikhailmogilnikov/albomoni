import { useCallback, useState } from 'react';
import {
  LoadScript,
  Autocomplete,
  GoogleMap,
  Marker,
  Libraries,
} from '@react-google-maps/api';
import { m } from 'framer-motion';
import { Input } from '@nextui-org/input';
import { PiFloppyDiskBold, PiMapPinBold } from 'react-icons/pi';
import { TGoogleSuggestion } from '../model/google-suggestion.type';
import { MapSkeleton } from './skeleton';

type Props = {
  setSelectedVariant: (variant: TGoogleSuggestion) => void;
  types?: '(cities)' | 'address';
  onSave?: () => void;
};

export const Map = ({
  setSelectedVariant,
  types = '(cities)',
  onSave,
}: Props) => {
  const [autocomplete, setAutocomplete] = useState<any>(null);
  const [position, setPosition] = useState({ lat: 55.7483, lng: 37.6171 });
  const [map, setMap] = useState(null);
  const [value, setValue] = useState('');

  const onLoad = useCallback((autocompleteInstance: any) => {
    setAutocomplete(autocompleteInstance);
  }, []);

  const onPlaceChanged = useCallback(() => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setPosition({ lat, lng });
        setMap((mapInstance: any) => {
          if (mapInstance) {
            mapInstance.panTo({ lat, lng });
          }
          return mapInstance;
        });
        setValue(place.formatted_address);
        setSelectedVariant(place);
      }
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  }, [autocomplete]);

  const onMapLoad = useCallback((mapInstance: any) => {
    setMap(mapInstance);
  }, []);

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_URL as string}
      libraries={['places'] as Libraries}
      loadingElement={<MapSkeleton onSave={onSave} />}
    >
      <Autocomplete
        className='-mt-4 flex items-center'
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        options={{
          types: [types],
        }}
      >
        <>
          <Input
            size='lg'
            startContent={<PiMapPinBold size={20} className='opacity-50' />}
            type='text'
            placeholder='Введите адрес'
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            classNames={{ input: 'font-medium' }}
          />
          {onSave && (
            <m.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
            >
              <PiFloppyDiskBold
                className='w-[25px] h-[25px] ml-2 cursor-pointer'
                onClick={onSave}
              />
            </m.div>
          )}
        </>
      </Autocomplete>
      <GoogleMap
        mapContainerClassName='w-full aspect-square md:aspect-video rounded-2xl'
        center={position}
        zoom={15}
        onLoad={onMapLoad}
      >
        <Marker position={position} />
      </GoogleMap>
    </LoadScript>
  );
};
