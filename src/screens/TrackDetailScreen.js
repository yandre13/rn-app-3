import React, { useMemo } from 'react'
import { useTrack } from '../context/TrackProvider'
import { Text } from 'react-native-elements'

import MapView, { Polyline } from 'react-native-maps'

const TrackDetailScreen = ({ navigation }) => {
  const id = navigation.getParam('_id')
  const { state } = useTrack()

  const track = useMemo(() => {
    return state.tracks.find((t) => t._id === id)
  }, [id])
  return (
    <>
      <Text h1>{track.name}</Text>
      <MapView
        style={{ height: 300 }}
        initialRegion={{
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
          ...track.locations[0].coords,
        }}
      >
        <Polyline
          coordinates={track.locations.map((loc) => loc.coords)}
          strokeWidth={3}
        />
      </MapView>
    </>
  )
}

export default TrackDetailScreen
