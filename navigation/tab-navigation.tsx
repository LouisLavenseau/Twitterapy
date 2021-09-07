import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  BottomTabBarOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getFocusedRouteNameFromRoute } from "@react-navigation/core";
import {
  AccountDrawerNavigator,
  TweetDrawerNavigator,
} from "./drawer-navigation";

const tabBarOptions: BottomTabBarOptions = {
  activeTintColor: "#6f6cff",
  inactiveTintColor: "gray",
  labelStyle: {
    fontSize: 14,
  },
  showLabel: false,
  style: {
    height: 75,
  },
};

export type RootTabParamList = {
  AccountDrawer: undefined;
  TweetDrawer: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export const TabNavigator = () => (
  <Tab.Navigator tabBarOptions={tabBarOptions}>
    <Tab.Screen
      name="AccountDrawer"
      options={({ route }) => ({
        tabBarVisible: getTabBarVisible(route),
        tabBarIcon: ({ focused, color }) => (
          <View style={styles.view}>
            <Ionicons name="ios-at" size={27} color={color} />
            <Text
              style={{
                fontFamily: "Verdana",
                fontSize: 12,
                color: focused ? "#6f6cff" : "#3b4552",
              }}
            >
              Accounts
            </Text>
          </View>
        ),
      })}
      component={AccountDrawerNavigator}
    />
    <Tab.Screen
      name="TweetDrawer"
      options={({ route }) => ({
        tabBarVisible: getTabBarVisible(route),

        tabBarIcon: ({ focused, color }) => (
          <View style={styles.view}>
            <Ionicons name="ios-mail" size={27} color={color} />
            <Text
              style={{
                fontFamily: "Verdana",
                fontSize: 12,
                color: focused ? "#6f6cff" : "#3b4552",
              }}
            >
              Tweets
            </Text>
          </View>
        ),
      })}
      component={TweetDrawerNavigator}
    />
  </Tab.Navigator>
);

const getTabBarVisible = (route: any) => {
  const nameChild = getFocusedRouteNameFromRoute(route);
  if (nameChild == "Connection") {
    return false;
  } else {
    return true;
  }
};

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
  },
});
