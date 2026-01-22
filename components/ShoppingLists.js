/**
 * @file ShoppingLists.js
 * @description
 * Displays and manages shopping lists for the authenticated user.
 *
 * Shopping lists are stored in Firebase Firestore and cached locally
 * using AsyncStorage to allow offline access.
 */

import {
    Alert, FlatList,
    KeyboardAvoidingView, Platform,
    StyleSheet, Text, TextInput,
    TouchableOpacity, View
} from "react-native";
import { useEffect, useState } from "react";
import { collection, addDoc, onSnapshot, query, where } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * ShoppingLists screen component.
 *
 * - Subscribes to Firestore updates when online
 * - Loads cached shopping lists when offline
 * - Allows adding new shopping lists when connected
 *
 * @param {Object} props Component props
 * @param {import('firebase/firestore').Firestore} props.db Firestore database instance
 * @param {Object} props.route Navigation route object
 * @param {Object} props.route.params Route parameters
 * @param {string} props.route.params.userID Authenticated user's ID
 * @param {boolean} props.isConnected Network connection status
 * @returns {JSX.Element} Shopping lists screen
 */

const ShoppingLists = ({ db, route, isConnected }) => {

    const [lists, setLists] = useState([]);
    const [listName, setListName] = useState("");
    const [item1, setItem1] = useState("");
    const [item2, setItem2] = useState("");

    const { userID } = route.params;

 /*  const fetchShoppingLists = async () => {
    const listsDocuments = await getDocs(collection(db, "shoppinglists"));
    let newLists = [];
    listsDocuments.forEach(docObject => {
      newLists.push({ id: docObject.id, ...docObject.data() })
    });
      setLists(newLists)
      console.log(123);
  }
 */
  let unsubShoppinglists;
  
  useEffect(() => {

    if (isConnected === true) {

// unregister current onSnapshot() listener to avoid registering multiple listeners when
// useEffect code is re-executed.
    if (unsubShoppinglists) unsubShoppinglists();
      unsubShoppinglists = null;
      
    const q = query(collection(db, "shoppinglists"), where("uid", "==", userID));
//code to executed when cmpnnt mounted/updated
    unsubShoppinglists = onSnapshot(q, (documentsSnapshot) => {
      let newLists = [];
      documentsSnapshot.forEach(doc => {
        newLists.push({
          id: doc.id, ...doc.data()
          })
        });
        cacheShoppingLists(newLists);
        setLists(newLists);
      });
    } else loadCachedLists();
//   Clean up code
        return () => {
            if (unsubShoppinglists) unsubShoppinglists();
        }
    }, [isConnected]);

  /**
   * Loads shopping lists from local AsyncStorage cache.
   *
   * @returns {Promise<void>}
   */

  const loadCachedLists = async () => {
    const cachedLists = await AsyncStorage.getItem("shopping_lists") || [];
    setLists(JSON.parse(cachedLists));
  }    

  /**
   * Saves shopping lists to local AsyncStorage cache.
   *
   * @param {Array<Object>} listsToCache Lists to cache
   * @returns {Promise<void>}
   */  

  const cacheShoppingLists = async (listsToCache) => {
      try {
            await AsyncStorage.setItem('shopping_lists', JSON.stringify(listsToCache));
          } catch (error) {
            console.log(error.message);
          }
}

  /**
   * Adds a new shopping list to Firestore.
   *
   * @param {Object} newList Shopping list data
   * @param {string} newList.uid User ID
   * @param {string} newList.name List name
   * @param {Array<string>} newList.items List items
   * @returns {Promise<void>}
   */

  const addShoppingList = async (newList) => {
    const newListRef = await addDoc(collection(db, "shoppinglists"), newList);
        if (newListRef.id) {
            Alert.alert(`The list "${listName}" has been added.`);
        } else {
            Alert.alert("Unable to add. Please try again later.");
        }
  }
  
    return (
    <View style={styles.container}>
        <FlatList
        styles={styles.listsContainer}
        data={lists}
        renderItem={({ item }) => 
            <View style={styles.listItem}>
            <Text>{item.name}: {item.items.join(", ") || ""}
             </Text>
            </View>
            }
        />
        {(isConnected === true) ?
          <View style={styles.listForm}>
            <TextInput
              style={styles.listName}
              placeholder="List Name"
              value={listName}
              onChangeText={setListName}
            />
            <TextInput
              style={styles.item}
              placeholder="Item #1"
              value={item1}
              onChangeText={setItem1}
            />
            <TextInput
              style={styles.item}
              placeholder="Item #2"
              value={item2}
              onChangeText={setItem2}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                const newList = {
                  uid: userID,
                  name: listName,
                  items: [item1, item2]
                }
                addShoppingList(newList);
              }}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View> : null}
      {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null}
    </View>        
  )  
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listItem: {
    height: 70,
    justifyContent: "center",
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#AAA",
    flex: 1,
    flexGrow: 1
  },
  listForm: {
    flexBasis: 275,
    flex: 0,
    margin: 15,
    padding: 15,
    backgroundColor: "#CCC"
  },
  listName: {
    height: 50,
    padding: 15,
    fontWeight: "600",
    marginRight: 50,
    marginBottom: 15,
    borderColor: "#555",
    borderWidth: 2
  },
  item: {
    height: 50,
    padding: 15,
    marginLeft: 50,
    marginBottom: 15,
    borderColor: "#555",
    borderWidth: 2
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    backgroundColor: "#000",
    color: "#FFF"
  },
  addButtonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 20
  }
});

export default ShoppingLists;