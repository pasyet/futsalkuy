import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddEvent from '../screens/create_event';
import ListEvent from '../screens/ListEvent';
import { View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from 'native-base';

const StackAddEvent = ({ navigation }) => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="List_Event"
                component={ListEvent}
                options={{
                    title: 'ListEvent',
                    headerRight: () => (
                        <View style={{ marginRight: 10 }}>
                            <Ionicons name="calendar-outline" size={24} onPress={() => navigation.navigate('ListField')}></Ionicons>
                        </View>
                    ),
                }}
            />
            <Stack.Screen name="ListField" component={AddEvent} />
        </Stack.Navigator>
    );
}
export default StackAddEvent;