import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { NavigationProps } from "../navigation/app-stacks";
import Tweet from "../services/tweet.model";
import { Dimensions } from "react-native";
import ColoredText from "./ColoredText";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function displayElement(count: number, mood: string, analysisResult: number) {
  if (analysisResult != 0) {
    if (analysisResult * 200 >= 20) {
      var imageStyle = {
        width: 60,
        height: 60,
      };
    } else {
      var imageStyle = { width: 20, height: 20 };
    }
    var imageCombinedStyle;
    imageCombinedStyle = StyleSheet.flatten([styles.image, imageStyle]);

    if (analysisResult * 40 >= 10) {
      var textStyle = { fontSize: 10 };
    } else {
      var textStyle = { fontSize: 10 };
    }
    var textCombinedStyle = StyleSheet.flatten([styles.text, textStyle]);

    if (mood == "very happy") {
      return (
        <View key={count} style={styles.containerSentiment}>
          <View style={styles.imageView}>
            <Image
              style={imageCombinedStyle}
              source={{
                uri: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/facebook/65/smiling-face-with-open-mouth-and-tightly-closed-eyes_1f606.png",
              }}
            ></Image>
          </View>
          <Text style={textCombinedStyle}>
            {(analysisResult * 100).toFixed(2)}% very happy
          </Text>
        </View>
      );
    } else if (mood == "happy") {
      return (
        <View key={count} style={styles.containerSentiment}>
          <View style={styles.imageView}>
            <Image
              style={imageCombinedStyle}
              source={{
                uri: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/facebook/65/smiling-face-with-open-mouth_1f603.png",
              }}
            ></Image>
          </View>
          <Text style={textCombinedStyle}>
            {(analysisResult * 100).toFixed(2)}% happy
          </Text>
        </View>
      );
    } else if (mood == "neutral") {
      return (
        <View key={count} style={styles.containerSentiment}>
          <View style={styles.imageView}>
            <Image
              style={imageCombinedStyle}
              source={{
                uri: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/facebook/65/neutral-face_1f610.png",
              }}
            ></Image>
          </View>
          <Text style={textCombinedStyle}>
            {(analysisResult * 100).toFixed(2)}% neutral
          </Text>
        </View>
      );
    } else if (mood == "sad") {
      return (
        <View key={count} style={styles.containerSentiment}>
          <View style={styles.imageView}>
            <Image
              style={imageCombinedStyle}
              source={{
                uri: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/facebook/65/worried-face_1f61f.png",
              }}
            ></Image>
          </View>
          <Text style={textCombinedStyle}>
            {(analysisResult * 100).toFixed(2)}% sad
          </Text>
        </View>
      );
    } else if (mood == "very sad") {
      return (
        <View key={count} style={styles.containerSentiment}>
          <View style={styles.imageView}>
            <Image
              style={imageCombinedStyle}
              source={{
                uri: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/facebook/65/loudly-crying-face_1f62d.png",
              }}
            ></Image>
          </View>
          <Text style={textCombinedStyle}>
            {(analysisResult * 100).toFixed(2)}% very sad
          </Text>
        </View>
      );
    }
  } else {
    return;
  }
}

interface TweetItemProps extends NavigationProps {
  tweet: Tweet;
  isSelected: boolean;
  key: number;
  index: number;
  onPressTweetItem: (index: number) => void;
}

interface TweetItemState {
  analysisResult: number[];
  orderResult: string[];
  error: boolean;
  isResultLoading: boolean;
}

export default class TweetItemAccount extends Component<
  TweetItemProps,
  TweetItemState
