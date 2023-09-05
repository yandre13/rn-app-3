import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements'
import Spacer from '../components/Spacer'
import { useAuth } from '../context/AuthProvider'
import { FontAwesome } from '@expo/vector-icons'

const AccountScreen = () => {
  const { signout } = useAuth()
  return (
    <SafeAreaView>
      <Text>AccountScreen</Text>
      <Spacer>
        <Button title="Sign Out" onPress={signout} />
      </Spacer>
    </SafeAreaView>
  )
}

AccountScreen.navigationOptions = {
  title: 'Account',
  tabBarIcon: <FontAwesome name="gear" size={20} color="#fff" />,
}

export default AccountScreen
