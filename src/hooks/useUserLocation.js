import { useState, useEffect } from 'react'
import {
  requestForegroundPermissionsAsync,
  watchPositionAsync,
  Accuracy,
} from 'expo-location'

export const useUserLocation = (shouldTrack, callback) => {
  const [err, setErr] = useState(null)

  useEffect(() => {
    let subscription
    const startWatching = async () => {
      try {
        const { granted } = await requestForegroundPermissionsAsync()
        if (!granted) {
          throw new Error('Location permission not granted')
        }
        subscription = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          (location) => {
            // console.log('#########', location)
            callback(location)
          }
        )
      } catch (e) {
        console.log(e.message)
        setErr(e)
      }
    }
    if (shouldTrack) {
      startWatching()
    } else {
      subscription?.remove()
      subscription = null
    }
    return () => {
      if (subscription) {
        subscription.remove()
      }
    }
  }, [shouldTrack, callback])

  return {
    err,
  }
}
