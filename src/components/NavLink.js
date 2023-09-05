import { TouchableOpacity } from 'react-native'
import React from 'react'
import Spacer from './Spacer'
import { Text } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

const MyNavLink = ({ navigation, to, text }) => {
  const navigateTo = () => {
    navigation.navigate(to)
  }
  return (
    <TouchableOpacity onPress={navigateTo}>
      <Spacer>
        <Text style={{ color: 'blue' }}>{text}</Text>
      </Spacer>
    </TouchableOpacity>
  )
}

const NavLink = withNavigation(MyNavLink)

export default NavLink
