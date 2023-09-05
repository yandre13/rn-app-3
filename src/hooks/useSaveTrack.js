import { useCallback } from 'react'
import { useLocation } from '../context/LocationProvider'
import { useTrack } from '../context/TrackProvider'
import { navigate } from '../navigationRef'

export const useSaveTrack = () => {
  const { createTrack } = useTrack()
  const {
    state: { locations, name },
    reset,
  } = useLocation()

  const saveTrack = useCallback(async () => {
    await createTrack(name, locations)
    reset()
    // navigate
    navigate('TrackList')
  }, [name, locations])

  return { saveTrack }
}
