import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('infouser', jsonValue)
  } catch (e) {
    // saving error
  }
}

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('infouser')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
}
export const clearAll = async () => {
  try {
    await AsyncStorage.clear()
  } catch(e) {
    // clear error
  }
  console.log('Clear AsyncStorage Done.')
}


