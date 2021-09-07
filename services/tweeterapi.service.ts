import Tweet from "./tweet.model";
import { PanResponder } from "react-native";
import Account from "./account.model";

const url =
  "https://thawing-plains-77126.herokuapp.com/api.twitter.com/1.1/search/tweets.json";

const apiKey = "yMBWLa2gPdILcqLYwlb8aUpIA";
const apiSecretKey = "bGJwQvINKQQYYDnP1SWdoA1y9sGiTP6jMAx9ssXLHjkgVGOuTA";
const accessToken = "1383038798901227524-eDrV3vGfoyms4P5vPUXmNFWguxaPnh";
const accessTokenSecret = "HTmxhQngNM1D0YDkKM8xkaZJLj8Ie1kvowRx1USvU9qL0";

var axios = require("axios");

var configTweets = {
  method: "get",
  url: "https://api.twitter.com/2/tweets/search/recent?query=from:Thom_astro",
  headers: {
    Authorization:
      "bearer AAAAAAAAAAAAAAAAAAAAAH54PQEAAAAAQhJ4Y98xlV7i6zlDpB7U0EYZlSw%3DmTfzsrHreGCFs62bIVWf1HrUMxUMKzUfBRMP5hWez4NrjX5Sqh",
    consumer_key: "basic yMBWLa2gPdILcqLYwlb8aUpIA",
    consumer_secret: "basic bGJwQvINKQQYYDnP1SWdoA1y9sGiTP6jMAx9ssXLHjkgVGOuTA",
    access_token: "basic 1383038798901227524-eDrV3vGfoyms4P5vPUXmNFWguxaPnh",
    access_token_secret: "basic HTmxhQngNM1D0YDkKM8xkaZJLj8Ie1kvowRx1USvU9qL0",
  },
};

var configImage = {
  method: "get",
  url: "https://api.twitter.com/2/tweets/search/recent?query=from:Thom_astro",
  headers: {
    Authorization:
      "bearer AAAAAAAAAAAAAAAAAAAAAH54PQEAAAAAQhJ4Y98xlV7i6zlDpB7U0EYZlSw%3DmTfzsrHreGCFs62bIVWf1HrUMxUMKzUfBRMP5hWez4NrjX5Sqh",
    consumer_key: "basic yMBWLa2gPdILcqLYwlb8aUpIA",
    consumer_secret: "basic bGJwQvINKQQYYDnP1SWdoA1y9sGiTP6jMAx9ssXLHjkgVGOuTA",
    access_token: "basic 1383038798901227524-eDrV3vGfoyms4P5vPUXmNFWguxaPnh",
    access_token_secret: "basic HTmxhQngNM1D0YDkKM8xkaZJLj8Ie1kvowRx1USvU9qL0",
  },
};

class TwitterApi {
  private createTweet(tweet: any) {
    const tweetArray = tweet.text.trim().split(" ");
    var retweetFrom = "";
    var replyTo = [""];
    var text = "";
    if (tweetArray[0] == "RT") {
      retweetFrom = tweetArray[1].replace(":", "");
      tweetArray.splice(0, 2);
      text = tweetArray.join(" ");
    } else if (tweetArray[0][0] == "@") {
      replyTo[0] = tweetArray[0];
      var i = 1;
      var author = tweetArray[i];
      while (author[0] == "@") {
        replyTo.push(author);
        i++;
        author = tweetArray[i];
      }
      for (var j = 0; j < replyTo.length - 1; j++) {
        replyTo[j] += ", ";
      }
      tweetArray.splice(0, i);
      text = tweetArray.join(" ");
    } else {
      text = tweet.text;
    }
    return new Tweet(
      tweet.id,
      text.trim(),
      tweet.user.name,
      retweetFrom,
      replyTo
    );
  }

