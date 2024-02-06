import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login';
import SignUp from './components/SignUp';

export default function App() {
  const views = {
    LOGIN: 1,
    SIGNUP: 0
  }
  const [view, setView] = useState(views.SIGNUP);

  return (
    <View style={styles.container}>
      {/* <Text>Hello World! From Android</Text> */}
      {view === 0 ? <SignUp setView={setView} views={views}/> : <Login setView={setView} views={views}/>}
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
