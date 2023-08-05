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
  const {contact} = route.params;
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const user = useSelector(state => state?.wallet?.profile?.user);
  const [userId, setUserId] = useState('');
  const socket = io('https://hopeaccelerated-chat.herokuapp.com', {
    transports: ['websocket'],
    jsonp: false,
    forceNew: true,
  });

  useEffect(() => {
    // Connect to the server and join the chat room using Socket.io
    socket.connect();

    socket.on('receive_conversation_messages_list', data => {
      try {
        console.log(
          `Received Conversation Messages List ${JSON.stringify(data)}`,
        );
        // Assuming data is an array of messages
        setChatMessages([...data]);
      } catch (error) {
        console.error('Error handling received data:', error);
      }
    });

    socket.on('receive_message', data => {
      console.log(`Received Message ${JSON.stringify(data)}`);
      // setRcvdMsg(data.message.content);
    });

    socket.on('request_payload_error', data => {
      console.warn(`Request Payload Error ${JSON.stringify(data)}`);
    });

    // socket.on('receive_user_is_typing', data => {
    //   console.warn(`This User is typing ${JSON.stringify(data)}`);
    // });

    // socket.on('receive_read_message', data => {
    //   console.warn(`Message is read by this User ${JSON.stringify(data)}`);
    // });

    // socket.on('receive_seen_message', data => {
    //   console.warn(`Message is seen by this User ${JSON.stringify(data)}`);
    // });

    socket.on('joi_validation_exception', data => {
      console.warn(`Joi Validation Exception ${JSON.stringify(data)}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    fetchUserId();
  }, [userId]);

  const fetchUserId = async () => {
    try {
      const getUser = await AsyncStorage.getItem('user_id');
      setUserId(getUser);
      console.log('Fetched user ID:', getUser);
      console.log(
        'ontact.userProfileDetails._id: ',
        contact.userProfileDetails._id,
      );
      if (getUser) {
        socket.emit('get_conversation_messages_list', {
          userId: getUser, // Use the fetched user ID here
          receiverId: contact.userProfileDetails._id,
          limit: parseInt(100),
          skip: parseInt(0),
          sortOrder: 'asc',
        });
      } else {
        console.error('User ID not found in AsyncStorage.');
      }
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  };

  const onSend = (messages = []) => {
    console.log('workingOnSend');
    const newMessage = {
      _id: Math.random().toString(),
      text: messages[0].text,
      user: {
        _id: userId,
        name: 'new',
      },
    };

    // Show the temporary message
    setChatMessages(previousMessages =>
      GiftedChat.append(previousMessages, [newMessage]),
    );

    console.log('myuserid:', userId);
    console.log('receiveruserId:', contact.userProfileDetails._id);
    console.log('messages[0].text: ', messages[0]);

    socket.emit(
      'send_message',
      {
        senderId: userId,
        receiverIds: [contact.userProfileDetails._id],
        message: {
          content: messages[0].text,
          qrCode: 'xxxxxxxxxxxxxx',
          attachmentIds: [
            '604db1fe95c52b43246a0eb3',
            '604db1fe95c52b43246a0eb4',
          ],
        },
      },
      acknowledgmentData => {
        console.log('Message sent to server:hhhhhh', acknowledgmentData);
      },
    );
  };

  // useEffect(() => {
  //   // Create some dummy messages
  //   fetchUserId();
  //   const dummyMessages = [
  //     {
  //       _id: 1,
  //       text: 'Hello',
  //       // createdAt: new Date(),
  //       user: {
  //         _id: 100,
  //         name: 'ayesha',
  //       },
  //     },
  //     {
  //       _id: 2,
  //       text: 'How are you?',
  //       // createdAt: new Date(),
  //       user: {
  //         _id: 100,
  //         name: 'ayesha',
  //       },
  //     },
  //     {
  //       _id: 3,
  //       text: 'Hi, I am good?',
  //       // createdAt: new Date(),
  //       user: {
  //         _id: userId,
  //         name: 'ayesha',
  //       },
  //     },
  //     // Add more dummy messages as needed
  //   ];

  //   // Set the dummy messages as initial chat messages
  //   setChatMessages(dummyMessages.reverse());

  //   // ...
  // }, []);

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
