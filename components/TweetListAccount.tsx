import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { NavigationProps } from "../navigation/app-stacks";
import Tweet from "../services/tweet.model";
import TweetItemAccount from "./TweetItemAccount";
import { Dimensions } from "react-native";

interface TweetListAccountProps extends NavigationProps {
  tweets: Array<Tweet>;
}

export default class TweetListAccount extends Component<TweetListAccountProps> {
  state = {
    indexTweetItemSelected: -1,
  };

  onPressTweetItem = (index: number) => {
    if (index == this.state.indexTweetItemSelected)
      this.setState({ indexTweetItemSelected: -1 });
    else this.setState({ indexTweetItemSelected: index });
  };

  displayElement = (_i: number) => {
    if (_i == this.state.indexTweetItemSelected) {
      return (
        <TweetItemAccount
          tweet={this.props.tweets[_i]}
          navigation={this.props.navigation}
          isSelected={true}
          key={_i}
          index={_i}
          onPressTweetItem={this.onPressTweetItem}
        />
      );
    } else if (_i != this.state.indexTweetItemSelected)
      return (
        <TweetItemAccount
          tweet={this.props.tweets[_i]}
          navigation={this.props.navigation}
          isSelected={false}
          key={_i}
          index={_i}
          onPressTweetItem={this.onPressTweetItem}
        />
      );
  };

  render() {
    var tweets = this.props.tweets;
    var tweetsArray = [];
    for (var _i = 0; _i < tweets.length; _i++) {
      tweetsArray[_i] = this.displayElement(_i);
    }
    if (
      // this.props.tweets?.length > 0 ||
      this.props.tweets[0] != undefined &&
      this.props.tweets[0].text != ""
    )
      return (
        <View style={styles.mainContainer}>
          <View style={styles.tweetListAccount}>{tweetsArray}</View>
          <View style={styles.bottom}></View>
        </View>
      );
    else
      return (
        <View style={styles.container}>
          <Text style={styles.text}>No tweets</Text>
        </View>
      );
  }
}

let { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  bottom: {
    height: 15,
  },
  container: {
    //backgroundColor: "whitesmoke",
    color: "#fbfdff",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  containerTweetListAccount: {
    flex: 1,
    color: "#fbfdff",
    backgroundColor: "#fbfdff",
    borderTopEndRadius: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderTopStartRadius: 25,
  },
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    //backgroundColor: "whitesmoke",
    top: 10,
  },
  row: {
    height: 0.3,
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
    color: "#3b4552",
  },
  textResults: {
    fontFamily: "Verdana",
    fontSize: 20,
    color: "#3b4552",
    fontWeight: "bold",
    marginBottom: 20,
  },
  tweetListAccount: {
    flex: 1,
    marginHorizontal: 10,
    paddingTop: 5,
  },
  viewResults: {
    width: width * 0.9,
  },
});
