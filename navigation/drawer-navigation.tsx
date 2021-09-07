import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  TweetAnalysisStackScreen,
  AccountAnalysisStackScreen,
} from "./app-stacks";
import AnalysisResultScreen from "../screens/AccountAnalysisResultScreen";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import SignInScreen from "../screens/SignInScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/core";
import { DrawerNavigationOptions } from "@react-navigation/drawer";
import DrawerContent from "../screens/DrawerContent";
import AboutUsScreen from "../screens/AboutUsScreen";

const stackScreenOptions: DrawerNavigationOptions = {
  headerTintColor: "#3b4552",
  headerTitleStyle: {
    fontWeight: "bold",
    fontFamily: "Verdana",
    fontSize: 21,
  },
  headerStyle: {
    backgroundColor: "#f2f2f2",
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitleAlign: "left",
  title: "Twitterapy",
  headerShown: true,
};

export type RootAccountDrawerParamList = {
  Home: undefined;
  MyProfile: undefined;
  SignOut: undefined;
  Test: undefined;
  AboutUs: undefined;
};

export interface AccountDrawerNavigationProps {
  navigation: DrawerNavigationProp<RootAccountDrawerParamList, any>;
}

const AccountDrawer = createDrawerNavigator<RootAccountDrawerParamList>();

export const AccountDrawerNavigator = () => {
  return (
    <AccountDrawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerType="front"
      screenOptions={stackScreenOptions}
    >
      <AccountDrawer.Screen
        name="Home"
        options={({ route }) => ({
          title: "Accounts analysis",
          headerShown: getHeaderShown(route),
          headerTitle: "",
        })}
        component={AccountAnalysisStackScreen}
      />
      <AccountDrawer.Screen
        name="MyProfile"
        options={{
          title: "My profile",
        }}
        component={AnalysisResultScreen}
      />
      <AccountDrawer.Screen
        name="AboutUs"
        options={{
          title: "About us",
          headerTitleAlign: "left",
        }}
        component={AboutUsScreen}
      />
      <AccountDrawer.Screen
        name="SignOut"
        options={{ headerShown: false }}
        component={SignInScreen}
      />
    </AccountDrawer.Navigator>
  );
};

export type RootTweetDrawerParamList = {
  Home: undefined;
  MyProfile: undefined;
  SignOut: undefined;
  Test: undefined;
  AboutUs: undefined;
};

export interface TweetDrawerNavigationProps {
  navigation: DrawerNavigationProp<RootTweetDrawerParamList, any>;
}

const TweetDrawer = createDrawerNavigator<RootTweetDrawerParamList>();

export const TweetDrawerNavigator = () => {
  return (
    <TweetDrawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerType="front"
      screenOptions={stackScreenOptions}
    >
      <TweetDrawer.Screen
        name="Home"
        options={({ route }) => ({
          title: "Tweets analysis",
          headerShown: getHeaderShown(route),
          headerTitle: "",
        })}
        component={TweetAnalysisStackScreen}
      />
      <TweetDrawer.Screen
        name="MyProfile"
        options={{ title: "My profile" }}
        component={AnalysisResultScreen}
      />
      <AccountDrawer.Screen
        name="AboutUs"
        options={{
          title: "About us",
          headerTitleAlign: "left",
        }}
        component={AboutUsScreen}
      />
      <TweetDrawer.Screen
        name="SignOut"
        options={{ headerShown: false }}
        component={SignInScreen}
      />
    </TweetDrawer.Navigator>
  );
};

const getHeaderShown = (route: any) => {
  const nameChild = getFocusedRouteNameFromRoute(route);
  if (
    nameChild == "TweetAnalysisResult" ||
    nameChild == "AccountAnalysisResult"
  ) {
    return false;
  } else {
    return true;
  }
};
