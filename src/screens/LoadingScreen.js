import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useAuth } from '../context/AuthProvider'

const LoadingScreen = () => {
  const { tryLocalSignin } = useAuth()

  useEffect(() => {
    tryLocalSignin()
  }, [])

  return (
    <View>
      <Text>LoadingScreen</Text>
    </View>
  )
}

export default LoadingScreen
