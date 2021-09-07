import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationProps } from "../navigation/app-stacks";
import Tweet from "../services/tweet.model";
import { Dimensions } from "react-native";
import ColoredText from "./ColoredText";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface TweetItemProps extends NavigationProps {
  tweet: Tweet;
  key: number;
}

export default class TweetItem extends Component<TweetItemProps> {
  render() {
    const { tweet, navigation } = this.props;
    const color = "grey";
    const size = 17;
    if (tweet.retweetFrom != "") {
      return (
        <View style={styles.mainContainer}>
          <TouchableOpacity
            style={styles.container}
            onPress={() => {
              navigation.navigate("TweetAnalysisResult", {
                tweet: tweet,
              });
            }}
          >
            <View style={styles.contentView}>
              <View style={styles.retweetCommentView}>
                <Icon
                  style={{ marginRight: 5 }}
                  name="twitter-retweet"
                  color={color}
                  size={size}
                />
                <Text style={styles.retweetText}>
                  has retweeted {tweet.retweetFrom}
                </Text>
              </View>
              <Text style={styles.userText}>{tweet.userName}</Text>
              <ColoredText
                textStyle={styles.text}
                containerTextStyle={{ textAlign: "justify" }}
                text={tweet.text}
                color="grey"
              ></ColoredText>
              <View style={styles.row}></View>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (tweet.replyTo[0] != "") {
      const authors = tweet.replyTo.join(", ");
      return (
        <View style={styles.mainContainer}>
          <TouchableOpacity
            style={styles.container}
            onPress={() => {
              navigation.navigate("TweetAnalysisResult", {
                tweet: tweet,
              });
            }}
          >
            <View style={styles.contentView}>
              <View style={styles.retweetCommentView}>
                <Icon
                  style={{ marginRight: 7 }}
                  name="comment-outline"
                  color={color}
                  size={size - 3}
                />
                <Text style={styles.commentText}>
                  has replied to {tweet.replyTo}
                </Text>
              </View>
              <Text style={styles.userText}>{tweet.userName}</Text>
              <ColoredText
                textStyle={styles.text}
                containerTextStyle={{ textAlign: "justify" }}
                text={tweet.text}
                color="grey"
              ></ColoredText>
              <View style={styles.row}></View>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else
      return (
        <View style={styles.mainContainer}>
          <TouchableOpacity
            style={styles.container}
            onPress={() => {
              navigation.navigate("TweetAnalysisResult", {
                tweet: tweet,
              });
            }}
          >
            <View style={styles.contentView}>
              <Text style={styles.userText}>{tweet.userName}</Text>
              <ColoredText
                textStyle={styles.text}
                containerTextStyle={{ textAlign: "justify" }}
                text={tweet.text}
                color="grey"
              ></ColoredText>
              <View style={styles.row}></View>
            </View>
          </TouchableOpacity>
        </View>
      );
  }
}

let { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  commentText: {
    fontFamily: "Verdana",
    fontSize: 12,
    fontWeight: "bold",
    color: "grey",
    top: -2.2,
  },
  container: {
    flexDirection: "column",
    marginVertical: 15,
    flexShrink: 1,
  },
  contentView: {
    width: width * 0.85,
  },
  mainContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    backgroundColor: "#fbfdff",
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
  retweetCommentView: {
    flexDirection: "row",
    marginBottom: 5,
    left: 15,
  },
  retweetText: {
    fontFamily: "Verdana",
    fontSize: 12,
    fontWeight: "bold",
    color: "grey",
    top: 0.2,
  },
  row: {
    top: 22,
    height: 1,
    backgroundColor: "#d5d5d5",
  },
  text: {
    fontFamily: "Verdana",
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
