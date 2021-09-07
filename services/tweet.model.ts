export default class Tweet {
  constructor(
    public id: number,
    public text: string,
    public userName: string,
    public retweetFrom: string,
    public replyTo: string[]
  ) {}
}
