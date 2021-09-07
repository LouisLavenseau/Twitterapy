import React, { Component } from "react";
import { Dimensions } from "react-native";
import { Text, View, StyleSheet, Image } from "react-native";
import { NavigationProps } from "../navigation/app-stacks";
import displayCounts from "./DisplayCounts";
import Account from "../services/account.model";
import ProfileImage from "./ProfileImage";
import BannerImage from "./BannerImage";
import AccountInformation from "./AccountInformation";
import DescriptionAccount from "./DescriptionAccount";

const displayCreationDate = (date: string): string => {
  var result = "";
  if (date != "") {
    result = "Joined ";
    if (date[4] == "J" && date[5] == "a" && date[6] == "n") {
      result += " January";
    }
    if (date[4] == "F" && date[5] == "e" && date[6] == "b") {
      result += " February";
    }
    if (date[4] == "M" && date[5] == "a" && date[6] == "r") {
      result += " March";
    }
    if (date[4] == "A" && date[5] == "p" && date[6] == "r") {
      result += " April";
    }
    if (date[4] == "M" && date[5] == "a" && date[6] == "y") {
      result += " May";
    }
    if (date[4] == "J" && date[5] == "u" && date[6] == "n") {
      result += " June";
    }
    if (date[4] == "J" && date[5] == "u" && date[6] == "l") {
      result += " July";
    }
    if (date[4] == "A" && date[5] == "u" && date[6] == "g") {
      result += " August";
    }
    if (date[4] == "S" && date[5] == "e" && date[6] == "p") {
      result += " September";
    }
    if (date[4] == "O" && date[5] == "c" && date[6] == "t") {
      result += " October";
    }
    if (date[4] == "N" && date[5] == "o" && date[6] == "v") {
      result += " November";
    }
    if (date[4] == "D" && date[5] == "e" && date[6] == "c") {
      result += " December";
    }
    result += " " + date[26] + date[27] + date[28] + date[29];
  }
  return result;
};

interface AccountItemProps extends NavigationProps {
  user: string;
  account: Account;
  selectedButton: string;
  onPressSentimentAnalysis: () => void;
  onPressTweetsDisplay: () => void;
}

interface AccountItemState {
  selectedButton: string;
}

export default class AccountItem extends Component<
  AccountItemProps,
  AccountItemState
> {
  state = {
    selectedButton: this.props.selectedButton,
  };

  onPressSentimentAnalysis = () => {
    this.setState({ selectedButton: "Sentiment analysis" });
  };

  onPressSentimentAnalysis2 = () => {
    this.props.onPressSentimentAnalysis();
  };

  onPressTweetsDisplay = () => {
    this.setState({ selectedButton: "Tweets display" });
  };

  onPressTweetsDisplay2 = () => {
    this.props.onPressTweetsDisplay();
  };

  test = () => {};

  componentDidMount() {}
  render() {
    const { account, navigation } = this.props;
    const { selectedButton } = this.state;
    const creationDate = displayCreationDate(account.creationDate);
    return (
      <View style={styles.mainContainer}>
        <BannerImage
          style={styles.imageBanner}
          source={account.bannerImage}
          bannerImageType={this.props.user}
        ></BannerImage>
        <View style={styles.container}>
          <View style={styles.whiteCircle}></View>
          <ProfileImage
            style={styles.imageProfile}
            size={90}
            profileImageType={this.props.user}
            source={account.profileImage}
          ></ProfileImage>
          <Text style={styles.name}>{account.name}</Text>
          <Text style={styles.userName}>@{account.userName}</Text>
          <View>
            <DescriptionAccount
              viewStyle={styles.descriptionView}
              textStyle={styles.description}
              text={account.description}
              color={"black"}
            ></DescriptionAccount>
          </View>
          <View style={styles.accountInfosView}>
            <AccountInformation
              viewStyle={{
                flexDirection: "row",
                marginRight: 10,
                marginVertical: 2.5,
              }}
              imageStyle={styles.iconeLocation}
              type="location"
              textStyle={styles.location}
              text={account.location}
            ></AccountInformation>
            <AccountInformation
              viewStyle={{
                flexDirection: "row",
                marginRight: 10,
                marginVertical: 2.5,
              }}
              imageStyle={styles.urlsIcone}
              type="urls"
              textStyle={styles.urls}
              urls={account.urls}
            ></AccountInformation>
            <AccountInformation
              viewStyle={{
                flexDirection: "row",
                marginVertical: 2.5,
              }}
              imageStyle={styles.iconeCalendar}
              type="creationDate"
              textStyle={styles.date}
              text={creationDate}
            ></AccountInformation>
          </View>
          <View style={styles.accountInfosView}>
            <Text style={styles.friendsCounts}>
              {displayCounts(account.friendsCount)}
            </Text>
            <Text style={styles.friendsFollowers}> Following</Text>
            <Text style={styles.followersCounts}>
              {displayCounts(account.followersCount)}
            </Text>
            <Text style={styles.friendsFollowers}> Followers</Text>
          </View>
        </View>
        <View style={styles.bottom}></View>
      </View>
    );
  }
}

let { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  accountInfosView: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginLeft: 4,
    marginTop: 12,
  },
  blueRectangle: {
    backgroundColor: "#00ACEE",
    width: "100%",
    height: 4,
    bottom: 0,
  },
  bottom: {
    height: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 35,
  },
  container: {
    marginLeft: 12,
  },
  date: {
    fontSize: 15,
    paddingLeft: 5,
    paddingRight: 9,
    color: "grey",
  },
  description: {
    fontSize: 15,
  },
  descriptionButton: {
    fontSize: 17,
    fontWeight: "bold",
    flexShrink: 1,
    color: "#5b7083",
  },
  descriptionView: {
    marginTop: 12,
    marginLeft: 4,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  followersCounts: {
    fontSize: 15,
    paddingLeft: 8,
    color: "black",
    fontWeight: "bold",
  },
  friendsCounts: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
  },
  friendsFollowers: {
    fontSize: 15,
    paddingRight: 9,
    color: "grey",
  },
  iconeCalendar: {
    height: 16,
    width: 16,
    top: 2,
  },
  iconeLocation: {
    height: 13,
    width: 13,
    top: 4,
    marginRight: 4,
  },
  imageBanner: {
    alignItems: "center",
    height: width / 3,
    width: width,
    padding: 0,
  },
  imageProfile: {
    alignItems: "center",
    marginTop: -95,
    height: 90,
    width: 90,
    borderRadius: 150,
    marginLeft: 5,
    marginBottom: 5,
  },
  location: {
    fontSize: 15,
    paddingRight: 9,
    color: "grey",
  },
  mainContainer: {
    justifyContent: "flex-start",
    flexDirection: "column",
    ////backgroundColor: "whitesmoke",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profile: {
    flexDirection: "row",
    position: "absolute",
    top: (width * 1.75) / 9,
    marginLeft: 12,
  },
  rectangle: {
    backgroundColor: "#00ACEE",
    width: 5,
    height: 45,
  },
  selectedDescriptionButton: {
    fontSize: 17,
    fontWeight: "bold",
    flexShrink: 1,
    color: "#00ACEE",
  },
  text: {
    marginLeft: 0,
    fontSize: 15,
  },
  urls: {
    fontSize: 15,
    paddingLeft: 5,
    paddingRight: 9,
    color: "#6f6cff",
  },
  urlsIcone: {
    height: 14,
    width: 14,
    top: 4,
  },
  userName: {
    marginLeft: 2,
    fontSize: 15,
    marginBottom: 2,
    color: "grey",
  },
  viewSelectedDescriptionButton: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  whiteCircle: {
    backgroundColor: "#f2f2f2",
    height: 100,
    width: 100,
    borderRadius: 150,
    marginTop: -110 / 3,
  },
});
