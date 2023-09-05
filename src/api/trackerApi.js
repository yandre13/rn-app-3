import AsyncStorage from '@react-native-async-storage/async-storage'

const trackerApi = async () => {
  const url = 'https://1958-38-25-28-3.ngrok-free.app'

  const token = await AsyncStorage.getItem('token')
  console.log('token', token)

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }

  const auth = async (email, password, type = 'signin') => {
    const response = await fetch(`${url}/${type}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email, password }),
    })
    const data = await response.json()

    return data
  }

  const track = async (name, locations) => {
    const response = await fetch(`${url}/tracks`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name, locations }),
    })
    const data = await response.json()

    return data
  }

  const tracks = async () => {
    const response = await fetch(`${url}/tracks`, {
      method: 'GET',
      headers,
    })
    const data = await response.json()

    return data
  }

  return { auth, track, tracks }
}

export default trackerApi
