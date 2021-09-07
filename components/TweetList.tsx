import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { NavigationProps } from "../navigation/app-stacks";
import Tweet from "../services/tweet.model";
import TweetItem from "./TweetItem";
import { Dimensions } from "react-native";

interface TweetListProps extends NavigationProps {
  tweets: Array<Tweet>;
}

export default class TweetList extends Component<TweetListProps> {
  displayElement = (_i: number) => {
    return (
      <TweetItem
        tweet={this.props.tweets[_i]}
        navigation={this.props.navigation}
        key={_i}
      />
    );
  };

  render() {
    var tweets = this.props.tweets;
    var tweetsArray = [];
    for (var _i = 0; _i < tweets.length; _i++) {
      tweetsArray[_i] = this.displayElement(_i);
    }
    if (this.props.tweets?.length > 0)
      return (
        <View style={styles.mainContainer}>
          <View style={styles.secondContainer}>
            <View style={styles.viewResults}>
              <View style={styles.row}></View>
              <Text style={styles.textResults}>Results</Text>
            </View>
          </View>
          <View style={styles.containerTweetList}>
            <View style={styles.tweetList}>{tweetsArray}</View>
          </View>
        </View>
      );
    else
      return (
        <View style={styles.container}>
          <Text style={styles.text}></Text>
        </View>
      );
  }
}

let { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    color: "#fbfdff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "whitesmoke",
  },
  containerTweetList: {
    flex: 1,
    color: "#fbfdff",
    backgroundColor: "#fbfdff",
    borderTopEndRadius: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderTopStartRadius: 25,
  },
  mainContainer: {
    //backgroundColor: "whitesmoke",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  row: {
    height: 1,
    backgroundColor: "#bebebe",
    marginBottom: 40,
  },
  secondContainer: {
    width: width,
    alignItems: "center",
  },
  text: {
    top: 20,
    fontSize: 16,
    fontFamily: "Verdana",
  },
  textResults: {
    fontFamily: "Verdana",
    fontSize: 20,
    color: "#3b4552",
    fontWeight: "bold",
    marginBottom: 20,
  },
  tweetList: {
    flex: 1,
    marginHorizontal: 10,
    paddingTop: 5,
  },
  viewResults: {
    width: width * 0.9,
  },
});
