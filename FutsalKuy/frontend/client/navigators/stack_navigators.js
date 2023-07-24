import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from '../screens/detail';
import CreateEventScreen from '../screens/create_event';
import ListEvent from '../screens/ListEvent';
import PaymentScreen from '../screens/payment';
import Chat from '../screens/chat';

const Field = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="List Event" component={ListEvent} />
      <Stack.Screen name="Create Event" component={CreateEventScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}
export default Field;