import React from 'react'
import { Button, Input } from 'react-native-elements'
import Spacer from './Spacer'
import { useLocation } from '../context/LocationProvider'
import { useSaveTrack } from '../hooks/useSaveTrack'

const TrackForm = () => {
  const {
    state: { name, recording, locations },
    changeName,
    startRecording,
    stopRecording,
  } = useLocation()

  // console.log(locations)
  const { saveTrack } = useSaveTrack()

  return (
    <>
      <Spacer>
        <Input
          placeholder="Enter Track Name"
          value={name}
          onChangeText={changeName}
        />
      </Spacer>
      {recording ? (
        <Button title="Stop" onPress={stopRecording} />
      ) : (
        <Button title="Start Recording" onPress={startRecording} />
      )}
      {!recording && locations.length ? (
        <Spacer>
          <Button title="Save Recording" onPress={saveTrack} />
        </Spacer>
      ) : null}
    </>
  )
}

export default TrackForm
