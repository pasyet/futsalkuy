import ChatScreen from "../screens/chat";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Field from "./stack_navigators";
import StackProfil from "./stack_navigator_profil";
// import StackAddEvent from "./stack_Nav_AddEvent";

const ContentScreens = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
              case 'Profil':
                iconName = focused ? 'person' : 'person-outline';
                break;
              case 'Field':
                iconName = focused ? 'navigate' : 'navigate-outline';
                break;
              case 'Chat':
                iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                break;
              default:
                break;
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        };
      }}
    >
      <Tab.Screen name="Field" component={Field} options={{ headerShown: false }}/>
      <Tab.Screen 
        name="Profil" 
        component={StackProfil}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  )
}
export default ContentScreens;