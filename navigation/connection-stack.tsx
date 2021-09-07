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
  TweetAnalysisResult: { tweet: Tweet };
  AccountAnalysisResult: { account: Account };
  TweetAccountAnalysisResult: { tweet: Tweet };
};

// Base interface for all components using the navigation object
// Enables type checking and code completion for navigation
// Should be inherited to add component-specific props
export interface NavigationProps {
  navigation: StackNavigationProp<RootStackParamList, any>;
}

const stackScreenOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: "#6f6cff",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
  headerTitleAlign: "center",
  headerShown: true,
  headerTransparent: true,
};

const TweetAnalysisStack = createStackNavigator<RootStackParamList>();

export const TweetAnalysisStackScreen = () => {
  return (
    <TweetAnalysisStack.Navigator screenOptions={stackScreenOptions}>
      <TweetAnalysisStack.Screen
        name="TweetAnalysis"
        options={{
          title: "Tweet Analysis",
        }}
        component={TweetAnalysisScreen}
      />
      <TweetAnalysisStack.Screen
        name="TweetAnalysisResult"
        options={{
          title: "Result of tweet analysis",
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
          title: "Account Analysis",
        }}
        component={AccountAnalysisScreen}
      />
      <AccountAnalysisStack.Screen
        name="AccountAnalysisResult"
        options={{
          title: "Result of account analysis",
        }}
        component={AccountAnalysisResultScreen}
      />
    </AccountAnalysisStack.Navigator>
  );
};
