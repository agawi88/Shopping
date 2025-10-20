// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import the screens
import ShoppingLists from "./components/ShoppingLists";
import Welcome from "./components/Welcome";

// code for detecting whether a user is online (should be kept in main/root comp.)
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { LogBox, Alert } from "react-native";

// Create the navigator

const Stack = createNativeStackNavigator();

//state that represents network connectivity

const App = () => {

const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true)
    { enableNetwork(db); }
  }, [connectionStatus.isConnected]);

  return (
  <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
      >
        <Stack.Screen name="Welcome" component={Welcome}>
         {/* {(props) => <Welcome auth={auth} {...props} />} */}
        </Stack.Screen>
        <Stack.Screen name="ShoppingLists" component={ShoppingLists}>
{/*           {(props) => (
            <ShoppingLists
              isConnected={connectionStatus.isConnected}
              db={db}
              {...props} />)} */}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>
  );
}

export default App;
