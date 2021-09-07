import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { NavigationProps } from "../navigation/app-stacks";
import Tweet from "../services/tweet.model";
import { Dimensions } from "react-native";

interface TweetItemProps extends NavigationProps {
  tweet: Tweet;
}

export default class TweetItemResult extends Component<TweetItemProps> {
  render() {
    const { tweet } = this.props;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.contentView}>
          <Text style={styles.text}>{tweet.text}</Text>
        </View>
      </View>
    );
  }
}

let { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  contentView: {
    width: width * 0.8,
  },
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#fbfdff",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  profileImage: {
    height: 30,
    width: 30,
    borderRadius: 150,
  },
  rectangle: {
    backgroundColor: "#00ACEE",
    width: 5,
    height: "100%",
  },
  row: {
    top: 22,
    height: 0.5,
    backgroundColor: "#d5d5d5",
  },
  text: {
    fontFamily: "Verdana",
    color: "grey",
    fontSize: 15,
    textAlign: "justify",
  },
  userText: {
    fontFamily: "Verdana",
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 2,
    textAlign: "justify",
    color: "#3b4552",
  },
});
