import { Link } from '@react-navigation/native';
import {View, SafeAreaView, StyleSheet, Button} from 'react-native';
import {
  Avatar,
  Title,
  Text,
} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {  useSelector } from 'react-redux';
import { clearAll } from '../lib/asyncStorage';

const InfoUser = ({navigation}) => {
  const {user} = useSelector(state => state.userReducer)
  const onLogOut = () => {
    clearAll()
    .then(() => {
      navigation.navigate('Login')
      console.log("Log Out sukses", user.email);
    })
    .catch((err) => {
      console.log(err);
    })
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image 
            source={{
              uri: 'https://i.pinimg.com/736x/47/e7/b4/47e7b4d14579225fa58d893cc485bfb2.jpg',
            }}
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{user.username}</Title>
          </View>
        </View>
      </View>
      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Ionicons name="mail" size={24}></Ionicons>
          <Text style={styles.textInfo}>{user.email}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="call" size={24}></Ionicons>
          <Text style={styles.textInfo}>{user.phoneNumber}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="location" size={24}></Ionicons>
          <Text style={styles.textInfo}>{user.address}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="list" size={24}></Ionicons>
          <Text style={styles.textInfo}>My Events</Text>
        </View>
          {user.Events.map(el => {
            return (
              <View style={styles.row2}>
              <Ionicons name="football" size={24}></Ionicons>
              {/* <Text key={el.id} style={styles.textInfo}>{el.event_name} as {el.Participant.role}</Text> */}
              <Link to={{ screen: 'Chat', params: { room: el.event_name} }}>
              <Text key={el.id} style={styles.textInfo}>{el.event_name} as {el.Participant.role}</Text>
              </Link>
              </View>
            )
          })}
          
      
      </View>
      <View style={styles.footer}>
        <Button
          style={{marginTop: 40}}
          title={'Log Out'}
          onPress={onLogOut}
        />
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
    marginTop: 25
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  row2: {
    marginLeft: 30,
    flexDirection: 'row',
    marginBottom: 10,
  },
  textInfo: {
    color:"#777777", 
    marginLeft: 20, 
    fontSize: 18,
    marginBottom: 15
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  }
});
export default InfoUser;
