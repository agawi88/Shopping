/**
 * @file Welcome.js
 * @description
 * Welcome screen of the Shopping App.
 *
 * Allows users to sign in anonymously and navigates to the
 * shopping lists screen upon successful authentication.
 */

import {
  StyleSheet, View, Text,
  TouchableOpacity,
  Alert
} from "react-native"
import { signInAnonymously } from "firebase/auth";
import { auth } from "../firebaseConfig";

/**
 * Welcome screen component.
 *
 * Handles anonymous authentication and initial navigation
 * into the application.
 *
 * @param {Object} props Component props
 * @param {Object} props.navigation React Navigation navigation object
 * @returns {JSX.Element} Welcome screen UI
 */

const Welcome = ({ navigation }) => {
  /**
   * Signs the user in anonymously using Firebase Authentication.
   * On success, navigates to the ShoppingLists screen.
   *
   * @returns {void}
   */
    const signInUser = () => {
        signInAnonymously(auth)
            .then(result => {
                navigation.navigate("ShoppingLists", { userID: result.user.uid });
                Alert.alert("Signed in successfully!");
            })
            .catch((error) => {
                Alert.alert("Unable to sign in, try later again.");
        })
}

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>Shopping Lists</Text>
      <TouchableOpacity
        style={styles.startButton}
        onPress={signInUser}>
        <Text style={styles.startButtonText}>Get started</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  appTitle: {
    fontWeight: "600",
    fontSize: 45,
    marginBottom: 100
  },
  startButton: {
    backgroundColor: "#000",
    height: 50,
    width: "88%",
    justifyContent: "center",
    alignItems: "center"
  },
  startButtonText: {
    color: "#FFF",
  }
});

export default Welcome;