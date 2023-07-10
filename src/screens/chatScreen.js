// import React, {useState} from 'react';
// import {
//   View,
//   TextInput,
//   TouchableOpacity,
//   Text,
//   StyleSheet,
//   Image,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import {useTranslation} from 'react-i18next';

// const ChatScreen = ({route}) => {
//   const {contact} = route.params;
//   const [message, setMessage] = useState('');
//   const navigation = useNavigation();
//   const {t} = useTranslation();

//   const handleMessageSend = () => {
//     // Perform logic to send the message
//     console.log(`Sending message "${message}" to ${contact.name}`);
//     // Clear the message input field
//     setMessage('');
//   };

//   return (
//     <View style={styles.messageContainer}>
//       <View style={styles.contactInfo}>
//         <Image source={contact.image} style={styles.contactImage} />
//         <Text style={styles.contactName}>{contact.name}</Text>
//         <Text style={styles.contactPhoneNumber}>{contact.phoneNumber}</Text>
//       </View>
//       <TextInput
//         style={styles.messageInput}
//         placeholder={t('Type a message')}
//         value={message}
//         onChangeText={setMessage}
//       />
//       <View style={styles.messageOptions}>
//         <TouchableOpacity onPress={() => console.log('Attachment')}>
//           <Text>Attachment</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => console.log('Microphone')}>
//           <Text>Microphone</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={handleMessageSend}>
//           <Text>Send</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   messageContainer: {
//     flex: 1,
//     padding: 16,
//   },
//   contactInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   messageInput: {
//     height: 40,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     marginBottom: 16,
//   },
//   messageOptions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
// });

// export default ChatScreen;
import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import {
  GiftedChat,
  Bubble,
  Send,
  InputToolbar,
  Actions,
} from 'react-native-gifted-chat';
import {useSelector} from 'react-redux';
import {connect} from 'react-redux';
import {paperClip, micIcon, sendIcon} from '../theme/theme';
import io from 'socket.io-client';

const ChatScreen = ({route, navigation}) => {
  //   const {name, userId} = route.params;
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const user = useSelector(state => state?.wallet?.profile?.user);
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

  const onSend = (messages = []) => {
    socket.emit('send_message', {
      senderId: user?._id,
      receiverIds: [userId],
      message: {
        content: messages[0].text,
        qrCode: 'xxxxxxxxxxxxxx',
        attachmentIds: [],
      },
    });

    setChatMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  };

  useEffect(() => {
    // Create some dummy messages
    const dummyMessages = [
      {
        _id: 1,
        text: 'Hello',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'John Doe',
        },
      },
      {
        _id: 2,
        text: 'How are you?',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'John SMith',
        },
      },
      {
        _id: 3,
        text: 'Hi, I am good?',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'John SMith',
        },
      },
      // Add more dummy messages as needed
    ];

    // Set the dummy messages as initial chat messages
    setChatMessages(dummyMessages);

    // ...
  }, []);

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#3FB65F',
          },
          left: {
            backgroundColor: '#3FB65F',
            marginBottom: 20,
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

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={chatMessages}
        onSend={onSend}
        user={{
          _id: user?._id,
        }}
        renderBubble={renderBubble}
        renderSend={renderSend}
        renderAvatar={() => null}
        renderInputToolbar={props => (
          <InputToolbar {...props} containerStyle={styles.inputToolbar} />
        )}
        placeholder="Type a message..."
        textInputStyle={styles.textInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputToolbar: {
    borderTopWidth: 0,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F4F7FC',
  },
  textInput: {
    borderRadius: 20,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    elevation: 3,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    top: 5,
    borderRadius: 20,
    backgroundColor: '#F4F7FC',
  },
});

export default ChatScreen;
