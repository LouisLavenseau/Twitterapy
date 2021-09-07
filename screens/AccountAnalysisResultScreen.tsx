import React from "react";
import { Dimensions } from "react-native";
import { StyleSheet, View, ActivityIndicator, ScrollView } from "react-native";
import ButtonsAndContentAccount from "../components/ButtonsAndContentAccount";
import Account from "../services/account.model";
import AccountItem from "../components/AccountItem";
import { AuthContext } from "../components/Context";
import { useEffect } from "react";

export default function AccountAnalysisResultScreen(props: any) {
  const { returnAccount } = React.useContext(AuthContext);
  const [account, setAccount] = React.useState(
    new Account(
      returnAccount.user,
      returnAccount.userName,
      returnAccount.name,
      returnAccount.profileImage,
      returnAccount.bannerImage,
      returnAccount.description,
      returnAccount.location,
      returnAccount.creationDate,
      returnAccount.urls,
      returnAccount.friendsCount,
      returnAccount.followersCount,
      returnAccount.tweets,
      returnAccount.singleTweets,
      returnAccount.userToken
    )
  );

  const [isResultLoading, setIsResultLoading] = React.useState(true);
  const [analysisResult, setAnalysisResult] = React.useState([0, 0, 1, 0, 0]);
  const [orderResult, setOrderResult] = React.useState([
    "very happy",
    "happy",
    "neutral",
    "sad",
    "very sad",
  ]);
  const [selectedButton, setSelectedButton] = React.useState(
    "Single tweets analysis"
  );
  const [stabilizer, setStabilizer] = React.useState("stabilized");
  const [error, setError] = React.useState(false);

  useEffect(() => {
    var resultAccount;
    if (props.route.params != undefined) {
      resultAccount = props.route.params.account;
      setAccount(resultAccount);
    } else {
      resultAccount = account;
      setAccount(resultAccount);
    }

    if (resultAccount.tweets != "[]") {
      var nbVerySad = 0;
      var nbSad = 0;
      var nbNeutral = 0;
      var nbHappy = 0;
      var nbVeryHappy = 0;
      var nbElements = 0;

      var axios = require("axios");
      var FormData = require("form-data");
      var data = new FormData();

      data.append("text", resultAccount.tweets);

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
          setError(true);
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
          setAnalysisResult(analysisResult);
          setIsResultLoading(false);
        });
    } else {
      setIsResultLoading(false);
    }
  }, [stabilizer]);

  const onPressSentimentAnalysis = () => {
    setSelectedButton("Single tweets analysis");
    setOrderResult(["very happy", "happy", "neutral", "sad", "very sad"]);
  };

  const onPressTweetsDisplay = () => {
    setSelectedButton("Global account analysis");

    setOrderResult(["very happy", "happy", "neutral", "sad", "very sad"]);
  };

  {
    //sort the results in descending order to have the main emotions in 1st
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
      <AccountItem
        key={0}
        account={account}
        selectedButton={selectedButton}
        user={account.user}
        navigation={props.navigation}
        onPressSentimentAnalysis={() => {
          onPressSentimentAnalysis();
        }}
        onPressTweetsDisplay={() => {
          onPressTweetsDisplay();
        }}
      />
    );
    affichage[1] = (
      <ButtonsAndContentAccount
        key={1}
        account={account}
        isLoading={isResultLoading}
        analysisResult={analysisResult}
        orderResult={orderResult}
        error={error}
        navigation={props.navigation}
      />
    );

    return (
      <ScrollView style={styles.scrollView}>
        {affichage}
        <View style={styles.bottom}></View>
      </ScrollView>
    );
  }
}

let { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
    color: "black",
  },

  blackRow: {
    width: width,
    height: 0.3,
    backgroundColor: "#d7dadc",
  },
  blueRectangle: {
    backgroundColor: "#00ACEE",
    width: "100%",
    height: 4,
    bottom: 0,
  },
  bottom: {
    height: 15,
  },
  bottomPart: {
    flexDirection: "column",
    justifyContent: "flex-start",
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
  },
  descriptionButton: {
    fontSize: 17,
    fontWeight: "bold",
    flexShrink: 1,
    color: "#5b7083",
  },
  image: {
    marginTop: 30,
  },
  mainContainer: {
    flex: 1,
    paddingTop: 0,
    justifyContent: "flex-start",
  },
  scrollView: {
    flexDirection: "column",
  },
  selectedDescriptionButton: {
    fontSize: 17,
    fontWeight: "bold",
    flexShrink: 1,
    color: "#00ACEE",
  },
  text: {
    textAlign: "center",
    marginHorizontal: 10,
  },
  title: { fontSize: 22, marginBottom: 10 },
  touchableOpacity: {
    left: 150,
    padding: 10,
  },
  viewSelectedDescriptionButton: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
