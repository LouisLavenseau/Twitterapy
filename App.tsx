import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import SignInScreen from "./screens/SignInScreen";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./components/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TabNavigator } from "./navigation/tab-navigation";
import * as Font from "expo-font";
import Account from "./services/account.model";
import Tweet from "./services/tweet.model";
import TwitterApi from "./services/tweeterapi.service";
import { RootSiblingParent } from "react-native-root-siblings";

export default function App() {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [isAsyncStorageChecked, setIsAsyncStorageChecked] = useState(false);

  const loginReducer = (prevState: any, action: any) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      returnAccount: new Account(
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        [""],
        "",
        "",
        "",
        [new Tweet(0, "", "", "", [""])],
        ""
      ),
      signIn: async (foundUser: Account) => {
        const userToken = String(foundUser.userToken);
        const userName = foundUser.userName;
        try {
          await AsyncStorage.setItem("userToken", userToken);
          await AsyncStorage.setItem("userName", userName);
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGIN", id: userName, token: userToken });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      let userName;
      try {
        userToken = await AsyncStorage.getItem("userToken");
        userName = await AsyncStorage.getItem("userName");
        if (userName != null)
          TwitterApi.searchAccountByPseudo(userName).then((result) => {
            authContext.returnAccount.user = result.user;
            authContext.returnAccount.userName = result.userName;
            authContext.returnAccount.name = result.name;
            authContext.returnAccount.profileImage = result.profileImage;
            authContext.returnAccount.bannerImage = result.bannerImage;
            authContext.returnAccount.description = result.description;
            authContext.returnAccount.location = result.location;
            authContext.returnAccount.creationDate = result.creationDate;
            authContext.returnAccount.urls = result.urls;
            authContext.returnAccount.friendsCount = result.friendsCount;
            authContext.returnAccount.followersCount = result.followersCount;
            authContext.returnAccount.tweets = result.tweets;
            authContext.returnAccount.singleTweets = result.singleTweets;
            authContext.returnAccount.userToken = result.userToken;
          });
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
      setIsAsyncStorageChecked(true);
    }, 1000);
  }, []);

  async function loadFonts() {
    await Font.loadAsync({
      Verdana: require("./assets/fonts/Verdana.ttf"),
    });
    setIsFontLoaded(true);
  }

  useEffect(() => {
    loadFonts();
  });

  if (!isFontLoaded || !isAsyncStorageChecked) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6f6cff"></ActivityIndicator>
      </View>
    );
  } else {
    return (
      <RootSiblingParent>
        <AuthContext.Provider value={authContext}>
          <NavigationContainer>
            {loginState.userToken !== null ? (
              <TabNavigator />
            ) : (
              <SignInScreen />
            )}
          </NavigationContainer>
        </AuthContext.Provider>
      </RootSiblingParent>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
