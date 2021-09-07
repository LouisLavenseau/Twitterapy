import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Button,
} from "react-native";
import { RouteProp } from "@react-navigation/core";
import { RootStackParamList, NavigationProps } from "../navigation/app-stacks";
import Tweet from "../services/tweet.model";
import TweetItemResult from "../components/TweetItemResult";
import TwitterApi from "../services/tweeterapi.service";
import { Dimensions } from "react-native";
import { HeaderHeightContext } from "@react-navigation/stack";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

interface AnalysisResultScreenProps extends NavigationProps {
  route: RouteProp<RootStackParamList, "TweetAnalysisResult">;
}

interface TweetAnalysisScreenState {
  tweet: Tweet;
  isResultLoading: boolean;
  analysisResult: number[];
  error: boolean;
}

//This function allows to display the mood
function displayElement(count: number, mood: string, analysisResult: number) {
  if (analysisResult != 0) {
    if (analysisResult * 200 >= 20) {
      var imageStyle = {
        width: 200 * analysisResult,
        height: 200 * analysisResult,
      };
    } else {
      var imageStyle = {
        width: 20,
        height: 20,
      };
    }
    var imageCombinedStyle;
    imageCombinedStyle = StyleSheet.flatten([styles.image, imageStyle]);

    if (analysisResult * 40 >= 10) {
      var textStyle = { fontSize: 35 * analysisResult };
    } else {
      var textStyle = { fontSize: 10 };
    }
    var textCombinedStyle = StyleSheet.flatten([styles.text, textStyle]);

    if (mood == "very happy") {
      return (
        <View key={count} style={styles.container}>
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
        <View key={count} style={styles.container}>
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
        <View key={count} style={styles.container}>
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
        <View key={count} style={styles.container}>
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
        <View key={count} style={styles.container}>
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

export default class TweetAnalysisResultScreen extends Component<
  AnalysisResultScreenProps,
  TweetAnalysisScreenState
> {
  state = {
    isResultLoading: true,
    tweet: new Tweet(1, "coucou", "bernie", "pdp", [""]),
    analysisResult: [], // Order from very happy to very sad
    orderResult: ["very happy", "happy", "neutral", "sad", "very sad"],
    test: "pas appuyé",
    error: false,
  };

  componentDidMount() {
    const resultTweet = this.props.route.params.tweet;
    this.setState({ tweet: resultTweet });
    var nbVerySad = 0;
    var nbSad = 0;
    var nbNeutral = 0;
    var nbHappy = 0;
    var nbVeryHappy = 0;
    var nbElements = 0;
    const deepai = require("deepai");
    var { tweet } = this.state;

    var axios = require("axios");
    var FormData = require("form-data");
    var data = new FormData();
    data.append("text", resultTweet.text);

    var config = {
      method: "post",
      url: "https://api.deepai.org/api/sentiment-analysis",
      headers: {
        "api-key": "d484051b-a1d5-452f-93df-56e313ec562e",
      },
      data: data,
    };
    axios(config)
      .catch((error: Error) => {
        this.setState({ error: true });
        console.error(error);
      })
      .then((response: any) => {
        response.data.output.map((element: any) => {
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
      })
      .then(() => {
        const analysisResult = [
          nbVeryHappy / nbElements,
          nbHappy / nbElements,
          nbNeutral / nbElements,
          nbSad / nbElements,
          nbVerySad / nbElements,
        ];
        this.setState({ analysisResult });
        this.setState({ isResultLoading: false });
      });
  }

  render() {
    {
      //sort the results in descending order to have the main emotions in 1st
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
      //creation of the display
      var affichage = [];
      if (this.state.tweet != null) {
        affichage[0] = (
          <Text style={styles.textPresentation} key={0}>
            {" "}
            The tweet{" "}
          </Text>
        );
        affichage[1] = (
          <TweetItemResult
            key={1}
            tweet={this.state.tweet}
            navigation={this.props.navigation}
          />
        );
        affichage[2] = (
          <Text
            style={StyleSheet.flatten([styles.textPresentation, { left: 3 }])}
            key={2}
          >
            {" "}
            is ...{" "}
          </Text>
        );
      }
      if (this.state.error)
        affichage[3] = (
          <View style={styles.noResultView} key={3}>
            <Text style={styles.noResultText}>An error occured</Text>
          </View>
        );
      else if (this.state.isResultLoading)
        affichage[3] = (
          <View style={styles.noResultView} key={3}>
            <ActivityIndicator
              animating={true}
              size="large"
              color="#6f6cff"
              style={{
                top: height / 10,
              }}
            />
          </View>
        );
      for (var _i = 3; _i < analysisResult.length + 3; _i++) {
        affichage[_i] = displayElement(
          _i,
          orderResult[_i - 3],
          analysisResult[_i - 3]
        );
      }
      return (
        <ScrollView>
          <View style={styles.mainContainer}>
            <View style={styles.container2}>{affichage}</View>
            <View style={styles.bottom}></View>
          </View>
        </ScrollView>
      );
    }
  }
}

let { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  bottom: {
    height: 20,
  },
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  container2: {
    width: width * 0.9,
  },
  image: {
    marginTop: 30,
  },
  imageView: {
    alignItems: "center",
  },
  mainContainer: {
    flex: 1,
    paddingTop: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    //backgroundColor: "whitesmoke",
  },
  noResultText: {
    top: 20,
    fontSize: 16,
    fontFamily: "Verdana",
    color: "#3b4552",
  },
  noResultView: {
    //backgroundColor: "whitesmoke",
    color: "#fbfdff",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  textPresentation: {
    fontFamily: "Verdana",
    fontSize: 20,
    color: "#3b4552",
    fontWeight: "bold",
    marginVertical: 15,
  },

  text: {
    textAlign: "center",
    marginHorizontal: 10,
    fontSize: 15,
    fontFamily: "Verdana",
    color: "#3b4552",
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
  },
});
