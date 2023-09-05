import React from 'react'
import MapView, { Circle, Polyline } from 'react-native-maps'
import { useLocation } from '../context/LocationProvider'
import { ActivityIndicator } from 'react-native'

const Map = () => {
  const {
    state: { currentLocation, locations },
  } = useLocation()
  // console.log(currentLocation)
  if (!currentLocation) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />
  }
  return (
    <MapView
      initialRegion={{
        // latitude: 37.33233,
        // longitude: -122.03121,
        // latitude: -12.0259729,
        // longitude: -77.0938083,
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      region={{
        // latitude: -12.0259729,
        // longitude: -77.0938083,
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      style={{ height: 300 }}
    >
      <Circle
        center={currentLocation.coords}
        radius={30}
        strokeColor="rgba(158,158,255,1.0)"
        fillColor="rgba(158,158,255,0.3)"
      />
      <Polyline coordinates={locations.map((loc) => loc.coords)} />
    </MapView>
  )
}

export default Map
