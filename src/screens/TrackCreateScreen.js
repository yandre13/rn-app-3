import '../_mockLocation'
import { SafeAreaView } from 'react-native'
import React, { useState, useCallback } from 'react'
import Map from '../components/Map'
import { Text } from 'react-native-elements'
import { useLocation } from '../context/LocationProvider'
import { useUserLocation } from '../hooks/useUserLocation'
import { withNavigationFocus } from 'react-navigation'
import TrackForm from '../components/TrackForm'
import { FontAwesome } from '@expo/vector-icons'

const TrackCreateScreen = ({ isFocused }) => {
  const { state, addLocation } = useLocation()

  const newCallback = useCallback(
    (location) => addLocation(location, state.recording),
    [state.recording]
  )
  const { err } = useUserLocation(isFocused || state.recording, newCallback)

  console.log(state.recording)
  return (
    <SafeAreaView>
      <Text h1>TrackCreateScreen: </Text>
      <Map />
      {err ? <Text>Please enable location services</Text> : null}
      <TrackForm />
    </SafeAreaView>
  )
}

TrackCreateScreen.navigationOptions = {
  title: 'Add Track',
  tabBarIcon: <FontAwesome name="plus" size={20} color="#fff" />,
}

export default withNavigationFocus(TrackCreateScreen)
