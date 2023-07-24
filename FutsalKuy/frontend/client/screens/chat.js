import React, {
  useState,
  useLayoutEffect,
  useCallback
} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot
} from 'firebase/firestore';
import { database } from '../config/firebase';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';


export default function Chat() {
  const { user } = useSelector(state => state.userReducer)
  const [messages, setMessages] = useState([]);
  const route = useRoute()
  const { room } = route.params;
  useLayoutEffect(() => {
    
    const collectionRef = collection(database, room);
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      console.log('querySnapshot unsusbscribe', room);
      setMessages(
        querySnapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        }
        ))
      );
    });
    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    );
    // setMessages([...messages, ...messages]);
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, room), {
      _id,
      createdAt,
      text,
      user
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      renderUsernameOnMessage={true}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      onSend={messages => onSend(messages)}
      messagesContainerStyle={{
        backgroundColor: '#fff'
      }}
      textInputStyle={{
        backgroundColor: '#fff',
        borderRadius: 20,
      }}
      user={{
        _id: user.email,
        avatar: 'https://i.pravatar.cc/300',
        name: user.username
      }}
    />
  );
}

