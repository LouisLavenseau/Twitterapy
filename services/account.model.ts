import Tweet from "./tweet.model";

export default class Account {
  constructor(
    public user: string,
    public userName: string,
    public name: string,
    public profileImage: string,
    public bannerImage: string,
    public description: string,
    public location: string,
    public creationDate: string,
    public urls: string[],
    public friendsCount: string,
    public followersCount: string,
    public tweets: string,
    public singleTweets: Array<Tweet>,
    public userToken: string
  ) {}
}
