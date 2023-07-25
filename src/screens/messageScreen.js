import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {userIcon} from '../theme/theme';
import {fetchContacts} from '../reducers/contactsAction.js';
import Snackbar from 'react-native-snackbar';
import {connect} from 'react-redux';

const MessageScreen = ({fetchContacts}) => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noContactFound, setNoContactFound] = useState(false);
  const dummyContacts = [
    {
      id: 1,
      name: 'hjk@gmail.com',
      phoneNumber: 'Contacts',
      image: userIcon,
    },
    {
      id: 2,
      name: 'al@gmail.com',
      phoneNumber: 'Contacts',
      image: userIcon,
    },
    {
      id: 3,
      name: 'bilalsoftware6285@gmail.com',
      phoneNumber: 'Contacts',
      image: userIcon,
    },
    {
      id: 4,
      name: 'talha1392.ahmed@gmail.com',
      phoneNumber: 'Contacts',
      image: userIcon,
    },
  ];

  const filteredContacts = contacts?.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const handleContactPress = contact => {
    navigation.navigate('ChatScreen', {contact});
  };

  const handleFetchContacts = async () => {
    try {
      const data = await fetchContacts();
      if (
        data.error &&
        data.error.response &&
        data.error.response.status === 400
      ) {
        Snackbar.show({
          backgroundColor: 'red',
          text: 'Failed to fetch Contacts',
          duration: Snackbar.LENGTH_LONG,
        });
      } else {
        if (data.length == 0) {
          setNoContactFound(false);
          setContacts(dummyContacts);
        } else {
          // setContacts(data);
          setNoContactFound(false);
          setContacts(data);
        }
        Snackbar.show({
          backgroundColor: 'green',
          text: t('Failed to fetch Contacts'),
          duration: Snackbar.LENGTH_LONG,
        });
      }
    } catch (error) {
      Snackbar.show({
        backgroundColor: 'red',
        text: t('Error occurred while fetching contacts'),
        duration: Snackbar.LENGTH_LONG,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchContacts();
  }, []);

  const renderContactItem = ({item}) => (
    <TouchableOpacity onPress={() => handleContactPress(item)}>
      <View style={styles.contactItem}>
        <Image source={userIcon} style={styles.contactImage} />
        <View style={styles.contactDetails}>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={styles.contactPhoneNumber}>{item.phoneNumber}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  const handleBackButton = () => {
    // Navigate back to the MainMenu screen
    navigation.navigate('MainMenu');
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
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder={t('Search User Name')}
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {noContactFound == true ? (
        <View style={styles.noContact}>
          <Text style={styles.noContactText}>
            {t('Oops! You dont have any contacts :(')}
          </Text>
        </View>
      ) : (
        <FlatList
          style={styles.listStyle}
          data={filteredContacts}
          keyExtractor={item => item.id.toString()}
          renderItem={renderContactItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  noContact: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noContactText: {
    fontSize: 24,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F4F7FC',
    color: 'black',
  },
  searchBar: {
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: 4,
    paddingHorizontal: 12,
    fontSize: 14,
    paddingVertical: 10,
    marginBottom: 16,
    elevation: 4,
    color: 'black',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 20,
    marginRight: 8,
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  contactPhoneNumber: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 19,
    color: '#3FB65F',
  },
});

export default connect(null, {fetchContacts})(MessageScreen);
