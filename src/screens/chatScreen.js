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
    // Fetch the user ID and store it in the state
    fetchUserId();

    // Connect to the server and join the chat room using Socket.io
    socket.connect();

    // // Handle incoming messages from the server
    // socket.on('message', newMessage => {
    //   setChatMessages(previousMessages =>
    //     GiftedChat.append(previousMessages, [newMessage]),
    //   );
    // });
    // socket.on('receive_conversation_messages_list', data => {
    //   // console.log(`Received Conversation Messages List `,data);
    //   setChatMessages(data);
    //   // setRcvdMsg(JSON.stringify(data))
    // });

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

    // Listen for send_message_success event to handle the acknowledgment
    socket.on('send_message_success', acknowledgmentData => {
      console.log('Message sent to server:', acknowledgmentData);
      // You can update your UI or handle anything related to successful message sending here
    });

    // Listen for send_message_error event to handle any errors
    socket.on('send_message_error', err => {
      console.warn('Error sending message:', err);
      // You can show an error message to the user or handle any error scenarios here
    });

    // socket.on('receive_message', data => {
    //   console.warn(`Received Message ${JSON.stringify(data)}`);
    //   setRcvdMsg(data.message.content);
    // });

    socket.on('request_payload_error', data => {
      console.warn(`Request Payload Error ${JSON.stringify(data)}`);
    });

    socket.on('receive_user_is_typing', data => {
      console.warn(`This User is typing ${JSON.stringify(data)}`);
    });

    socket.on('receive_read_message', data => {
      console.warn(`Message is read by this User ${JSON.stringify(data)}`);
    });

    socket.on('receive_seen_message', data => {
      console.warn(`Message is seen by this User ${JSON.stringify(data)}`);
    });

    socket.on('joi_validation_exception', data => {
      console.warn(`Joi Validation Exception ${JSON.stringify(data)}`);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchUserId = async () => {
    // Fetch the user ID from AsyncStorage or any other storage mechanism
    const getUser = await AsyncStorage.getItem('user_id');
    setUserId(getUser);
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

    // socket.emit('send_message', {
    //   senderId: sender,
    //   receiverIds: [rcvr],
    //   message: {
    //     content,
    //     // qrCode: 'xxxxxxxxxxxxxx',
    //     // attachmentIds: ['604db1fe95c52b43246a0eb3', '604db1fe95c52b43246a0eb4'],
    //   },
    // });
    console.log('myuserid:', userId);
    console.log('receiveruserId:', contact.userBasicDetails._id);

    // Emit the message to the server using the socket
    socket.emit(
      'send_message',
      {
        senderId: userId,
        receiverIds: [contact.userBasicDetails._id],
        message: {
          content: messages[0].text,
        },
      },
      acknowledgmentData => {
        // This callback will be executed when the server acknowledges the message
        // acknowledgmentData can be any data sent by the server as an acknowledgment
        console.log('Message sent to server:hhhhhh', acknowledgmentData);
      },
    );

    // // You can simulate the server response with a setTimeout for demonstration purposes
    // setTimeout(() => {
    //   // Replace this with the actual response from the server
    //   const serverResponse = {
    //     _id: Math.random().toString(), // You can use a unique ID generator library here
    //     text: messages[0].text,
    //     // createdAt: new Date(),
    //     user: {
    //       _id: userId, // Replace userId with the actual receiver's ID
    //       name: 'ayesha', // Replace contact.name with the actual receiver's name
    //     },
    //   };

    //   // Replace the temporary message with the server response
    //   setChatMessages(previousMessages =>
    //     previousMessages.map(msg =>
    //       msg._id === newMessage._id ? serverResponse : msg,
    //     ),
    //   );
    // }, 1000); // Simulating a 1-second delay for the server response
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