  private createTweetForAccount(tweet: any, userName: string) {
    const tweetArray = tweet.text.trim().split(" ");
    var retweetFrom = "";
    var replyTo = [""];
    var text = "";
    if (tweetArray[0] == "RT") {
      retweetFrom = tweetArray[1].replace(":", "");
      tweetArray.splice(0, 2);
      text = tweetArray.join(" ");
    } else if (tweetArray[0][0] == "@") {
      replyTo[0] = tweetArray[0];
      var i = 1;
      var author = tweetArray[i];
      while (author[0] == "@") {
        replyTo.push(author);
        i++;
        author = tweetArray[i];
      }
      for (var j = 0; j < replyTo.length - 1; j++) {
        replyTo[j] += ", ";
      }
      tweetArray.splice(0, i);
      text = tweetArray.join(" ");
    } else {
      text = tweet.text;
    }
    return new Tweet(tweet.id, text.trim(), userName, retweetFrom, replyTo);
  }

  private createTweets(
    tweets: Array<any>,
    methodToCall: string,
    userName: string
  ) {
    try {
      var tweetsCreated;
      if (methodToCall == "createTweet") {
        tweetsCreated = tweets.map((tweet) => this.createTweet(tweet));
      } else if (methodToCall == "createTweetWithoutName") {
        tweetsCreated = tweets.map((tweet) =>
          this.createTweetForAccount(tweet, userName)
        );
      }
      return tweetsCreated;
    } catch (e) {
      console.error(e);
    }
  }

  private createAccount(
    tweets: Array<any>,
    userName: string,
    resultImageProfile: any
  ) {
    if (
      tweets == undefined ||
      userName == undefined ||
      resultImageProfile == undefined
    )
      return undefined;
    else {
      try {
        const tweetsStrings: any = [];

        tweets.map((tweet) => tweetsStrings.push(tweet.text));
        const tweet = JSON.stringify(tweetsStrings);
        const profileImage = resultImageProfile.profile_image_url.replace(
          /_normal\./,
          "."
        );
        const bannerImage = resultImageProfile.profile_banner_url;
        const name = resultImageProfile.name;
        const description = resultImageProfile.description;
        const location = resultImageProfile.location;
        const creationDate = resultImageProfile.created_at;
        const urls = [];
        if (resultImageProfile.entities.url != undefined) {
          for (
            var i = 0;
            i < resultImageProfile.entities.url.urls.length;
            i++
          ) {
            urls[i] = resultImageProfile.entities.url.urls[i].display_url;
          }
        }
        const friendsCount = resultImageProfile.friends_count;
        const followersCount = resultImageProfile.followers_count;
        const singleTweets: any = this.createTweets(
          tweets,
          "createTweetWithoutName",
          userName
        );

        const account = new Account(
          "real user",
          userName,
          name,
          profileImage,
          bannerImage,
          description,
          location,
          creationDate,
          urls,
          friendsCount,
          followersCount,
          tweet,
          singleTweets,
          "kjho"
        );

        return account;
      } catch (e) {
        console.error(e);
      }
    }
  }

  private fetchFromApiTweet() {
    return axios(configTweets)
      .then((jsonResponse: any) => jsonResponse.data)
      .then((jsonResponse: any) => jsonResponse.statuses);
  }
  private fetchFromApiAccount() {
    return axios(configTweets)
      .then((response: any) => response.data.data || [])
      .catch(function (error: Error) {});
  }

  private fetchFromApiImage() {
    return axios(configImage)
      .then((response: any) => response.data || [])
      .catch(function (error: Error) {});
  }

  searchAccountByPseudo(research: string): Promise<Account> {
    configTweets.url = `https://api.twitter.com/2/tweets/search/recent?query=from:${research}`;
    configImage.url = `https://api.twitter.com/1.1/users/show.json?screen_name=${research}`;
    return this.fetchFromApiImage().then((result: any) =>
      this.fetchFromApiAccount().then((tweets: any) =>
        this.createAccount(tweets, research, result)
      )
    );
  }

  searchTweetsByKeyWord(
    research: string,
    numberOfTweets: string
  ): Promise<Array<Tweet>> {
    configTweets.url = `https://api.twitter.com/1.1/search/tweets.json?q=${research}&count=${numberOfTweets}&result_type=recent`;
    return this.fetchFromApiTweet().then((tweets: any) =>
      this.createTweets(tweets, "createTweet", "")
    );
  }
}
export default new TwitterApi();
