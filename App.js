/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useEffect,useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import NavigationStack from './src/Navigation/NavigationStack';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import BootSplash from 'react-native-bootsplash';
import { loginUserStart } from './src/Store/Actions/AuthActions';

const App = () => {
  const [Token, setToken] = useState(null);
// const dispatch = useDispatch()
useEffect(() => {
  const init = async () => {
    try {
      // Retrieve the access token
      const id = await AsyncStorage.getItem("accessToken");
      console.log('Access token retrieved:', id);

      // Update state or perform other tasks
      setToken(id);

      // Perform other asynchronous tasks if necessary

      // Hide the BootSplash screen
      await BootSplash.hide({ fade: true });

    } catch (error) {
      console.error('Error retrieving access token or hiding BootSplash:', error);
    }
  };

  // Call the initialization function
  init();
}, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <NavigationStack Token={Token} />
            <Toast />
          </View>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;
