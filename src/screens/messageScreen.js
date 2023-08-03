import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {userIcon} from '../theme/theme';
import {fetchContacts, searchUser} from '../reducers/contactsAction.js';
import Snackbar from 'react-native-snackbar';
import {connect} from 'react-redux';
import Wrapper from '../components/wrapper';
import {debounce} from 'lodash';

const MessageScreen = ({fetchContacts, searchUser}) => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noContactFound, setNoContactFound] = useState(false);
  const [noChats, setNoChats] = useState(false);

  const filteredContacts = contacts?.filter(contact =>
    contact.userProfileDetails.firstName
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const handleContactPress = contact => {
    console.log('contact: ', contact);
    navigation.navigate('ChatScreen', {contact});
  };

  const handleFetchContacts = async () => {
    try {
      const data = await fetchContacts();
      if (data.length === 0) {
        setNoChats(true);
      } else {
        setNoChats(false);
        setContacts(data);
      }
      Snackbar.show({
        backgroundColor: 'green',
        text: t('Successfully Fetched Chats'),
        duration: Snackbar.LENGTH_LONG,
      });
    } catch (error) {
      Snackbar.show({
        backgroundColor: 'red',
        text: t('Error occurred while fetching chats'),
        duration: Snackbar.LENGTH_LONG,
      });
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearchUser = useCallback(
    debounce(async query => {
      try {
        console.log('tttttttttttttttttttttttttttttttttttt');
        const data = await searchUser(query);
        if (data.length === 0) {
          setNoContactFound(true);
        } else {
          setNoContactFound(false);
          setContacts(data);
          // Snackbar.show({
          //   backgroundColor: 'green',
          //   text: t('Successfully Fetched Users'),
          //   duration: Snackbar.LENGTH_LONG,
          // });
        }
      } catch (error) {
        console.log('Error searching users: ', error);
        Snackbar.show({
          backgroundColor: 'red',
          text: t('Error occurred while fetching users'),
          duration: Snackbar.LENGTH_LONG,
        });
      }
    }, 500),
    [],
  );

  useEffect(() => {
    handleFetchContacts();
  }, []);

  useEffect(() => {
    // Call debouncedSearchUser after the user stops typing in the search field
    if (searchQuery.trim().length > 0) {
      debouncedSearchUser(searchQuery);
    } else {
      // If the searchQuery is empty, set contacts to an empty array
      setContacts([]);
    }
  }, [searchQuery]);

  const renderContactItem = ({item}) => (
    <TouchableOpacity onPress={() => handleContactPress(item)}>
      <View style={styles.contactItem}>
        <Image source={userIcon} style={styles.contactImage} />
        <View style={styles.contactDetails}>
          <Text style={styles.contactName}>{item.userBasicDetails.email}</Text>
          <Text style={styles.contactPhoneNumber}>
            {item.userBasicDetails.phone}
          </Text>
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
      <Wrapper>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#3FB65F" />
        </View>
      </Wrapper>
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
      {searchQuery.length === 0 ? (
        noChats ? (
          <View style={styles.noContact}>
            <Text style={styles.noContactText}>
              {t('Oops! You dont have any chats :(')}
            </Text>
          </View>
        ) : (
          <FlatList
            style={styles.listStyle}
            data={searchQuery.length > 0 ? contacts : filteredContacts}
            keyExtractor={item => item.userBasicDetails._id.toString()}
            renderItem={renderContactItem}
          />
        )
      ) : noContactFound ? (
        <View style={styles.noContact}>
          <Text style={styles.noContactText}>{t('No User Found')}</Text>
        </View>
      ) : (
        <FlatList
          style={styles.listStyle}
          data={searchQuery.length > 0 ? contacts : filteredContacts}
          keyExtractor={item => item.userBasicDetails._id.toString()}
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

export default connect(null, {fetchContacts, searchUser})(MessageScreen);
