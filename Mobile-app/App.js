import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';

export default function App() {
  const views = {
    LOGIN: 1,
    SIGNUP: 0,
    PROFILE: 2
  }
  const [view, setView] = useState(views.SIGNUP);
  const [userData, setUserData] = useState({}); 

  return (
    <View style={styles.container}>
      {/* <Text>Hello World! From Android</Text> */}
      {view === views.SIGNUP ? <SignUp setView={setView} views={views}/> : 
      view === views.LOGIN ? <Login setView={setView} views={views} setUserData={setUserData}/> :
      <Profile userData={userData}/>}
      <StatusBar style="auto" />
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
