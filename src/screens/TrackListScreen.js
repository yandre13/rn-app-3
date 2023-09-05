import React from 'react'
import { NavigationEvents } from 'react-navigation'
import { useTrack } from '../context/TrackProvider'
import { ListItem, Text } from 'react-native-elements'
import { FlatList, TouchableOpacity } from 'react-native'

const TrackListScreen = ({ navigation }) => {
  const { state, fetchTracks } = useTrack()

  return (
    <>
      <NavigationEvents onWillFocus={fetchTracks} />
      <Text h3>TrackListScreen</Text>
      <FlatList
        data={state.tracks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('TrackDetail', { _id: item._id })
              }}
            >
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          )
        }}
      />
    </>
  )
}

export default TrackListScreen
