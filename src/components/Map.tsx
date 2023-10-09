import React, { useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';
import { 
    GoogleMap, 
    useJsApiLoader, 
    Marker,
    DirectionsRenderer
} from '@react-google-maps/api';

import { RouteMarkerType } from '../types';
import { defaultContainerStyle, defaultMapCenter, mapDefaultOptions } from '../consts/mapDefaults';

interface MapProps {
    markers: RouteMarkerType[],
    handleSetMarker?: (e: google.maps.MapMouseEvent) => void,
    setDistance?: Dispatch<SetStateAction<number>>
}

const Map: React.FC<MapProps> = ({markers, handleSetMarker, setDistance}) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyDSY6LmKD99rjwOuqyAKT7Qbv3LizZaXEc'
    })

    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [directions, setDirections] = useState(null);

    const onLoad = useCallback((map: google.maps.Map) => {
        setMap(map);
    }, []);

    const onUnmount = useCallback(() => {
        setMap(null)
    }, []);
    
    useEffect(() => {
        if (!isLoaded) return;
        if (markers.length > 1) {
            const DirectionsService = new google.maps.DirectionsService();
            // Getting the route on the map rendered && distance
            DirectionsService.route({
                origin: markers[0],
                destination: markers[markers.length - 1],
                waypoints: markers.slice(1, markers.length - 1).map(marker => ({ location: marker, stopover: true })),
                travelMode: google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                console.log(result, status);
                if (status === google.maps.DirectionsStatus.OK) {
                    setDirections(result);

                    const distance = result.routes[0].legs.reduce((acc, item) => acc += item.distance.value, 0);
                    setDistance && setDistance(Number((distance / 1000).toFixed(2)));
                } else {
                    console.error(result);
                }
            });
        }
    }, [markers, isLoaded, setDistance]);

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={defaultContainerStyle}
        center={defaultMapCenter}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapDefaultOptions}
        onClick={handleSetMarker}
      >
        {map && markers.length === 1 && (
            <Marker position={markers[0]} />
        )}

        {directions && (
            <DirectionsRenderer 
                directions={directions}
            />
        )}
      </GoogleMap>
  ) : <div>Map is loading...</div>
}

export default React.memo(Map);