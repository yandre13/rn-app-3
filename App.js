import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import SignupScreen from './src/screens/SignupScreen'
import SigninScreen from './src/screens/SigninScreen'
import AccountScreen from './src/screens/AccountScreen'
import TrackCreateScreen from './src/screens/TrackCreateScreen'
import TrackDetailScreen from './src/screens/TrackDetailScreen'
import TrackListScreen from './src/screens/TrackListScreen'
import { AuthProvider } from './src/context/AuthProvider'
import { setNavigator } from './src/navigationRef'
import LoadingScreen from './src/screens/LoadingScreen'
import { LocationProvider } from './src/context/LocationProvider'
import { TrackProvider } from './src/context/TrackProvider'
import { FontAwesome } from '@expo/vector-icons'

const trackListflow = createStackNavigator({
  TrackList: TrackListScreen,
  TrackDetail: TrackDetailScreen,
})

trackListflow.navigationOptions = {
  title: 'Tracks',
  tabBarIcon: <FontAwesome name="th-list" size={20} color="#fff" />,
}

const switchNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),
  mainFlow: createMaterialBottomTabNavigator({
    trackListFlow: trackListflow,
    TrackCreate: TrackCreateScreen,
    Account: AccountScreen,
  }),
})

const App = createAppContainer(switchNavigator)

export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App ref={(navigator) => setNavigator(navigator)} />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  )
}
