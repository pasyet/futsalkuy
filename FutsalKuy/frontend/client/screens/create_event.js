import { View, Text, StyleSheet, ScrollView, Platform, StatusBar, Alert } from 'react-native';
import { useState, useRef, useEffect } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Headline } from 'react-native-paper';
import { Select, FormControl, service, WarningOutlineIcon, CheckIcon, Button, Image, NativeBaseProvider, Input, FlatList, Box, AspectRatio, Center, Stack, Heading, HStack } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from 'react-redux'
import { createEvent } from '../store/actionCreators/mainCreators';

const CreateEventScreen = ({ navigation }) => {
  const {user} = useSelector(state => state.userReducer)
  //! date
  const [eventName, setEventName] = useState('')
  const [field, setField] = useState('')
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('Choose date');

  const dispatch = useDispatch()
  const onChange = (event, selectDate) => {
    const curentDate = selectDate || date;
    setShow(Platform.OS === 'ios');
    setDate(curentDate);

    let tempDate = new Date(curentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    setText(fDate)
  }

  const showMode = (curentMode) => {
    setShow(true)
    setMode(curentMode)
  };
  //! date end

  let [service, setService] = useState("");

  //! untuk Button Payment
  const onPayment = () => {
    // console.log({event_name: eventName, time: service, date, fieldId: field, userId: user.id});
    dispatch(createEvent({event_name: eventName, time: service, date, fieldId: field, userId: user.id}))
    .then(() => {
      navigation.navigate("Payment")
    })
    .catch((err) => {
      console.log('error create');
    })
    // navigation.navigate("Payment")
  }
  const myRef = useRef({});
  useEffect(() => {
    const styleObj = {
      backgroundColor: "#facc15",
      borderColor: "#CA8A04",
      borderWidth: 1,
      borderRadius: 4
    }; //@ts-ignore

    myRef.current.setNativeProps({
      style: styleObj
    });
  }, [myRef]);

  return (
    <ScrollView>
      <Center>
        <Box style={{ marginTop: 30, marginBottom: 20 }} w="3/4" maxW="300">

          <Heading>
            <Button size="sm" variant={"solid"} _text={{
              color: "#1F2937"
            }} ref={myRef} px="3" onPress={onPayment}>
              Payment 💳
            </Button>
          </Heading>
          
          <FormControl.Label>Event Name</FormControl.Label>
          <Input 
          value={eventName}
          onChangeText={setEventName}
          placeholder={'Input Event Name'}
          />
          
          <FormControl.Label style={{ marginTop: 20, marginBottom: 20 }}>Field</FormControl.Label>
          <Select selectedValue={field} minWidth="200" accessibilityLabel="Choose Field" placeholder="Choose field" _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />
          }} mt={1} onValueChange={itemValue => setField(itemValue)}>
            <Select.Item label="Elang Futsal" value="1" />
            <Select.Item label="Futsal Cilandak Sport Centre" value="2" />
          </Select>

          <FormControl.Label style={{ marginTop: 20, marginBottom: 20 }}>Time</FormControl.Label>
          <Select selectedValue={service} minWidth="100" accessibilityLabel="Choose Time" placeholder="Choose time" _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />
          }} mt={1} onValueChange={itemValue => setService(itemValue)}>
            <Select.Item label="13.00 WIB" value="13.00 WIB"/>
            <Select.Item label="17.00 WIB" value="17.00 WIB"/>
            <Select.Item label="21.00 WIB" value="21.00 WIB"/>
          </Select>

          <FormControl.Label style={{ marginTop: 20, marginBottom: 20 }}> Date 📅 </FormControl.Label>
          <Stack space={4} w="75%">
            <Input variant="underlined" placeholder="Choose date" >{text}</Input>
          </Stack>
          <Box alignItems="center">
            <Button style={{ marginTop: 20, marginBottom: 20 }} minWidth="200" colorScheme="secondary" size="sm" title="DatePicker" onPress={() => showMode('date')} >Choose</Button>
          </Box>

          {show && (
            <DateTimePicker
              testID='date'
              value={date}
              mode={mode}
              is24Hour={true}
              display='default'
              onChange={onChange}
            />)}
        </Box>
      </Center>
    </ScrollView>
  )
}
export default CreateEventScreen;