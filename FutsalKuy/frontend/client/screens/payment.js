import { WebView } from 'react-native-webview';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { useDispatch, useSelector } from 'react-redux'
import mainReducer from '../store/reducers/mainReducer';
export default function App() {
  const {pay, loadingpay} = useSelector(state => state.mainReducer)
  return (
    <>
    {loadingpay && <View><Text>Loading..</Text></View>}
    {!loadingpay && <WebView 
      style={styles.container}
      source={{ uri: pay.redirect_url }}
    />
    }
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});