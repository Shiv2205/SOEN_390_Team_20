import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import PropertyView from './components/PropertyView'

export default function App() {
  const views = {
    PropertyView: 3,
    PROFILE: 2,
    LOGIN: 1,
    SIGNUP: 0,
  };
  const [view, setView] = useState(views.SIGNUP);
  const [userData, setUserData] = useState({});

  const renderView = () => {
    switch (view) {
      case views.SIGNUP:
        return <SignUp setView={setView} views={views} />;
      case views.LOGIN:
        return <Login setView={setView} views={views} setUserData={setUserData} />;
      case views.PROFILE:
        return <Profile userData={userData} setView={setView} views={views} />;
      case views.PROPERTYPAGE:
        return <PropertyView />;
      default:
        return <SignUp setView={setView} views={views} />;
    }
  };
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
