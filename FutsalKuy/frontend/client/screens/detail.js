import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Headline } from 'react-native-paper';
import { Button, Flex, Pressable, Spacer, Avatar, NativeBaseProvider, Icon, Ionicons, FlatList, Box, AspectRatio, Center, Stack, Heading, HStack, VStack } from "native-base";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { detail } from '../store/actionCreators/mainCreators';
import { participantPost } from "../store/actionCreators/userCreators";
import { useRoute } from '@react-navigation/native';
import LottieView from 'lottie-react-native';


const DetailScreen = ({navigation}) => {

    //! UNTUK DETAIL
    const { field, loadingiField, fieldError } = useSelector((state) => state.mainReducer);
    const {user} = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    const route = useRoute()
    const { value } = route.params;
    let status_join = false
    let waiting = false
    useEffect(() => {
        dispatch(detail(value))
    }, [dispatch, value])

    const onPostPartisipant = () => {
        dispatch(participantPost({eventId: value, userId: user.id}))
        .then(() => {
            Alert.alert(("Success", "You have successfully join"))
        })
        .catch(() => {
            Alert.alert(("Cannot Join", "Partisipant are full or the event is running"))
        })
    }
    user.Events.find(el => {
        if (el.event_name === field.event_name  ) {
            status_join = true
        }
    })
    if(field.status == 'waiting'){
        waiting = true
    }
    return (
        <ScrollView>
            {/* {loadingiField && <Text>loading...</Text>} */}
            {loadingiField &&  <LottieView source={require('./../assets/loading.json')} autoPlay loop />}
            {!loadingiField && fieldError && <Text>{JSON.stringify(fieldError)}</Text>}
            {!loadingiField && !fieldError && (
                <Box alignItems="center" style={{ marginTop: 30, marginBottom: 20 }}>
                    <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                        borderColor: "coolGray.600",
                        backgroundColor: "gray.700"
                    }} _web={{
                        shadow: 2,
                        borderWidth: 0
                    }} _light={{
                        backgroundColor: "gray.50"
                    }}>
                        <Box>
                        </Box>
                        <Stack p="4" space={3}>
                            <Stack space={2}>
                                <Heading size="md" ml="-1">
                                    {field.event_name}
                                </Heading>
                                <Text fontSize="xs" _light={{
                                    color: "violet.500"
                                }} _dark={{
                                    color: "violet.400"
                                }} fontWeight="500" ml="-0.5" mt="-1">
                                    {field.Field.field_name}
                                </Text>
                                {/* <Text fontSize="xs" _light={{
                                    color: "violet.500"
                                }} _dark={{
                                    color: "violet.400"
                                }} fontWeight="500" ml="-0.5" mt="-1">
                                    
                                </Text> */}
                            </Stack>
                            <HStack alignItems="center" space={4} justifyContent="space-between">
                                <HStack style={{ marginTop: 10, marginBottom: 10 }} alignItems="center">
                                    {/* price */}
                                    <Text color="coolGray.600" _dark={{
                                        color: "warmGray.200"
                                    }} fontWeight="400">
                                        RP. {field.Field.price}
                                    </Text>
                                </HStack>
                                {/* shecedule */}
                                {/* <Heading size="md" ml="-1">
                                Senin-minggu, 13.00, 17.00, 21.00
                            </Heading> */}
                                <Text fontWeight="400">
                                    {field.Field.schedule}
                                </Text>
                            </HStack>
                            {/* <Heading size="md" ml="-1">
                                {field.Field.Provider.provider_name}
                            </Heading> */}
                            <Text style={{ marginTop: 10, marginBottom: 10 }} fontWeight="400">
                                {field.Field.Provider.location}
                            </Text>
                        </Stack>
                    </Box>
                    <Stack direction={{
                        base: "column",
                        md: "row"
                    }} space={4}>
                        { status_join ?
                        <Button style={{ marginTop: 20, marginBottom: 20 }} onPress={() => { navigation.navigate('Chat', {room: field.event_name})}} >
                        Chat
                        </Button>
                        :
                        <Button style={{ marginTop: 20, marginBottom: 20 }} onPress={onPostPartisipant} >
                            Join Group
                        </Button>
                        }
                        <Heading fontSize="xl" p="4" pb="3">
                            Participant
                        </Heading>
                    </Stack>
                    <Box>
                        
                        {field.Users.map(el => {
                            return (
                                <Box borderBottomWidth="1" _dark={{
                                    borderColor: "gray.600"
                                }} borderColor="coolGray.200" pl="4" pr="5" py="2">
                                    <HStack space={3} justifyContent="space-between">
                                        {/* <Avatar size="48px" source={{
                                    uri: item.avatarUrl
                                }} /> */}
                                        <VStack key={el.id}>
                                            <Text _dark={{
                                                color: "warmGray.50"
                                            }} color="coolGray.800" bold>
                                                {el.username}
                                            </Text>
                                        </VStack>
                                        <Spacer />
                                        <Text fontSize="xs" _dark={{
                                            color: "warmGray.50"
                                        }} color="coolGray.800" alignSelf="flex-start">
                                            {el.Participant.role}
                                        </Text>
                                    </HStack>
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
            )}
        </ScrollView>
    )
}
export default DetailScreen;

