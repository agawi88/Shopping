// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";

// import the screens
import ShoppingLists from "./components/ShoppingLists";
import Welcome from "./components/Welcome";

const App = () => {

const firebaseConfig = {
  apiKey: "AIzaSyBihgTR-xnxRYcW6TEy9IdpReCX_7AstBg",
  authDomain: "agas-shopping-list-demo.firebaseapp.com",
  projectId: "agas-shopping-list-demo",
  storageBucket: "agas-shopping-list-demo.firebasestorage.app",
  messagingSenderId: "326283031177",
  appId: "1:326283031177:web:614a2b367bbe8f39294c58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  const auth = getAuth(app);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
      >
        <Stack.Screen name="Welcome"
          children={props => <Welcome auth={auth} {...props} />}
        />
        <Stack.Screen
          name="ShoppingLists"
          children={props => <ShoppingLists db={db} {...props} />}
        />
{/*           {props => <ShoppingLists db={db} {...props} />}
        </Stack.Screen> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
