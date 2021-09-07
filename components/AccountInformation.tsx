import React from "react";
import { View, Text, Image } from "react-native";

export default function AccountInformation(props: any) {
  if (props.type == "location") {
    if (props.text == "") return <View></View>;
    else
      return (
        <View style={props.viewStyle}>
          <Image
            style={props.imageStyle}
            source={require("../assets/images/location.png")}
          ></Image>
          <Text style={props.textStyle}>{props.text}</Text>
        </View>
      );
  } else if (props.type == "creationDate") {
    if (props.text == "") return <View></View>;
    else
      return (
        <View style={props.viewStyle}>
          <Image
            style={props.imageStyle}
            source={require("../assets/images/calendar.png")}
          ></Image>
          <Text style={props.textStyle}>{props.text}</Text>
        </View>
      );
  } else if (props.type == "urls") {
    if (props.urls == []) return <View></View>;
    else var result = [];
    for (var i = 0; i < props.urls.length; i++) {
      result.push(
        <View style={props.viewStyle} key={i}>
          <Image
            style={props.imageStyle}
            source={require("../assets/images/link.png")}
          ></Image>
          <Text style={props.textStyle}>{props.urls[i]}</Text>
        </View>
      );
    }
    return <View>{result}</View>;
  } else return <View></View>;
}
