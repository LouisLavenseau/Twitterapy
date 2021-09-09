import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import Tweet from "../services/tweet.model";
import Account from "../services/account.model";
import { Dimensions } from "react-native";
import { useState } from "react";
import { AuthContext } from "../components/Context";
import TwitterApi from "../services/tweeterapi.service";
import Toast from "react-native-root-toast";

export default function SignInScreen(props: any) {
  const [account, setAccount] = useState(
    new Account(
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      [""],
      "",
      "",
      "",
      [new Tweet(0, "", "", "", [""])],
      ""
    )
  );

  const [data, setData] = React.useState({
    username: "",
    check_textInputChange: false,
    secureTextEntry: true,
  });

  const { returnAccount, signIn } = React.useContext(AuthContext);

  const textInputChange = (val: string) => {
    setData({
      ...data,
      username: val,
      check_textInputChange: true,
    });
  };

  const loginHandle = (userName: string) => {
    var result = "";
    if (userName == "") {
      const result = new Account(
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        [""],
        "",
        "",
        "",
        [new Tweet(0, "", "", "", [""])],
        ""
      );
      returnAccount.user = "john doe";
      returnAccount.userName = "johnDoe33";
      returnAccount.name = "John Doe";
      returnAccount.profileImage = "";
      returnAccount.bannerImage = "";
      returnAccount.description = "";
      returnAccount.location = "";
      returnAccount.creationDate = "";
      returnAccount.urls = [];
      returnAccount.friendsCount = "0";
      returnAccount.followersCount = "0";
      returnAccount.tweets = "very happy";
      returnAccount.singleTweets = [
        new Tweet(0, "I am very happy :D", "", "", [""]),
      ];
      returnAccount.userToken = "oikjl";
      signIn(result);
    } else {
      TwitterApi.searchAccountByPseudo(data.username).then((result) => {
        if (result == null) {
          Toast.show("Invalid username", {
            duration: Toast.durations.SHORT,
          });
        } else {
          returnAccount.userName = result.userName;
          returnAccount.name = result.name;
          returnAccount.profileImage = result.profileImage;
          returnAccount.bannerImage = result.bannerImage;
          returnAccount.description = result.description;
          returnAccount.location = result.location;
          returnAccount.urls = result.urls;
          returnAccount.creationDate = result.creationDate;
          returnAccount.friendsCount = result.friendsCount;
          returnAccount.followersCount = result.followersCount;
          returnAccount.tweets = result.tweets;
          returnAccount.singleTweets = result.singleTweets;
          returnAccount.userToken = result.userToken;
          signIn(result);
        }
      });
    }
  };

  {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../assets/images/futuristic4.png")}
        ></Image>
        <View style={styles.backgroundTop}>
          <View style={styles.appNameView}>
            <View style={{ width: width * 0.9 }}>
              <Text style={styles.appName}>Welcome to Twitterapy!</Text>
            </View>
          </View>
          <View style={{ alignItems: "center" }}></View>
          <View style={styles.top}></View>
          <View style={styles.buttonArea}>
            <View style={styles.descriptionView}>
              <Text style={styles.inputDescription}>
                {" "}
                Enter your Twitter username{" "}
              </Text>
            </View>
          </View>
          <View style={styles.buttonArea}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#b9babf"
              onChangeText={(text) => textInputChange(text)}
            />
          </View>

          <View style={styles.buttonArea}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                loginHandle(data.username);
              }}
            >
              <Text style={styles.textButton}> Sign In </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonArea}>
            <View style={styles.singleTweets}>
              <Text style={styles.singleTweetsText}>
                <TouchableOpacity
                  onPress={() => {
                    loginHandle("");
                  }}
                >
                  <Text style={styles.withoutConnecting}>
                    Or enter without signining in
                  </Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

let { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  appName: {
    fontFamily: "Verdana",
    fontSize: width / 6.6,
    color: "#fbfdff",
    fontWeight: "bold",
    zIndex: 1,
    textShadowColor: "#5f6368",
    textShadowRadius: 30,
    textAlign: "center",
  },
  appNameView: {
    alignItems: "center",
    top: 10,
  },
  backgroundTop: {
    height: height / (width / 220),
    top: (-width / 1350) * height,

    marginTop: -height / (width / 224),

    zIndex: 1,
  },
  button: {
    backgroundColor: "#6f6cff",
    width: width * 0.9,
    height: width * 0.9 * 0.17,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    top: 20,
  },
  buttonArea: {
    alignItems: "center",
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
  image: {
    zIndex: 1,
    width: width,

    flex: 1,
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

    color: "#fbfdff",
    textShadowColor: "#5f6368",
    textShadowRadius: 8,
  },
  leftTransition: {
    height: 200,
    width: width / 2 + 5,
    zIndex: 2,
    top: -100,
  },
  rightTransition: {
    height: 200,
    width: width / 2 + 5,
    zIndex: 0,
    left: width / 2,
    top: -300,
  },
  row: {
    height: 1,
    width: width * 0.9,
    backgroundColor: "#bebebe",
    top: 30,
  },
  scrollView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  singleTweets: {
    width: width * 0.9,
    top: 60,
    flexDirection: "row-reverse",
  },
  singleTweetsText: {
    fontFamily: "Verdana",
    fontWeight: "bold",
    color: "#3b4552",
    fontSize: 15,
    textDecorationLine: "underline",
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
    fontSize: 25,
    fontWeight: "bold",

    color: "#fbfdff",
    textShadowColor: "#5f6368",
    textShadowRadius: 30,
  },
  titleView: {
    width: width * 0.9,
    height: width * 0.9 * 0.24,
  },
  top: {
    height: height / 18,
  },
  transitionContainer: {
    flexDirection: "row",
    height: 100,
    width: width,
    top: -70,
  },

  tweetList: {
    flex: 1.2,
    backgroundColor: "green",
  },
  withoutConnecting: {
    fontFamily: "Verdana",
    fontSize: 17,
    fontWeight: "bold",
    color: "#fbfdff",
    textShadowColor: "#5f6368",
    textShadowRadius: 8,
    textDecorationLine: "underline",
  },
});
