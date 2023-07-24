import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditProfilScreen from '../screens/edit_profil';
import InfoUser from '../screens/info_user';
import { View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from 'native-base';
import Chat from '../screens/chat';

const StackProfil = ({navigation}) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen 
      name="InfoProfil" 
      component={InfoUser} 
      options={{
        title: 'Profil',
        headerRight: () => (
          <View style={{marginRight: 10}}>
            <Ionicons name="pencil" size={24} onPress={() => navigation.navigate('EditProfil')}></Ionicons>
          </View>
        ),
      }}
      />
      <Stack.Screen name="EditProfil" component={EditProfilScreen} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}
export default StackProfil;