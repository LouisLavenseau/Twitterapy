import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { NavigationProps } from "../navigation/app-stacks";
import TweetList from "../components/TweetList";
import Tweet from "../services/tweet.model";
import TweeterApi from "../services/tweeterapi.service";
import { Dimensions } from "react-native";
import Toast from "react-native-root-toast";

interface TweetAnalysisScreenState {
  research: string;
  numberOfTweets: string;
  tweets: Array<Tweet>;
  isLoadingResult: boolean;
  error: boolean;
}

export default class TweetAnalysisScreen extends Component<
  NavigationProps,
  TweetAnalysisScreenState
> {
  state = {
    tweets: [],
    research: "",
    numberOfTweets: "10",
    isLoadingResult: false,
    error: false,
  };

  checkKeywordCorrect = (input: string) => {
    if (
      !/^[a-zA-Zàéèùôêâîëüï0123456789 ]+$/.test(input) &&
      !/^[a-zA-Zàéèùôêâîëüï0123456789 ]+[-][a-zA-Zàéèùôêâîëüï0123456789 ]+$/.test(
        input
      ) &&
      !/^[a-zA-Zàéèùôêâîëüï0123456789 ]+['][a-zA-Zàéèùôêâîëüï0123456789 ]*$/.test(
        input
      )
    )
      return true;
    else return false;
  };

  checkNumberOfTweetsCorrect = (input: string) => {
    if (
      !/^[123456789]+[0123456789]*$/.test(input) &&
      !/^[[:space:]]$/.test(input)
    )
      return true;
    else return false;
  };

  onInput = () => {
    if (this.checkKeywordCorrect(this.state.research))
      Toast.show("Invalid keyword", {
        duration: Toast.durations.SHORT,
      });
    else if (this.checkNumberOfTweetsCorrect(this.state.numberOfTweets))
      Toast.show("Invalid number", {
        duration: Toast.durations.SHORT,
      });
    else if (Number(this.state.numberOfTweets) > 50)
      Toast.show("Maximum number of tweets reached", {
        duration: Toast.durations.SHORT,
      });
    else {
      this.setState({ isLoadingResult: true });
      if (Number(this.state.numberOfTweets) <= 4) {
        var numberOfTweets = Number(this.state.numberOfTweets);
        numberOfTweets++;
        var stringNumberOfTweets = numberOfTweets.toString();
        this.setState({ numberOfTweets: stringNumberOfTweets });
      }
      TweeterApi.searchTweetsByKeyWord(
        this.state.research,
        this.state.numberOfTweets
      )
        .catch((error: Error) => {
          this.setState({ error: true });
        })
        .then((tweets: any) => {
          this.setState({ tweets });
          this.setState({ isLoadingResult: false });
        });
    }
  };

  onChangeTextResearch = (research: string) => {
    this.setState({ research: research });
  };

  onChangeTextNumberOfTweets = (numberOfTweets: string) => {
    this.setState({ numberOfTweets: numberOfTweets });
  };

  render() {
    var affichage = [];

    if (this.state.error)
      affichage[0] = (
        <View style={styles.noResultView} key={0}>
          <Text style={styles.noResultText}>An error occured</Text>
        </View>
      );
    else if (this.state.isLoadingResult)
      affichage[0] = (
        <View style={styles.noResultView} key={0}>
          <ActivityIndicator
            animating={true}
            size="large"
            color="#6f6cff"
            style={{
              top: height / 17,
            }}
          />
        </View>
      );
    else
      affichage[0] = (
        <TweetList
          tweets={this.state.tweets}
          navigation={this.props.navigation}
          key={0}
        />
      );

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.buttonArea}>
            <View style={styles.titleView}>
              <Text style={styles.title}>Discover sentiments of tweets! </Text>
            </View>
          </View>
          <View style={styles.buttonArea}>
            <View style={styles.descriptionView}>
              <Text style={styles.inputDescription}> Enter a keyword </Text>
            </View>
          </View>
          <View style={styles.buttonArea}>
            <TextInput
              style={styles.input}
              placeholder="Keyword"
              placeholderTextColor="#b9babf"
              onChangeText={(text) => this.onChangeTextResearch(text)}
            />
          </View>
          <View style={styles.betweenInputs}></View>
          <View style={styles.buttonArea}>
            <View style={styles.descriptionView}>
              <Text style={styles.inputDescription}>
                {" "}
                Enter the number of tweets to display{" "}
              </Text>
            </View>
          </View>
          <View style={styles.buttonArea}>
            <TextInput
              style={styles.input}
              placeholder="Number of tweets"
              placeholderTextColor="#b9babf"
              onChangeText={(text) => this.onChangeTextNumberOfTweets(text)}
            />
          </View>
          <View style={styles.betweenInputButton}></View>
          <View style={styles.buttonArea}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.onInput();
              }}
            >
              <Text style={styles.textButton}> Search </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.betweenButtonTweetList}></View>
          <View style={styles.buttonArea}>{affichage}</View>
        </View>
      </ScrollView>
    );
  }
}

let { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  backgroundTop: {
    flex: 0.8,
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
    borderTopEndRadius: 25,
    borderTopLeftRadius: 25,
    height: 390,
    //backgroundColor: "whitesmoke",
  },
  betweenButtonTweetList: {
    height: 50,
  },
  betweenInputs: {
    height: 5,
  },
  betweenInputButton: {
    height: 30,
  },
  button: {
    backgroundColor: "#6f6cff",
    width: width * 0.9,
    height: width * 0.9 * 0.17,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
  },
  buttonArea: {
    alignItems: "center",
    borderRadius: 10,
    borderColor: "black",
  },
  centerView: {
    flex: 0.05,
    color: "#fbfdff",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  descriptionView: {
    width: width * 0.9,
    height: width * 0.9 * 0.075,
  },
  input: {
    width: width * 0.9,
    height: width * 0.9 * 0.17,
    backgroundColor: "#fbfdff",
    fontFamily: "Verdana",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    borderColor: "grey",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,

    elevation: 3.5,
  },
  inputDescription: {
    fontFamily: "Verdana",
    fontSize: 15,
    color: "#5f6368",
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
    height: 150,
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  textButton: {
    fontFamily: "Verdana",
    fontWeight: "bold",
    color: "#fbfdff",
    fontSize: 17,
    textAlign: "center",
  },
  title: {
    fontFamily: "Verdana",
    fontSize: width / 13,
    fontWeight: "bold",
    color: "#3b4552",
  },
  titleView: {
    width: width * 0.9,
    height: width * 0.9 * 0.32,
  },
});
