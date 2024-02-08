import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import blank from "../assets/blank.webp";

const Profile = ({ userData }) => {
  const [copyText, setCopyText] = useState("");

  const hardcodedCopyText = "aah123bxyhk123";
  const hardcodedCopyText2 = "jhijfg0934ljsd9";

  const handleCopy = (text) => {
    // Implement clipboard functionality for React Native
    // This part will be specific to your clipboard library or implementation
    // For demonstration, you can log the copied text to console
    console.log("Copied text:", text);
  };

  return (
    <View style={styles.profileContainer}>
      <Text style={styles.heading}>Profile</Text>
      <View style={styles.profileInfo}>
        <Image source={blank} style={styles.profileImage} />
        <View style={styles.information}>
          <Text style={styles.fullName}>{userData.fullname}</Text>
          <Text style={styles.designation}>Property Manager</Text>
          <Text style={styles.contact}>Contact</Text>
          <Text>
            <Text style={styles.contactDetail}>Email: </Text>
            <Text style={styles.contactValue}>{userData.email}</Text>
          </Text>
          <Text>
            <Text style={styles.contactDetail}>Number: </Text>
            <Text style={styles.contactValue}>(514) 123-4567</Text>
          </Text>
        </View>
      </View>
      <Text style={styles.heading}>Registration Keys</Text>
      <View style={styles.registrationKeys}>
        <Text style={styles.keyLabel}>Owner Key:</Text>
        <View style={styles.info}>
          <Text style={styles.keyValue}>{hardcodedCopyText}</Text>
          <TouchableOpacity
            onPress={() => handleCopy(hardcodedCopyText)}
            style={styles.copyButton}
          >
            <Text style={styles.copyButtonText}>Copy</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.registrationKeys}>
        <Text style={styles.keyLabel}>Renter Key:</Text>
        <View style={styles.info}>
          <Text style={styles.keyValue}>{hardcodedCopyText2}</Text>
          <TouchableOpacity
            onPress={() => handleCopy(hardcodedCopyText2)}
            style={styles.copyButton}
          >
            <Text style={styles.copyButtonText}>Copy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    marginBottom: 10,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: "20%",
    height: 100,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
  },
  information: {
    marginLeft: 50,
  },
  fullName: {
    fontSize: 20,
  },
  designation: {
    color: "#6b6767",
  },
  contact: {
    textDecorationLine: "underline",
    marginTop: 10,
  },
  contactDetail: {
    fontWeight: "bold",
  },
  contactValue: {
    textDecorationLine: "underline",
  },
  registrationKeys: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  keyLabel: {
    fontWeight: "bold",
  },
  keyValue: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 5,
  },
  info: {
    flexDirection: "row",
    marginLeft: 5,
  },
  copyButton: {
    backgroundColor: "#4caf50",
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  copyButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Profile;
