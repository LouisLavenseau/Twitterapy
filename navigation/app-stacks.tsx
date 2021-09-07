import React from "react";
import Tweet from "../services/tweet.model";
import Account from "../services/account.model";

import {
  createStackNavigator,
  StackNavigationOptions,
  StackNavigationProp,
} from "@react-navigation/stack";
import AccountAnalysisScreen from "../screens/AccountAnalysisScreen";
import TweetAnalysisResultScreen from "../screens/TweetAnalysisResultScreen";
import AccountAnalysisResultScreen from "../screens/AccountAnalysisResultScreen";
import TweetAnalysisScreen from "../screens/TweetAnalysisScreen";

// Define view (screen) names and associated params
// Enables type checking and code completion for views
// undefined = no params passed to view
export type RootStackParamList = {
  TweetAnalysis: undefined;
  AccountAnalysis: undefined;
  Profile: undefined;
  TweetAnalysisResult: { tweet: Tweet };
  AccountAnalysisResult: { account: Account };
  Connection: undefined;
};

// Base interface for all components using the navigation object
// Enables type checking and code completion for navigation
// Should be inherited to add component-specific props
export interface NavigationProps {
  navigation: StackNavigationProp<RootStackParamList, any>;
}

const stackScreenOptions: StackNavigationOptions = {
  headerStyle: { backgroundColor: "#f2f2f2", elevation: 0, shadowOpacity: 0 },
  headerTintColor: "#3b4552",
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 21,
    fontFamily: "Verdana",
  },
  headerTitleAlign: "center",
};

const TweetAnalysisStack = createStackNavigator<RootStackParamList>();

export const TweetAnalysisStackScreen = () => {
  return (
    <TweetAnalysisStack.Navigator screenOptions={stackScreenOptions}>
      <TweetAnalysisStack.Screen
        name="TweetAnalysis"
        options={{
          headerShown: false,
        }}
        component={TweetAnalysisScreen}
      />
      <TweetAnalysisStack.Screen
        name="TweetAnalysisResult"
        options={{
          headerShown: true,
          headerTitleAlign: "left",
          title: "Analysis result",
        }}
        component={TweetAnalysisResultScreen}
      />
    </TweetAnalysisStack.Navigator>
  );
};

const AccountAnalysisStack = createStackNavigator<RootStackParamList>();

export const AccountAnalysisStackScreen = () => {
  return (
    <AccountAnalysisStack.Navigator screenOptions={stackScreenOptions}>
      <AccountAnalysisStack.Screen
        name="AccountAnalysis"
        options={{
          headerShown: false,
        }}
        component={AccountAnalysisScreen}
      />
      <AccountAnalysisStack.Screen
        name="AccountAnalysisResult"
        options={{
          title: "Analysis result",
          headerShown: true,
          headerTitleAlign: "left",
        }}
        component={AccountAnalysisResultScreen}
      />
    </AccountAnalysisStack.Navigator>
  );
};

export type RootStackParamList2 = {
  Connection: undefined;
  TabNavigator: { username: string };
};

export interface NavigationProps2 {
  navigation: StackNavigationProp<RootStackParamList2, any>;
}
