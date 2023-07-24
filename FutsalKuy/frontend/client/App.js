import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import ContentScreens from './navigators/tab_navigators';
import LoginScreen from './screens/login';
import RegisterScreen from './screens/register';
import store from './store/store.js'
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import { getData } from './lib/asyncStorage';


const App = () => {
  const Stack = createNativeStackNavigator();
  const [token, setToken] = useState(false)

  return (
  <Provider store={store}>
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Content" component={ContentScreens} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  </Provider>
  );
};

export default App;

