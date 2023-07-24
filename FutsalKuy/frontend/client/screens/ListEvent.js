import { Button, Image, NativeBaseProvider, useTheme, FlatList, Fab, Icon, AntDesign, Box, AspectRatio, Center, Stack, Heading, HStack, VStack, Text, } from "native-base";
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent } from '../store/actionCreators/mainCreators';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import PagerView from 'react-native-pager-view';
import PermissionErrorPage from '../components/PermissionErrorPage';
import { profilClient } from "../store/actionCreators/userCreators";
import { getData } from "../lib/asyncStorage";
// import Loading from "../lib/loading";
import Loading from "../lib/loading";

const MapScreen = ({ navigation }) => {
  const {events, eventsLoading, eventsError} = useSelector(state => state.mainReducer);
  const dispatch = useDispatch();
  // const {user} = useSelector(state => state.userReducer)

  const [hasPermission, setHasPermission] = useState(null);
  const [location, setLocation] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    dispatch(getEvent())
  }, [dispatch]);


  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setHasPermission(status === 'granted');
      setLocation(await Location.getCurrentPositionAsync());
    })();
  });

  const handleOnPageSelected = (event) => {
    const markerIndex = event.nativeEvent.position;
    mapContainer.current.animateToRegion(
      {
        latitude: parseFloat(events?.Result[markerIndex].Field.latitude),
        longitude: parseFloat(events?.Result[markerIndex].Field.longitude),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      },
      1000
    );
  };

  return (
    <>
      {eventsLoading && <Loading></Loading>}
      {!eventsLoading && eventsError && <Text>eventsError</Text>}
      {!hasPermission && <PermissionErrorPage />}
      {hasPermission && !eventsLoading && !eventsError && (
        <Box flex="1">
          <MapView
            ref={mapContainer}
            style={{ flex: 1 }}
            showsUserLocation={true}
            showsCompass={true}
            userInterfaceStyle="dark"
            initialRegion={
              location && {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
              }
            }
          >
            {events.Result?.map((marker) => {
              return (
                <Marker
                  key={marker.id}
                  coordinate={{
                    latitude: parseFloat(marker.Field.latitude),
                    longitude: parseFloat(marker.Field.longitude)
                  }}
                />
              );
            })}
          </MapView>
          <PagerView style={{ flex: 1 }} initialPage={0} onPageSelected={handleOnPageSelected}>
            {events.Result?.map((marker) => {
              return (
                <View key={marker.id} style={{ justifyContent: 'center' }}>
                  {/* button CreateEvent */}
                  <Box alignItems="center">
                    <Button
                      onPress={() => { navigation.navigate('Create Event') }}
                    >Add Event ⚽</Button>
                  </Box>
                  {/* button end */}
                  <Box
                    flex="1"
                    m="5"
                    justifyContent="center"
                    borderWidth="1"
                    borderColor="gray.500"
                    borderRadius="md"
                  >
                    <Button bg="violet.500" _dark={{
                      bg: "violet.400"
                    }} _text={{
                      color: "warmGray.50",
                      fontWeight: "700",
                      fontSize: "xs"
                    }} position="absolute" bottom="0" px="3" py="1.5"
                      onPress={() => { navigation.navigate('Detail', {value: marker.Field?.id})}}
                    >Detail
                    </Button>
                    <VStack px="6" space="5">
                      <Box>
                        <Heading size="md">{marker.event_name}</Heading>
                      </Box>
                      <Box>
                        <Text italic>{marker.status}</Text>
                      </Box>
                      <Box>
                        <Text>{marker.time}</Text>
                      </Box>
                      <Box>
                        <Text>Field : {marker.Field.field_name}</Text>
                      </Box>
                    </VStack>
                  </Box>
                </View>
              );
            })}
          </PagerView>
        </Box>
      )}
    </>
  );
};

export default MapScreen;











// import { View, Text,  StyleSheet, ScrollView } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Headline } from 'react-native-paper';
// import { Button, Image, NativeBaseProvider, useTheme, FlatList, Box, AspectRatio, Center, Stack, Heading, HStack } from "native-base";

// const MyFieldList = ({navigation}) => {

//   return (
//     <ScrollView>
//     <Box alignItems="center">
//       <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
//       borderColor: "coolGray.600",
//       backgroundColor: "gray.700"
//     }} _web={{
//       shadow: 2,
//       borderWidth: 0
//     }} _light={{
//       backgroundColor: "gray.50"
//     }}>
//         <Box>
//           <AspectRatio w="100%" ratio={16 / 9}>
//             {/* <Image source={{
//             uri: "https://obs.line-scdn.net/0huTKx09KFKnt2AQJk0SVVLExXKRRFbTl4Ejd7ZSZvdE8PN2R9GmFnTloDd0NfZW0lGDRiGlsDMUoIYmh4SmBn/w644"
//           }} alt="image" /> */}
//           </AspectRatio>
//           <Box alignItems="center">
//           <Button style={{ marginTop:20, marginBottom:20 }}
//           onPress={() => {navigation.navigate('ListField')}}
//           >Add Event ⚽</Button>
//           </Box>
//           {/* <Button bg="violet.500" _dark={{
//           bg: "violet.400"
//         }} _text={{
//           color: "warmGray.50",
//           fontWeight: "700",
//           fontSize: "xs"
//         }} position="absolute" bottom="0" px="3" py="1.5"
//           onPress={() => {navigation.navigate('Detail')}}
//           >DETAIL</Button> */}
//         </Box>
//         <Stack p="4" space={3}>
//           <Stack space={2}>
//             {/* Field_name */}
//             <Heading size="md" ml="-1">
//               {/* Gor Senayan City */}
//             </Heading>
//             {/* type_field */}
//             <Text fontSize="xs" _light={{
//             color: "violet.500"
//           }} _dark={{
//             color: "violet.400"
//           }} fontWeight="500" ml="-0.5" mt="-1">
//               {/* VIP */}
//             </Text>
//           </Stack>
//           {/* provieder */}
//           <Text fontWeight="400">
//             {/* PSSI */}
//           </Text>
//           <HStack alignItems="center" space={4} justifyContent="space-between">
//             <HStack alignItems="center">
//               {/* price */}
//               <Text color="coolGray.600" _dark={{
//               color: "warmGray.200"
//             }} fontWeight="400">
//                 {/* Rp.150.000 */}
//               </Text>
//             </HStack>
//           </HStack>
//         </Stack>
//       </Box>
//     </Box>
//     </ScrollView>
//   )
// }
// const styles = StyleSheet.create({
//   container:{
//     flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#cffafe'
//   }
// });
// export default MyFieldList;