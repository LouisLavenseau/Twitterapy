import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import TweeterApi from "../services/tweeterapi.service";
import Account from "../services/account.model";
import { Dimensions } from "react-native";
import { AuthContext } from "../components/Context";
import Toast from "react-native-root-toast";

export default function AccountAnalysisScreen(props: any) {
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

  const [research, setResearch] = React.useState("");

  const onChangeTextResearch = (research: string) => {
    setResearch(research);
  };

  const onInput = () => {
    TweeterApi.searchAccountByPseudo(research).then((account) => {
      if (account == null)
        Toast.show("Invalid username", {
          duration: Toast.durations.SHORT,
        });
      else {
        props.navigation.navigate("AccountAnalysisResult", {
          account: account,
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundTop}>
        <View style={styles.buttonArea}>
          <View style={styles.titleView}>
            <Text style={styles.title}>
              Discover sentiments of people on Twitter!{" "}
            </Text>
          </View>
        </View>
        <View style={styles.buttonArea}>
          <View style={styles.descriptionView}>
            <Text style={styles.inputDescription}> Enter a username </Text>
          </View>
        </View>
        <View style={styles.buttonArea}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#b9babf"
            onChangeText={(text) => onChangeTextResearch(text)}
          />
        </View>

        <View style={styles.buttonArea}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onInput();
            }}
          >
            <Text style={styles.textButton}> Analyze </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

let { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  backgroundTop: {
    //backgroundColor: "whitesmoke",
    height: 400,

    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.5,
    zIndex: 1,
  },
  button: {
    backgroundColor: "#6f6cff",

    width: width * 0.9,
    height: width * 0.9 * 0.17,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    top: 30,
  },
  buttonArea: {
    alignItems: "center",

    borderRadius: 20,
  },
  centerView: {
    flex: 0.05,
    color: "#fbfdff",
    //backgroundColor: "whitesmoke",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    //backgroundColor: "whitesmoke",
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
  leftTransition: {
    height: 200,
    width: width / 2 + 5,
    zIndex: 2,
    top: -100,
    //backgroundColor: "whitesmoke",
  },
  rightTransition: {
    height: 200,
    width: width / 2 + 5,
    zIndex: 0,
    left: width / 2,
    top: -300,
    //backgroundColor: "whitesmoke",
  },
  scrollView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    //backgroundColor: "whitesmoke",
  },
  singleTweets: {
    width: width * 0.9,
    top: 60,
    flexDirection: "row-reverse",
    //backgroundColor: "whitesmoke",
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
    fontSize: width / 13,
    fontWeight: "bold",
    color: "#3b4552",
  },
  titleView: {
    width: width * 0.9,
    height: width * 0.9 * 0.32,
    //backgroundColor: "whitesmoke",
  },
  transitionContainer: {
    flexDirection: "row",
    //backgroundColor: "whitesmoke",
    width: width,
  },
  tweetList: {
    flex: 1.2,
  },
});