> {
  state = {
    analysisResult: [0, 0, 1, 0, 0],
    orderResult: ["very happy", "happy", "neutral", "sad", "very sad"],
    error: false,
    isResultLoading: true,
  };

  onPressTweetItem = () => {
    this.setState({
      orderResult: ["very happy", "happy", "neutral", "sad", "very sad"],
    });
    if (this.props.isSelected) {
      this.props.onPressTweetItem(this.props.index);
    } else {
      this.callSentimentAnalysisApi().then((analysisResult: number[]) => {
        this.setState({ analysisResult });
        this.props.onPressTweetItem(this.props.index);
      });
    }
  };

  computeOccurences = (response: any) => {
    var nbVerySad = 0;
    var nbSad = 0;
    var nbNeutral = 0;
    var nbHappy = 0;
    var nbVeryHappy = 0;
    var nbElements = 0;

    response.data.output.map((element: string) => {
      nbElements++;
      if (element == "Verynegative") {
        nbVerySad++;
      } else if (element == "Negative") {
        nbSad++;
      } else if (element == "Neutral") {
        nbNeutral++;
      } else if (element == "Positive") {
        nbHappy++;
      } else if (element == "Verypositive") {
        nbVeryHappy++;
      }
    });
    return [
      nbVeryHappy / nbElements,
      nbHappy / nbElements,
      nbNeutral / nbElements,
      nbSad / nbElements,
      nbVerySad / nbElements,
    ];
  };

  callSentimentAnalysisApi = () => {
    var axios = require("axios");
    var FormData = require("form-data");
    var data = new FormData();
    if (this.props.tweet.text != null) {
      data.append("text", this.props.tweet.text);
    } else {
      data.append("text", "lol");
    }
    var config = {
      method: "post",
      url: "https://api.deepai.org/api/sentiment-analysis",
      headers: {
        "api-key": "d484051b-a1d5-452f-93df-56e313ec562e",
      },
      data: data,
    };
    return axios(config)
      .catch((error: Error) => {
        this.setState({ error: true });
      })
      .then((response: any) => {
        this.setState({ isResultLoading: false });
        return this.computeOccurences(response);
      });
  };

  render() {
    const { tweet, navigation } = this.props;
    const color = "grey";
    const size = 17;
    if (this.props.isSelected == true) {
      const { analysisResult, orderResult } = this.state;
      for (var _i = 0; _i < analysisResult.length; _i++) {
        for (var _j = 0; _j < analysisResult.length; _j++) {
          if (analysisResult[_i] > analysisResult[_j]) {
            var varPassage = analysisResult[_i];
            analysisResult[_i] = analysisResult[_j];
            analysisResult[_j] = varPassage;

            var varPassage2 = orderResult[_i];
            orderResult[_i] = orderResult[_j];
            orderResult[_j] = varPassage2;
          }
        }
      }
      var affichage = [];
      if (this.state.error)
        affichage[0] = (
          <View style={styles.noResultView} key={0}>
            <Text style={styles.noResultText}>An error occured</Text>
          </View>
        );
      else if (this.state.isResultLoading)
        affichage[0] = (
          <View style={styles.noResultView} key={0}>
            <ActivityIndicator
              animating={true}
              size="large"
              color="#6f6cff"
              style={{
                top: 45,
              }}
            />
          </View>
        );
      else
        for (var _i = 0; _i <= analysisResult.length; _i++) {
          affichage[_i] = displayElement(
            _i,
            orderResult[_i],
            analysisResult[_i]
          );
        }

      if (tweet.retweetFrom != "") {
        return (
          <View style={styles.mainContainer}>
            <View style={styles.contentView}>
              <TouchableOpacity
                style={styles.container}
                onPress={() => this.onPressTweetItem()}
              >
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
                <ColoredText
                  textStyle={styles.text}
                  containerTextStyle={{ textAlign: "justify" }}
                  text={tweet.text}
                  color="#3b4552"
                ></ColoredText>
              </TouchableOpacity>
              <Text style={styles.textAnalysis}>Tweet analysis</Text>
              <ScrollView style={styles.analysisView} horizontal={true}>
                {affichage}
              </ScrollView>
            </View>
          </View>
        );
      } else if (tweet.replyTo[0] != "") {
        return (
          <View style={styles.mainContainer}>
            <View style={styles.contentView}>
              <TouchableOpacity
                style={styles.container}
                onPress={() => this.onPressTweetItem()}
              >
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
                <ColoredText
                  textStyle={styles.text}
                  containerTextStyle={{ textAlign: "justify" }}
                  text={tweet.text}
                  color="#3b4552"
                ></ColoredText>
              </TouchableOpacity>
              <Text style={styles.textAnalysis}>Tweet analysis</Text>
              <ScrollView style={styles.analysisView} horizontal={true}>
                {affichage}
              </ScrollView>
            </View>
          </View>
        );
      } else {
        return (
          <View style={styles.mainContainer}>
            <View style={styles.contentView}>
              <TouchableOpacity
                style={styles.container}
                onPress={() => this.onPressTweetItem()}
              >
                <ColoredText
                  textStyle={styles.text}
                  containerTextStyle={{ textAlign: "justify" }}
                  text={tweet.text}
                  color="#3b4552"
                ></ColoredText>
              </TouchableOpacity>
              <Text style={styles.textAnalysis}>Tweet analysis</Text>
              <ScrollView style={styles.analysisView} horizontal={true}>
                {affichage}
              </ScrollView>
            </View>
          </View>
        );
      }
    } else if (this.props.isSelected == false) {
      if (tweet.retweetFrom != "") {
        return (
          <View style={styles.mainContainer}>
            <TouchableOpacity
              style={styles.container}
              onPress={() => this.onPressTweetItem()}
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
                <ColoredText
                  textStyle={styles.text}
                  containerTextStyle={{ textAlign: "justify" }}
                  text={tweet.text}
                  color="#3b4552"
                ></ColoredText>
              </View>
            </TouchableOpacity>
          </View>
        );
      } else if (tweet.replyTo[0] != "") {
        return (
          <View style={styles.mainContainer}>
            <TouchableOpacity
              style={styles.container}
              onPress={() => this.onPressTweetItem()}
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
                <ColoredText
                  textStyle={styles.text}
                  containerTextStyle={{ textAlign: "justify" }}
                  text={tweet.text}
                  color="#3b4552"
                ></ColoredText>
              </View>
            </TouchableOpacity>
          </View>
        );
      } else {
        return (
          <View style={styles.mainContainer}>
            <TouchableOpacity
              style={styles.container}
              onPress={() => this.onPressTweetItem()}
            >
              <View style={styles.contentView}>
                <ColoredText
                  textStyle={styles.text}
                  containerTextStyle={{ textAlign: "justify" }}
                  text={tweet.text}
                  color="#3b4552"
                ></ColoredText>
              </View>
            </TouchableOpacity>
          </View>
        );
      }
    }
  }
}
let { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  analysisView: {
    top: -10,
    paddingHorizontal: -60,
    height: 110,
    marginBottom: -15,
  },
  container: {
    flexDirection: "column",
    flexShrink: 1,
  },
  containerSentiment: {
    marginHorizontal: 20,
    marginBottom: -15,
  },
  contentView: {
    width: width * 0.83,
  },
  commentText: {
    fontFamily: "Verdana",
    fontSize: 12,
    fontWeight: "bold",
    color: "grey",
    top: -2.2,
  },
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
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
    elevation: 3.5,
  },
  noResultText: {
    top: 50,
    fontSize: 16,
    fontFamily: "Verdana",
    color: "#3b4552",
    alignItems: "center",
  },
  noResultView: {
    //backgroundColor: "whitesmoke",
    color: "#fbfdff",
    width: width * 0.8,
    alignItems: "center",
  },
  image: {
    marginTop: 30,
  },
  imageView: {
    alignItems: "center",
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
    height: 0.5,
    backgroundColor: "#d5d5d5",
  },
  text: {
    fontFamily: "Verdana",
    color: "#3b4552",
    fontSize: 15,
  },
  textAnalysis: {
    fontFamily: "Verdana",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    color: "#5f6368",
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
