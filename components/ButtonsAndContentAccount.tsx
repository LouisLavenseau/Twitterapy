import React, { Component } from "react";
import Tweet from "../services/tweet.model";
import { Dimensions, TouchableOpacity } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Account from "../services/account.model";
import TweetListAccount from "../components/TweetListAccount";

interface AnalysisResultScreenProps {
  navigation: any;
  account: Account;
  isLoading: boolean;
  analysisResult: number[];
  orderResult: string[];
  error: boolean;
}

interface AnalysisResultScreenState {
  selectedButton: string;
}

export default class ButtonsAndContentAccount extends Component<
  AnalysisResultScreenProps,
  AnalysisResultScreenState
> {
  state = {
    selectedButton: "Single tweets analysis",
  };

  onPressSentimentAnalysis = () => {
    this.setState({ selectedButton: "Global account analysis" });
  };

  onPressTweetsDisplay = () => {
    this.setState({ selectedButton: "Single tweets analysis" });
  };

  render() {
    var { account } = this.props;
    {
      if (this.state.selectedButton == "Global account analysis") {
        //sort the results in descending order to have the main emotions in 1st
        const { analysisResult, orderResult } = this.props;
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
        var accountItem;
        affichage[0] = (
          <View style={styles.bottomPart} key={0}>
            <View style={styles.buttons}>
              <TouchableOpacity
                onPress={() => {
                  this.onPressTweetsDisplay();
                }}
              >
                <View style={styles.viewSelectedDescriptionButton}>
                  <Text style={styles.descriptionButton}>
                    Single tweets analysis
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.onPressSentimentAnalysis();
                }}
              >
                <View style={styles.viewSelectedDescriptionButton}>
                  <Text style={styles.selectedDescriptionButton}>
                    Global account analysis
                  </Text>
                  <View style={styles.blueRectangle}></View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.blackRow}></View>
          </View>
        );
        if (this.props.account.tweets == "[]") {
          affichage[1] = (
            <View style={styles.noResultView} key={1}>
              <Text style={styles.noResultText}>No result analysis</Text>
            </View>
          );
        } else if (this.props.error == true) {
          affichage[1] = (
            <View style={styles.noResultView} key={1}>
              <Text style={styles.noResultText}>An error occured</Text>
            </View>
          );
        } else if (this.props.isLoading) {
          affichage[1] = (
            <View style={{ height: 100 }} key={1}>
              <ActivityIndicator
                animating={true}
                size="large"
                color="#6f6cff"
                key={1}
                style={{
                  top: 60,
                }}
              />
            </View>
          );
        } else {
          for (var _i = 1; _i <= analysisResult.length; _i++) {
            var userNameAccount = " ";
            if (this.props.account != null) {
              userNameAccount = this.props.account.userName;
            }
            affichage[_i] = displayElement(
              _i,
              orderResult[_i - 1],
              analysisResult[_i - 1]
            );
          }
        }

        return (
          <View style={styles.mainContainer}>
            <ScrollView>{affichage}</ScrollView>
          </View>
        );
      } else if (this.state.selectedButton == "Single tweets analysis") {
        var affichage = [];
        if (this.props.account != null) {
          affichage[0] = (
            <View style={styles.bottomPart} key={0}>
              <View style={styles.buttons}>
                <TouchableOpacity
                  onPress={() => {
                    this.onPressTweetsDisplay();
                  }}
                >
                  <View style={styles.viewSelectedDescriptionButton}>
                    <Text style={styles.selectedDescriptionButton}>
                      Single tweets analysis
                    </Text>
                    <View style={styles.blueRectangle}></View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.onPressSentimentAnalysis();
                  }}
                >
                  <View style={styles.viewSelectedDescriptionButton}>
                    <Text style={styles.descriptionButton}>
                      Global account analysis
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.blackRow}></View>
            </View>
          );
          affichage[1] = (
            <TweetListAccount
              tweets={account.singleTweets}
              navigation={this.props.navigation}
              key={1}
            />
          );
        }
        return <View style={styles.scrollView}>{affichage}</View>;
      }
    }
  }
}

function displayElement(count: number, mood: string, analysisResult: number) {
  if (analysisResult != 0) {
    if (analysisResult * 200 >= 20) {
      var imageStyle = {
        width: 200 * analysisResult,
        height: 200 * analysisResult,
      };
    } else {
      var imageStyle = { width: 20, height: 20 };
    }
    var imageCombinedStyle;
    imageCombinedStyle = StyleSheet.flatten([styles.image, imageStyle]);

    if (analysisResult * 40 >= 10) {
      var textStyle = { fontSize: 40 * analysisResult };
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

let { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 0,
    justifyContent: "flex-start",
    ////backgroundColor: "whitesmoke",
  },
  blackRow: {
    width: width,
    height: 1,
    backgroundColor: "#d7dadc",
  },
  blueRectangle: {
    backgroundColor: "#6f6cff",
    width: "100%",
    height: 4,
    bottom: 0,
  },
  bottomPart: {
    flexDirection: "column",
    justifyContent: "flex-start",
    ////backgroundColor: "whitesmoke",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 35,
    width: "100%",
  },
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 10,
    ////backgroundColor: "whitesmoke",
  },
  image: {
    marginTop: 30,
  },
  imageView: {
    alignItems: "center",
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
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
  },
  text: {
    textAlign: "center",
    marginHorizontal: 10,
    color: "#3b4552",
  },
  viewSelectedDescriptionButton: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    //backgroundColor: "whitesmoke",
  },
  scrollView: {
    flexDirection: "column",
    //backgroundColor: "whitesmoke",
  },
  selectedDescriptionButton: {
    fontSize: 17,
    fontWeight: "bold",
    flexShrink: 1,
    color: "#6f6cff",
    //backgroundColor: "whitesmoke",
  },
  touchableOpacity: {
    left: 150,
    padding: 10,
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionButton: {
    fontSize: 17,
    fontWeight: "bold",
    flexShrink: 1,
    color: "#5b7083",
  },
});
