import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, Dimensions, BackHandler} from 'react-native';
import {
  GiftedChat,
  Bubble,
  Send,
  InputToolbar,
  Actions,
} from 'react-native-gifted-chat';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {paperClip, micIcon, sendIcon} from '../theme/theme';
import io from 'socket.io-client';

const ChatScreen = ({route, navigation}) => {
  //   const {name, userId} = route.params;
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const user = useSelector(state => state?.wallet?.profile?.user);
  const [userId, setUserId] = useState('');
  //   const socket = io('https://hopeaccelerated-chat.herokuapp.com', {
  //     transports: ['websocket'],
  //     jsonp: false,
  //     forceNew: true,
  //   });

  //   useEffect(() => {
  //     socket.emit('get_conversation_messages_list', {
  //       receiverId: user?._id,
  //       userId: userId,
  //       limit: 100,
  //       skip: 1,
  //       sortOrder: 'asc',
  //     });

  //     socket.on('receive_conversation_messages_list', data => {
  //       setChatMessages(data);
  //     });

  //     return () => {
  //       socket.disconnect();
  //     };
  //   }, []);

  //future implementatuion
  // const onSend = (messages = []) => {
  //   socket.emit('send_message', {
  //     senderId: user?._id,
  //     receiverIds: [userId],
  //     message: {
  //       content: messages[0].text,
  //       qrCode: 'xxxxxxxxxxxxxx',
  //       attachmentIds: [],
  //     },
  //   });

  //   setChatMessages(previousMessages =>
  //     GiftedChat.append(previousMessages, messages),
  //   );
  // };

  const fetchUserId = async () => {
    var getUser = await AsyncStorage.getItem('user_id');
    setUserId(getUser);
  };
  const onSend = (messages = []) => {
    const newMessage = {
      _id: Math.random().toString(), // You can use a unique ID generator library here
      text: messages[0].text,
      // createdAt: new Date(),
      user: {
        _id: userId,
        name: 'new',
      },
    };

    // Show the temporary message
    setChatMessages(previousMessages =>
      GiftedChat.append(previousMessages, [newMessage]),
    );

    // Emit the message to the server using the socket
    // Replace the socket.emit() call with your actual logic
    // socket.emit('send_message', { ... });

    // You can simulate the server response with a setTimeout for demonstration purposes
    setTimeout(() => {
      // Replace this with the actual response from the server
      const serverResponse = {
        _id: Math.random().toString(), // You can use a unique ID generator library here
        text: messages[0].text,
        // createdAt: new Date(),
        user: {
          _id: userId, // Replace userId with the actual receiver's ID
          name: 'ayesha', // Replace contact.name with the actual receiver's name
        },
      };

      // Replace the temporary message with the server response
      setChatMessages(previousMessages =>
        previousMessages.map(msg =>
          msg._id === newMessage._id ? serverResponse : msg,
        ),
      );
    }, 1000); // Simulating a 1-second delay for the server response
  };

  useEffect(() => {
    // Create some dummy messages
    fetchUserId();
    const dummyMessages = [
      {
        _id: 1,
        text: 'Hello',
        // createdAt: new Date(),
        user: {
          _id: 100,
          name: 'ayesha',
        },
      },
      {
        _id: 2,
        text: 'How are you?',
        // createdAt: new Date(),
        user: {
          _id: 100,
          name: 'ayesha',
        },
      },
      {
        _id: 3,
        text: 'Hi, I am good?',
        // createdAt: new Date(),
        user: {
          _id: userId,
          name: 'ayesha',
        },
      },
      // Add more dummy messages as needed
    ];

    // Set the dummy messages as initial chat messages
    setChatMessages(dummyMessages.reverse());

    // ...
  }, []);

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#3FB65F',
            marginBottom: 10,
            paddingVertical: 10,
          },
          left: {
            backgroundColor: '#3FB65F',
            marginBottom: 10,
            paddingVertical: 10,
          },
        }}
        textStyle={{
          right: {
            color: 'white',
          },
          left: {
            color: 'white',
          },
        }}
      />
    );
  };

  const renderSend = props => {
    return (
      <Send {...props}>
        <View style={styles.sendButton}>
          <Image source={sendIcon} />
        </View>
      </Send>
    );
  };
  const handleBackButton = () => {
    // Navigate back to the MainMenu screen
    navigation.goBack();
    return true; // Return true to indicate that the back action is handled
  };

  useEffect(() => {
    // Override the default back button behavior
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );

    // Clean up the custom back button handler when the screen is unmounted
    return () => backHandler.remove();
  }, []);
  return (
    <View style={styles.container}>
      <GiftedChat
        messages={chatMessages.slice().reverse()}
        onSend={onSend}
        user={{
          _id: userId,
        }}
        renderBubble={renderBubble}
        renderSend={renderSend}
        renderAvatar={() => null}
        renderInputToolbar={props => (
          <InputToolbar {...props} containerStyle={styles.inputToolbar} />
        )}
        placeholder="Type a message..."
        textInputStyle={styles.textInput}
        inverted={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FC',
  },
  inputToolbar: {
    borderTopWidth: 0,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F4F7FC',
    // backgroundColor: '#fff',
  },
  textInput: {
    borderRadius: 20,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    elevation: 7,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    top: 5,
    borderRadius: 20,
    backgroundColor: '#F4F7FC',
    // backgroundColor: '#fff',
  },
});

export default ChatScreen;
